const fs = require('fs');

const d = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));

let uniqueCount = 0;
for(let m in d) {
    for(let t in d[m]) {
        for(let s in d[m][t]) {
            let uniqueQuestions = [];
            let seenText = new Set();
            d[m][t][s].forEach(q => {
                let cleanText = q.question.trim();
                if(!seenText.has(cleanText)) {
                    seenText.add(cleanText);
                    uniqueQuestions.push(q);
                    uniqueCount++;
                }
            });
            d[m][t][s] = uniqueQuestions;
        }
    }
}

fs.writeFileSync('questions.json', JSON.stringify(d, null, 4));
console.log("Domande uniche rimaste:", uniqueCount);
