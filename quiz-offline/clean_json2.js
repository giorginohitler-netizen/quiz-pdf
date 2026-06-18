const fs = require('fs');

const data = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));

for (let materia in data) {
    for (let topic in data[materia]) {
        for (let sub in data[materia][topic]) {
            data[materia][topic][sub].forEach(q => {
                // Rimuove specificamente le etichette residue (Q. 0), (Q. 1), ecc.
                // Anche se c'è un due punti o altro dopo.
                q.question = q.question.replace(/\s*\(Q\.\s*\d+\)/g, '');
            });
        }
    }
}

fs.writeFileSync('questions.json', JSON.stringify(data, null, 4));
console.log("JSON pulito definitivamente.");
