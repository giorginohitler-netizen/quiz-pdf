const fs = require('fs');
const path = require('path');

let finalDatabase = {};

// Funzione helper per unire profondamente gli oggetti (deep merge)
function mergeDeep(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && !Array.isArray(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            mergeDeep(target[key], source[key]);
        } else if (Array.isArray(source[key])) {
            if (!target[key]) target[key] = [];
            target[key] = target[key].concat(source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
}

// Lettura dei file topic
for (let i = 1; i <= 9; i++) {
    const filename = `questions_topic_${i}.json`;
    if (fs.existsSync(filename)) {
        const data = JSON.parse(fs.readFileSync(filename, 'utf-8'));
        mergeDeep(finalDatabase, data);
        console.log(`Merged ${filename}`);
    }
}

let questionCount = 0;
// Riassegno gli ID in modo univoco e conto
for (let materia in finalDatabase) {
    for (let topic in finalDatabase[materia]) {
        for (let sub in finalDatabase[materia][topic]) {
            finalDatabase[materia][topic][sub].forEach(q => {
                q.id = ++questionCount;
            });
        }
    }
}

fs.writeFileSync('questions.json', JSON.stringify(finalDatabase, null, 4));
console.log(`Unione completata. Totale domande: ${questionCount}`);
