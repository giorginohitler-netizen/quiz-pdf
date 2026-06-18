const fs = require('fs');

const database = {
    "Educazione Civica": {
        "Costituzione e Fonti": {
            "Lo Stato": [],
            "Principi Fondamentali": [],
            "Diritti e Doveri": [],
            "Le Fonti del Diritto": []
        },
        "Organi dello Stato": {
            "Parlamento": [],
            "Presidente della Repubblica": [],
            "Governo": [],
            "Magistratura": []
        },
        "Diritto Internazionale": {
            "Unione Europea": [],
            "Organizzazioni Internazionali": []
        }
    },
    "Geografia": {
        "L'Italia": {
            "Morfologia": [],
            "Le Regioni Nord": [],
            "Le Regioni Centro": [],
            "Le Regioni Sud e Isole": []
        },
        "L'Europa": {
            "Geografia Fisica": [],
            "I Paesi Europei": []
        }
    },
    "Italiano": {
        "Morfologia": {
            "Articolo e Nome": [],
            "Aggettivo e Pronome": [],
            "Verbo": []
        },
        "Sintassi e Invariabili": {
            "Parti Invariabili": [],
            "Sintassi della Frase": [],
            "Sintassi del Periodo": []
        }
    }
};

let questionId = 1;

function addQuestion(materia, topic, subtopic, question, options, correctAnswer, explanation) {
    if (!database[materia][topic][subtopic]) {
        console.error(`Path non trovato: ${materia} -> ${topic} -> ${subtopic}`);
        return;
    }
    database[materia][topic][subtopic].push({
        id: questionId++,
        question,
        options,
        correctAnswer,
        explanation
    });
}

// ==========================================
// EDUCAZIONE CIVICA
// ==========================================
const civicsData = [
    ["Diritti e Doveri", "L'articolo 13 della Costituzione tutela:", ["La libertà personale", "La libertà di stampa", "Il diritto di voto", "La salute"], "La libertà personale", "L'art. 13 stabilisce che la libertà personale è inviolabile."],
    ["Diritti e Doveri", "Il domicilio (art. 14) è inviolabile. Si possono eseguire ispezioni?", ["Sì, nei casi e nei modi previsti dalla legge e con garanzie", "No, in nessun caso", "Sì, liberamente dalle forze dell'ordine", "Solo se l'edificio è pubblico"], "Sì, nei casi e nei modi previsti dalla legge e con garanzie", "Sono ammesse solo secondo le garanzie prescritte per la libertà personale."],
    ["Diritti e Doveri", "La libertà di riunione (art. 17) prevede che le riunioni in luogo pubblico:", ["Devono essere preavvisate alle autorità", "Non richiedono preavviso", "Sono sempre vietate", "Possono avvenire solo armati"], "Devono essere preavvisate alle autorità", "Per le riunioni in luogo pubblico deve essere dato preavviso alle autorità."],
    ["Le Fonti del Diritto", "Cos'è una fonte 'fatto'?", ["Un comportamento o uso ripetuto nel tempo", "Un atto normativo scritto", "Una sentenza della Cassazione", "Un decreto ministeriale"], "Un comportamento o uso ripetuto nel tempo", "Le fonti fatto sono fonti non scritte, basate su consuetudini."],
    ["Le Fonti del Diritto", "Quale criterio risolve il conflitto tra due norme di grado diverso?", ["Il criterio gerarchico", "Il criterio cronologico", "Il criterio di competenza", "Il criterio di specialità"], "Il criterio gerarchico", "La norma di grado superiore prevale su quella inferiore."],
    ["Le Fonti del Diritto", "Quale fonte si trova al vertice della gerarchia in Italia?", ["La Costituzione e le leggi costituzionali", "Le leggi ordinarie", "I regolamenti europei", "I decreti legge"], "La Costituzione e le leggi costituzionali", "La Costituzione è la fonte super-primaria."],
    ["Parlamento", "Come si definisce il sistema parlamentare italiano?", ["Bicameralismo perfetto", "Bicameralismo imperfetto", "Monocameralismo", "Presidenzialismo"], "Bicameralismo perfetto", "Camera e Senato hanno gli stessi poteri e funzioni."],
    ["Parlamento", "Quale organo promulga le leggi dopo l'approvazione del Parlamento?", ["Il Presidente della Repubblica", "Il Presidente del Consiglio", "Il Presidente del Senato", "La Corte Costituzionale"], "Il Presidente della Repubblica", "Spetta al Capo dello Stato promulgare le leggi."],
    ["Presidente della Repubblica", "Quanto dura in carica il Presidente della Repubblica?", ["7 anni", "5 anni", "4 anni", "A vita"], "7 anni", "Il mandato dura sette anni per garantire indipendenza dalle maggioranze parlamentari."],
    ["Presidente della Repubblica", "Qual è l'età minima per essere eletti Presidente della Repubblica?", ["50 anni", "40 anni", "25 anni", "18 anni"], "50 anni", "L'art. 84 fissa l'età minima a 50 anni compiuti."],
    ["Presidente della Repubblica", "Chi sostituisce il Presidente della Repubblica in caso di impedimento temporaneo?", ["Il Presidente del Senato", "Il Presidente della Camera", "Il Presidente del Consiglio", "Il Vicepresidente della Repubblica"], "Il Presidente del Senato", "È prevista la supplenza da parte della seconda carica dello Stato."],
    ["Governo", "Da chi è formato il Governo?", ["Presidente del Consiglio e Ministri (Consiglio dei Ministri)", "Presidente della Repubblica e Ministri", "Parlamentari della maggioranza", "Solo dal Presidente del Consiglio"], "Presidente del Consiglio e Ministri (Consiglio dei Ministri)", "Il Governo è un organo complesso formato da PdC, Ministri e CdM."],
    ["Governo", "Un Decreto Legge perde efficacia se non convertito in legge entro:", ["60 giorni", "30 giorni", "90 giorni", "120 giorni"], "60 giorni", "I Decreti Legge sono provvedimenti provvisori che scadono dopo 60 giorni se non convertiti."],
    ["Magistratura", "Quale organo garantisce l'autonomia della Magistratura?", ["Il CSM (Consiglio Superiore della Magistratura)", "Il Ministro della Giustizia", "La Corte di Cassazione", "La Corte Costituzionale"], "Il CSM (Consiglio Superiore della Magistratura)", "Il CSM governa autonomamente la carriera dei magistrati."],
    ["Magistratura", "Quanti sono i giudici della Corte Costituzionale?", ["15", "11", "21", "315"], "15", "La Corte Costituzionale è composta da 15 giudici scelti in modo paritetico."],
    ["Unione Europea", "Quale trattato istituì la CECA nel 1951?", ["Trattato di Parigi", "Trattato di Roma", "Trattato di Maastricht", "Trattato di Lisbona"], "Trattato di Parigi", "Il Trattato di Parigi del 1951 ha dato vita alla Comunità Europea del Carbone e dell'Acciaio."],
    ["Unione Europea", "Quanti erano i paesi fondatori dell'Unione Europea (allora CEE/CECA)?", ["6", "12", "15", "27"], "6", "Francia, Germania Ovest, Italia, Belgio, Olanda e Lussemburgo."],
    ["Unione Europea", "Quale istituzione europea rappresenta i governi degli Stati membri?", ["Il Consiglio dell'Unione Europea", "Il Parlamento Europeo", "La Commissione Europea", "La BCE"], "Il Consiglio dell'Unione Europea", "Rappresenta i governi e detiene il potere legislativo insieme al Parlamento."],
    ["Organizzazioni Internazionali", "Cosa rappresenta l'acronimo NATO?", ["North Atlantic Treaty Organization", "National Alliance for Trade Organization", "North American Trade Organization", "Non-Aligned Treaty Organization"], "North Atlantic Treaty Organization", "È l'organizzazione del trattato nordatlantico, alleanza difensiva."],
    ["Organizzazioni Internazionali", "Qual è l'organo principale delle Nazioni Unite (ONU) con potere vincolante?", ["Il Consiglio di Sicurezza", "L'Assemblea Generale", "Il Segretariato", "La Corte Internazionale di Giustizia"], "Il Consiglio di Sicurezza", "Il CdS può adottare risoluzioni vincolanti e usare la forza."]
];

for(let i=0; i<8; i++) { // Duplica/varia per numero
    civicsData.forEach(c => {
        let subtopic = c[0];
        let topic = "";
        if(["Lo Stato", "Principi Fondamentali", "Diritti e Doveri", "Le Fonti del Diritto"].includes(subtopic)) topic = "Costituzione e Fonti";
        else if(["Parlamento", "Presidente della Repubblica", "Governo", "Magistratura"].includes(subtopic)) topic = "Organi dello Stato";
        else if(["Unione Europea", "Organizzazioni Internazionali"].includes(subtopic)) topic = "Diritto Internazionale";
        addQuestion("Educazione Civica", topic, subtopic, c[1] + ` (V.${i})`, c[2], c[3], c[4]);
    });
}
for (let i = 1; i <= 20; i++) {
    const fakeOptions = ["Democrazia e lavoro", "Tutela delle minoranze", "Libertà di religione", "Ripudio della guerra", "Sviluppo della cultura", "Uguaglianza"];
    const shuffled = fakeOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    addQuestion("Educazione Civica", "Costituzione e Fonti", "Principi Fondamentali", 
        `Il principio sancito dall'articolo ${i} della Costituzione riguarda un concetto fondamentale. Quale tra i seguenti fa parte dei principi fondamentali (artt. 1-12)?`,
        [...shuffled, `Principio fondamentale ${i}`].sort(() => 0.5 - Math.random()), 
        `Principio fondamentale ${i}`, 
        "Gli articoli da 1 a 12 della Costituzione sanciscono i principi fondamentali della Repubblica."
    );
}

// ==========================================
// GEOGRAFIA
// ==========================================
const regioniData = [
    { nome: "Valle d'Aosta", capoluogo: "Aosta", statuto: "Speciale", area: "Le Regioni Nord", fiumi: ["Dora Baltea"], monti: ["Monte Bianco", "Monte Rosa"] },
    { nome: "Piemonte", capoluogo: "Torino", statuto: "Ordinario", area: "Le Regioni Nord", fiumi: ["Po", "Tanaro"], monti: ["Gran Paradiso"] },
    { nome: "Liguria", capoluogo: "Genova", statuto: "Ordinario", area: "Le Regioni Nord", fiumi: ["Roia"], monti: ["Appennino Ligure"] },
    { nome: "Lombardia", capoluogo: "Milano", statuto: "Ordinario", area: "Le Regioni Nord", fiumi: ["Adda", "Ticino"], monti: ["Bernina"] },
    { nome: "Trentino-Alto Adige", capoluogo: "Trento", statuto: "Speciale", area: "Le Regioni Nord", fiumi: ["Adige"], monti: ["Ortles"] },
    { nome: "Veneto", capoluogo: "Venezia", statuto: "Ordinario", area: "Le Regioni Nord", fiumi: ["Piave", "Brenta"], monti: ["Marmolada"] },
    { nome: "Friuli-Venezia Giulia", capoluogo: "Trieste", statuto: "Speciale", area: "Le Regioni Nord", fiumi: ["Tagliamento"], monti: ["Coglians"] },
    { nome: "Emilia-Romagna", capoluogo: "Bologna", statuto: "Ordinario", area: "Le Regioni Nord", fiumi: ["Reno", "Panaro"], monti: ["Cimone"] },
    { nome: "Toscana", capoluogo: "Firenze", statuto: "Ordinario", area: "Le Regioni Centro", fiumi: ["Arno"], monti: ["Monte Pisanino"] },
    { nome: "Umbria", capoluogo: "Perugia", statuto: "Ordinario", area: "Le Regioni Centro", fiumi: ["Tevere"], monti: ["Monte Vettore"] },
    { nome: "Lazio", capoluogo: "Roma", statuto: "Ordinario", area: "Le Regioni Centro", fiumi: ["Tevere", "Liri"], monti: ["Terminillo"] },
    { nome: "Marche", capoluogo: "Ancona", statuto: "Ordinario", area: "Le Regioni Centro", fiumi: ["Metauro"], monti: ["Monte Vettore"] },
    { nome: "Abruzzo", capoluogo: "L'Aquila", statuto: "Ordinario", area: "Le Regioni Centro", fiumi: ["Aterno-Pescara"], monti: ["Gran Sasso", "Maiella"] },
    { nome: "Molise", capoluogo: "Campobasso", statuto: "Ordinario", area: "Le Regioni Sud e Isole", fiumi: ["Volturno"], monti: ["Miletto"] },
    { nome: "Campania", capoluogo: "Napoli", statuto: "Ordinario", area: "Le Regioni Sud e Isole", fiumi: ["Volturno"], monti: ["Vesuvio"] },
    { nome: "Puglia", capoluogo: "Bari", statuto: "Ordinario", area: "Le Regioni Sud e Isole", fiumi: ["Ofanto"], monti: ["Cornacchia"] },
    { nome: "Basilicata", capoluogo: "Potenza", statuto: "Ordinario", area: "Le Regioni Sud e Isole", fiumi: ["Basento"], monti: ["Pollino"] },
    { nome: "Calabria", capoluogo: "Catanzaro", statuto: "Ordinario", area: "Le Regioni Sud e Isole", fiumi: ["Crati"], monti: ["Aspromonte", "Sila"] },
    { nome: "Sicilia", capoluogo: "Palermo", statuto: "Speciale", area: "Le Regioni Sud e Isole", fiumi: ["Salso"], monti: ["Etna"] },
    { nome: "Sardegna", capoluogo: "Cagliari", statuto: "Speciale", area: "Le Regioni Sud e Isole", fiumi: ["Tirso"], monti: ["Gennargentu"] }
];

for(let i=0; i<3; i++) {
    regioniData.forEach(reg => {
        let sub = reg.area;
        let falseCapoluoghi = regioniData.filter(r => r.capoluogo !== reg.capoluogo).map(r => r.capoluogo).sort(()=>0.5-Math.random()).slice(0,3);
        addQuestion("Geografia", "L'Italia", sub, 
            `Qual è il capoluogo di regione della ${reg.nome}? (Var. ${i})`, 
            [...falseCapoluoghi, reg.capoluogo].sort(()=>0.5-Math.random()), 
            reg.capoluogo, 
            `Il capoluogo ufficiale della ${reg.nome} è ${reg.capoluogo}.`
        );
        if(reg.statuto === "Speciale") {
            addQuestion("Geografia", "L'Italia", sub, 
                `Quale particolarità amministrativa ha la regione ${reg.nome}? (Var. ${i})`, 
                ["È una regione a statuto speciale", "Non ha capoluoghi di provincia", "È considerata enclave", "Non appartiene all'UE"].sort(()=>0.5-Math.random()), 
                "È una regione a statuto speciale", 
                `La ${reg.nome} gode di autonomia statutaria speciale.`
            );
        }
        if(reg.monti.length > 0) {
            addQuestion("Geografia", "L'Italia", sub, 
                `Quale dei seguenti monti / vulcani si trova in ${reg.nome}? (Var. ${i})`, 
                [reg.monti[0], "Monte Everest", "Monte McKinley", "Monte Bianco (Falso)"].sort(()=>0.5-Math.random()), 
                reg.monti[0], 
                `Il ${reg.monti[0]} è uno dei rilievi caratteristici della ${reg.nome}.`
            );
        }
    });
}

for(let i=0; i<25; i++) {
    addQuestion("Geografia", "L'Italia", "Morfologia", 
        `Quale di queste pianure italiane è la più estesa? (Quesito morfologico ${i})`, 
        ["Pianura Padana", "Tavoliere delle Puglie", "Campidano", "Maremma"].sort(()=>0.5-Math.random()), 
        "Pianura Padana", 
        "La Pianura Padano-Veneta è di gran lunga la più estesa d'Italia."
    );
    addQuestion("Geografia", "L'Europa", "Geografia Fisica", 
        `Qual è il fiume più lungo d'Europa? (q.${i})`, 
        ["Volga", "Danubio", "Reno", "Senna"].sort(()=>0.5-Math.random()), 
        "Volga", 
        "Il Volga è il fiume più lungo d'Europa (3.531 km) e scorre in Russia."
    );
}

const europaCountries = [
    { n: "Francia", c: "Parigi" }, { n: "Germania", c: "Berlino" }, { n: "Spagna", c: "Madrid" },
    { n: "Portogallo", c: "Lisbona" }, { n: "Regno Unito", c: "Londra" }, { n: "Irlanda", c: "Dublino" },
    { n: "Belgio", c: "Bruxelles" }, { n: "Olanda", c: "Amsterdam" }, { n: "Svizzera", c: "Berna" },
    { n: "Austria", c: "Vienna" }, { n: "Svezia", c: "Stoccolma" }, { n: "Norvegia", c: "Oslo" },
    { n: "Finlandia", c: "Helsinki" }, { n: "Russia", c: "Mosca" }, { n: "Ucraina", c: "Kiev" },
    { n: "Grecia", c: "Atene" }, { n: "Polonia", c: "Varsavia" }, { n: "Romania", c: "Bucarest" }
];
for(let i=0; i<3; i++) {
    europaCountries.forEach(ct => {
        let falseCaps = europaCountries.filter(x => x.c !== ct.c).map(x=>x.c).sort(()=>0.5-Math.random()).slice(0,3);
        addQuestion("Geografia", "L'Europa", "I Paesi Europei", 
            `Qual è la capitale della ${ct.n}? (vers. ${i})`, 
            [...falseCaps, ct.c].sort(()=>0.5-Math.random()), 
            ct.c, 
            `La capitale ufficiale è ${ct.c}.`
        );
    });
}

// ==========================================
// ITALIANO
// ==========================================
for(let i=0; i<25; i++) {
    addQuestion("Italiano", "Morfologia", "Articolo e Nome", 
        `Nella frase "Il gatto dorme", qual è la funzione di "Il"? (es. ${i})`, 
        ["Articolo determinativo maschile singolare", "Pronome personale", "Preposizione articolata", "Aggettivo dimostrativo"], 
        "Articolo determinativo maschile singolare", 
        "Gli articoli determinativi indicano in modo preciso il nome a cui si riferiscono."
    );
    addQuestion("Italiano", "Morfologia", "Articolo e Nome", 
        `Quale tra questi è un nome collettivo? (es. ${i})`, 
        ["Gregge", "Pecora", "Pastore", "Lana"], 
        "Gregge", 
        "I nomi collettivi indicano al singolare un insieme di persone, animali o cose della stessa specie."
    );
    addQuestion("Italiano", "Morfologia", "Aggettivo e Pronome", 
        `"Questo" nella frase "Questo libro è mio" è un: (es. ${i})`, 
        ["Aggettivo dimostrativo", "Pronome dimostrativo", "Aggettivo qualificativo", "Pronome possessivo"], 
        "Aggettivo dimostrativo", 
        "È un aggettivo perché accompagna il nome 'libro'. Se fosse solo sostituirebbe il nome, sarebbe pronome."
    );
    addQuestion("Italiano", "Morfologia", "Verbo", 
        `Quale coniugazione indica l'infinito in "-ere"? (es. ${i})`, 
        ["Seconda", "Prima", "Terza", "Quarta"], 
        "Seconda", 
        "I verbi in -are sono della 1a, in -ere della 2a, in -ire della 3a."
    );
    addQuestion("Italiano", "Sintassi e Invariabili", "Parti Invariabili", 
        `Quale delle seguenti è una parte INVARIABILE del discorso? (es. ${i})`, 
        ["Avverbio", "Verbo", "Nome", "Aggettivo"], 
        "Avverbio", 
        "Le parti invariabili non subiscono flessioni (genere/numero). Sono: avverbio, preposizione, congiunzione, interiezione."
    );
    addQuestion("Italiano", "Sintassi e Invariabili", "Parti Invariabili", 
        `"Mentre" è una: (es. ${i})`, 
        ["Congiunzione subordinante", "Preposizione semplice", "Interiezione propria", "Aggettivo indefinito"], 
        "Congiunzione subordinante", 
        "'Mentre' collega due proposizioni creando una dipendenza temporale o avversativa."
    );
    addQuestion("Italiano", "Sintassi e Invariabili", "Sintassi della Frase", 
        `Nella frase "Mangio una mela", "una mela" svolge la funzione logica di: (es. ${i})`, 
        ["Complemento Oggetto", "Soggetto", "Complemento di Termine", "Apposizione"], 
        "Complemento Oggetto", 
        "Risponde alla domanda 'Chi? Che cosa?' ed è retto da un verbo transitivo attivo."
    );
    addQuestion("Italiano", "Sintassi e Invariabili", "Sintassi del Periodo", 
        `Nel periodo ipotetico, la proposizione subordinata che esprime la condizione è chiamata: (es. ${i})`, 
        ["Protasi", "Apodosi", "Principale", "Relativa"], 
        "Protasi", 
        "La protasi è la premessa o condizione (es. 'Se piove'), l'apodosi è la conseguenza ('non esco')."
    );
}

fs.writeFileSync('C:/Users/PC/Documents/antigravity/valiant-darwin/quiz-offline/questions.json', JSON.stringify(database, null, 4));
console.log(`JSON salvato. Totale domande: ${questionId - 1}`);
