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
}

function getRandomQuestions(sourceArray, count) {
    const shuffled = [...sourceArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function startQuiz() {
    const selectedSubject = document.getElementById('subjectSelect').value;
    
    let pool = [];
    if (selectedSubject === "all") {
        pool = allQuestions;
    } else {
        pool = allQuestions.filter(q => q.materia === selectedSubject);
    }
    
    // Raggruppiamo le domande per topic e subtopic per garantire una distribuzione uniforme
    let grouped = {};
    pool.forEach(q => {
        let key = q.topic + "|" + q.subtopic;
        if(!grouped[key]) grouped[key] = [];
        grouped[key].push(q);
    });
    
    // Mescoliamo ogni gruppo
    for(let k in grouped) {
        grouped[k].sort(() => 0.5 - Math.random());
    }
    
    // Peschiamo 1 domanda a turno da ogni gruppo fino a 30 (o finché ci sono domande)
    sessionQuestions = [];
    let keys = Object.keys(grouped).sort(() => 0.5 - Math.random());
    let keepGoing = true;
    while(sessionQuestions.length < 30 && keepGoing) {
        keepGoing = false;
        for(let k of keys) {
            if(sessionQuestions.length >= 30) break;
            if(grouped[k].length > 0) {
                sessionQuestions.push(grouped[k].pop());
                keepGoing = true;
            }
        }
    }
    
    // Mescolata finale
    sessionQuestions.sort(() => 0.5 - Math.random());
    
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
    ui.qTopic.textContent = `${q.topic} - ${q.subtopic}`;
    ui.questionText.textContent = q.question;
    
    // Render options (shuffled to ensure correct answer isn't always first)
    ui.optionsGrid.innerHTML = '';
    const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());
    shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(opt, btn);
        ui.optionsGrid.appendChild(btn);
    });
    
    ui.explanationBox.classList.add('hidden');
}

function handleAnswer(selectedOption, btn) {
    const q = sessionQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === q.correctAnswer;
    
    // Disable all options
    const allBtns = ui.optionsGrid.querySelectorAll('.option-btn');
    allBtns.forEach(b => {
        b.disabled = true;
        if (b.textContent === q.correctAnswer) {
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
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < sessionQuestions.length) {
        renderQuestion();
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
    if (percentage >= 90) ui.resultMessage.textContent = "Eccezionale! Conoscenza impeccabile.";
    else if (percentage >= 70) ui.resultMessage.textContent = "Ottimo lavoro! Preparazione solida.";
    else if (percentage >= 50) ui.resultMessage.textContent = "Sufficiente. Puoi fare di meglio!";
    else ui.resultMessage.textContent = "Bisogna ripassare. Non arrenderti!";
    
    // Breakdown
    ui.resultsBreakdown.innerHTML = '';
    for (const [materia, stats] of Object.entries(subjectScores)) {
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        div.innerHTML = `
            <h4>${materia}</h4>
            <div class="stats">${stats.correct} / ${stats.total}</div>
        `;
        ui.resultsBreakdown.appendChild(div);
    }
    
    switchScreen('result');
}

function resetApp() {
    switchScreen('home');
}

// Start
init();
