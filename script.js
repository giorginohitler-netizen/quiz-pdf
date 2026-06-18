let allQuestions = [];
let sessionQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let subjectScores = {};

// DOM Elements
const screens = {
    home: document.getElementById('homeScreen'),
    quiz: document.getElementById('quizScreen'),
    result: document.getElementById('resultScreen')
};

const ui = {
    startBtn: document.getElementById('startBtn'),
    nextBtn: document.getElementById('nextBtn'),
    restartBtn: document.getElementById('restartBtn'),
    
    sessionStats: document.getElementById('sessionStats'),
    currentQ: document.getElementById('currentQ'),
    totalQ: document.getElementById('totalQ'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    progressFill: document.getElementById('progressFill'),
    
    qSubject: document.getElementById('qSubject'),
    qTopic: document.getElementById('qTopic'),
    questionText: document.getElementById('questionText'),
    optionsGrid: document.getElementById('optionsGrid'),
    
    explanationBox: document.getElementById('explanationBox'),
    explanationText: document.getElementById('explanationText'),
    
    finalScore: document.getElementById('finalScore'),
    resultMessage: document.getElementById('resultMessage'),
    resultsBreakdown: document.getElementById('resultsBreakdown')
};

// --- Algoritmo Fisher-Yates Shuffle (corretto e non biased) ---
function fisherYatesShuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Initialization
async function init() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        processDatabase(data);
        ui.startBtn.addEventListener('click', startQuiz);
        ui.nextBtn.addEventListener('click', loadNextQuestion);
        ui.restartBtn.addEventListener('click', resetApp);
    } catch (e) {
        console.error("Errore nel caricamento del database:", e);
        ui.startBtn.innerHTML = "Errore Caricamento DB";
        ui.startBtn.disabled = true;
    }
}

function processDatabase(data) {
    allQuestions = [];
    // Traverse the nested JSON
    for (let materia in data) {
        for (let topic in data[materia]) {
            for (let subtopic in data[materia][topic]) {
                const qs = data[materia][topic][subtopic];
                qs.forEach(q => {
                    allQuestions.push({
                        ...q,
                        materia,
                        topic,
                        subtopic
                    });
                });
            }
        }
    }
    console.log(`Caricate ${allQuestions.length} domande dal database.`);
}

function switchScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz() {
    const selectedSubject = document.getElementById('subjectSelect').value;
    
    let pool = [];
    if (selectedSubject === "all") {
        pool = allQuestions;
    } else {
        pool = allQuestions.filter(q => q.materia === selectedSubject);
    }
    
    // Raggruppiamo le domande per subtopic per garantire una distribuzione uniforme
    let grouped = {};
    pool.forEach(q => {
        let key = q.topic + "|" + q.subtopic;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(q);
    });
    
    // Mescoliamo ogni gruppo con Fisher-Yates
    for (let k in grouped) {
        grouped[k] = fisherYatesShuffle(grouped[k]);
    }
    
    // Peschiamo 1 domanda a turno da ogni gruppo (round-robin) fino a 30
    sessionQuestions = [];
    let keys = fisherYatesShuffle(Object.keys(grouped));
    let keepGoing = true;
    
    // Tracciamo quale indice abbiamo pescato per ogni gruppo
    let indices = {};
    keys.forEach(k => indices[k] = 0);
    
    while (sessionQuestions.length < 30 && keepGoing) {
        keepGoing = false;
        for (let k of keys) {
            if (sessionQuestions.length >= 30) break;
            if (indices[k] < grouped[k].length) {
                sessionQuestions.push(grouped[k][indices[k]]);
                indices[k]++;
                keepGoing = true;
            }
        }
    }
    
    // Mescolata finale con Fisher-Yates
    sessionQuestions = fisherYatesShuffle(sessionQuestions);
    
    currentQuestionIndex = 0;
    score = 0;
    subjectScores = {};
    
    ui.totalQ.textContent = sessionQuestions.length;
    ui.scoreDisplay.textContent = score;
    ui.sessionStats.classList.remove('hidden');
    
    switchScreen('quiz');
    renderQuestion();
}

function renderQuestion() {
    const q = sessionQuestions[currentQuestionIndex];
    
    // Update stats
    ui.currentQ.textContent = currentQuestionIndex + 1;
    ui.progressFill.style.width = `${((currentQuestionIndex) / sessionQuestions.length) * 100}%`;
    
    // Update text
    ui.qSubject.textContent = q.materia;
    ui.qTopic.textContent = `${q.topic} › ${q.subtopic}`;
    ui.questionText.textContent = q.question;
    
    // Render options con shuffle CORRETTO (Fisher-Yates)
    ui.optionsGrid.innerHTML = '';
    const shuffledOptions = fisherYatesShuffle(q.options);
    
    shuffledOptions.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.id = `option-${index}`;
        
        const letter = ['A', 'B', 'C', 'D'][index];
        btn.innerHTML = `<span class="option-letter">${letter}</span><span class="option-text">${opt}</span>`;
        btn.onclick = () => handleAnswer(opt, btn);
        ui.optionsGrid.appendChild(btn);
    });
    
    ui.explanationBox.classList.add('hidden');
    
    // Animazione di entrata
    ui.questionText.style.animation = 'none';
    ui.optionsGrid.style.animation = 'none';
    requestAnimationFrame(() => {
        ui.questionText.style.animation = '';
        ui.optionsGrid.style.animation = '';
    });
}

function handleAnswer(selectedOption, btn) {
    const q = sessionQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === q.correctAnswer;
    
    // Disable all options e mostra le corrette/errate
    const allBtns = ui.optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(b => {
        b.disabled = true;
        const optText = b.querySelector('.option-text').textContent;
        if (optText === q.correctAnswer) {
            b.classList.add('correct');
        } else if (b === btn && !isCorrect) {
            b.classList.add('wrong');
        }
    });
    
    // Update Score
    if (!subjectScores[q.materia]) {
        subjectScores[q.materia] = { correct: 0, total: 0 };
    }
    subjectScores[q.materia].total++;
    
    if (isCorrect) {
        score++;
        ui.scoreDisplay.textContent = score;
        subjectScores[q.materia].correct++;
    }
    
    // Show Explanation
    ui.explanationText.textContent = q.explanation;
    ui.explanationBox.classList.remove('hidden');
    
    // Auto-scroll verso la spiegazione su mobile
    setTimeout(() => {
        ui.explanationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < sessionQuestions.length) {
        renderQuestion();
        // Torna su alla domanda su mobile
        document.querySelector('.question-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    ui.sessionStats.classList.add('hidden');
    ui.progressFill.style.width = '100%';
    
    // Circle calculation
    ui.finalScore.textContent = score;
    const percentage = (score / sessionQuestions.length) * 100;
    document.querySelector('.score-circle').style.background = `conic-gradient(var(--primary-color) ${percentage}%, var(--bg-main) 0%)`;
    
    // Message
    if (percentage >= 90) ui.resultMessage.textContent = "🏆 Eccezionale! Conoscenza impeccabile.";
    else if (percentage >= 70) ui.resultMessage.textContent = "✅ Ottimo lavoro! Preparazione solida.";
    else if (percentage >= 50) ui.resultMessage.textContent = "📚 Sufficiente. Puoi fare di meglio!";
    else ui.resultMessage.textContent = "💪 Bisogna ripassare. Non arrenderti!";
    
    // Breakdown
    ui.resultsBreakdown.innerHTML = '';
    for (const [materia, stats] of Object.entries(subjectScores)) {
        const pct = Math.round((stats.correct / stats.total) * 100);
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        div.innerHTML = `
            <h4>${materia}</h4>
            <div class="stats">${stats.correct} / ${stats.total}</div>
            <div class="breakdown-bar">
                <div class="breakdown-fill" style="width: ${pct}%"></div>
            </div>
        `;
        ui.resultsBreakdown.appendChild(div);
    }
    
    switchScreen('result');
}

function resetApp() {
    switchScreen('home');
    ui.sessionStats.classList.add('hidden');
}

// Start
init();
