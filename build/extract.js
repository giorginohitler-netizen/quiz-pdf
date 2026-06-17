const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Percorso file o cartella mancante.");
  process.exit(1);
}

const absInputPath = path.resolve(inputPath);

if (!fs.existsSync(absInputPath)) {
  console.error(`Il percorso non esiste: ${absInputPath}`);
  process.exit(1);
}

// Funzione ricorsiva per trovare i PDF
function findPdfs(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findPdfs(file));
    } else if (file.toLowerCase().endsWith('.pdf')) {
      results.push(file);
    }
  });
  return results;
}

const filesToProcess = fs.statSync(absInputPath).isDirectory() 
  ? findPdfs(absInputPath) 
  : [absInputPath];

async function processFiles() {
  for (const file of filesToProcess) {
    const parentFolder = path.basename(path.dirname(file));
    const subject = parentFolder.toUpperCase(); // Es. GEOGRAFIA, ITALIANO
    console.log(`\n--- Inizio estrazione: ${path.basename(file)} (Materia: ${subject}) ---`);
    await extractText(file);
  }
}

async function extractText(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  try {
    const data = await pdfParse(dataBuffer);
    const text = data.text ? data.text.trim() : '';
    
    if (text.length > 100) {
      console.log(text);
      return;
    }
    
    console.warn("Testo nativo insufficiente (meno di 100 caratteri). Avvio processo OCR su PDF scansionato...");
    performOCR(pdfPath);

  } catch (err) {
    console.warn("Errore durante pdf-parse, tento OCR come fallback...", err.message);
    performOCR(pdfPath);
  }
}

function performOCR(pdfPath) {
  const tempDir = path.join(__dirname, 'temp_ocr');
  
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  try {
    console.warn("[OCR] Step 1: Conversione PDF in immagini ad alta risoluzione (300 dpi) in corso...");
    const gsCmdName = fs.existsSync("C:\\Program Files\\gs\\gs10.07.1\\bin\\gswin64c.exe") 
      ? '"C:\\Program Files\\gs\\gs10.07.1\\bin\\gswin64c.exe"' 
      : 'gswin64c';
    
    const gsCommand = `${gsCmdName} -dSAFER -dBATCH -dNOPAUSE -r300 -sDEVICE=png16m -dTextAlphaBits=4 -dGraphicsAlphaBits=4 -sOutputFile="${path.join(tempDir, 'page-%03d.png')}" "${pdfPath}"`;
    execSync(gsCommand, { stdio: 'pipe' });

    const files = fs.readdirSync(tempDir).filter(f => f.endsWith('.png')).sort();
    
    if (files.length === 0) {
      throw new Error("Ghostscript non ha generato alcuna immagine. Il PDF potrebbe essere corrotto o vuoto.");
    }

    let fullText = "";
    
    const tessCmdName = fs.existsSync("C:\\Program Files\\Tesseract-OCR\\tesseract.exe") 
      ? '"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"' 
      : 'tesseract';

    for (let i = 0; i < files.length; i++) {
      const imgPath = path.join(tempDir, files[i]);
      console.warn(`[OCR] Step 2: Estrazione testo da pagina ${i + 1} di ${files.length}...`);
      
      const tesseractCmd = `${tessCmdName} "${imgPath}" stdout -l ita`;
      const pageText = execSync(tesseractCmd, { stdio: ['pipe', 'pipe', 'pipe'], encoding: 'utf-8' });
      
      fullText += pageText + "\n\n";
    }

    if (fullText.trim().length === 0) {
      throw new Error("Tesseract non ha estratto alcun testo dalle immagini.");
    }

    console.log(fullText.trim());

  } catch (err) {
    console.error("Errore critico durante OCR:");
    console.error(err.message);
    if (err.stderr) console.error("Dettagli STDERR:", err.stderr.toString());
  } finally {
    if (fs.existsSync(tempDir)) {
      const tempFiles = fs.readdirSync(tempDir);
      for (const f of tempFiles) {
        fs.unlinkSync(path.join(tempDir, f));
      }
      fs.rmdirSync(tempDir);
    }
  }
}

processFiles();
