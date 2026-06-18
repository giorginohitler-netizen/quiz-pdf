const fs = require('fs');

let raw = fs.readFileSync('questions.json', 'utf-8');

// Regex per trovare cose come (ID-1), (Q-3), (V.2), (vers. 1), (Set 2), (Quesito morfologico 2), (q.1), (Rif.2), (Test 1)
// Cerchiamo parentesi alla fine della stringa
let cleaned = raw.replace(/\s*\([^)]*\d+[^)]*\)(?=")/g, '');

fs.writeFileSync('questions.json', cleaned);
console.log("JSON pulito dalle etichette ID/V/Q.");
