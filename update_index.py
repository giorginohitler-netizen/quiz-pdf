import json
import re

questions = [
    {
        "question": "Che cosa rappresentano le 'fonti di cognizione' nell'ordinamento giuridico?",
        "correct_answer": "Gli strumenti ufficiali e conoscitivi attraverso cui è possibile prendere visione e conoscere le fonti di produzione (es. Gazzetta Ufficiale).",
        "wrong_answers": [
            "L'insieme degli organi dello Stato che sono materialmente incaricati di elaborare, modificare o abrogare le leggi vigenti.",
            "I testi storici e filosofici che hanno ispirato i principi cardine e i diritti inalienabili contenuti nell'attuale Costituzione.",
            "I documenti giurisprudenziali emessi esclusivamente dai Tribunali di merito che creano nuovi precedenti legali vincolanti."
        ],
        "source_file": "CamScanner 27-05-26 09.35.pdf",
        "subject": "EDUCAZIONE_CIVICA",
        "topic": "Diritto - Fonti"
    },
    {
        "question": "Secondo il criterio gerarchico delle fonti del diritto, cosa succede in caso di contrasto tra due norme di grado diverso?",
        "correct_answer": "La norma di grado inferiore non può mai modificare o abrogare quella di grado superiore, che ha sempre prevalenza formale.",
        "wrong_answers": [
            "La norma entrata in vigore più recentemente annulla sistematicamente la precedente, indipendentemente dal suo grado e livello.",
            "La Corte Costituzionale deve temporaneamente sospendere entrambe le norme e demandare una decisione al Presidente della Repubblica.",
            "La norma di grado superiore viene automaticamente degradata per adeguarsi a quella emanata dal Parlamento in via ordinaria."
        ],
        "source_file": "CamScanner 27-05-26 09.35.pdf",
        "subject": "EDUCAZIONE_CIVICA",
        "topic": "Diritto - Fonti"
    },
    {
        "question": "In Italia, da chi viene eletto il Presidente della Repubblica e con quale criterio?",
        "correct_answer": "Viene eletto dal Parlamento riunito in seduta comune, a cui si aggiungono i delegati regionali scelti dai rispettivi consigli.",
        "wrong_answers": [
            "Viene eletto dai cittadini italiani mediante un'elezione a suffragio universale diretto che si tiene ogni sette anni.",
            "Viene nominato in via diretta dal Presidente del Consiglio uscente di concerto con i vertici della Corte Costituzionale.",
            "Viene votato esclusivamente dai membri del Senato della Repubblica, in in rappresentanza dell'unità statale e del territorio."
        ],
        "source_file": "CamScanner 27-05-26 11.18.pdf",
        "subject": "EDUCAZIONE_CIVICA",
        "topic": "Istituzioni - Presidente della Repubblica"
    },
    {
        "question": "Quali sono i due unici reati per cui il Presidente della Repubblica risulta essere costituzionalmente responsabile?",
        "correct_answer": "Alto tradimento o attentato alla Costituzione, per i quali può essere messo in stato di accusa dal Parlamento.",
        "wrong_answers": [
            "Corruzione in atti d'ufficio e vilipendio alle istituzioni repubblicane o alla bandiera nazionale italiana.",
            "Peculato aggravato e appropriazione indebita di fondi pubblici destinati al mantenimento della sua carica.",
            "Qualsiasi infrazione penale commessa durante il mandato e punibile con una reclusione superiore a cinque anni."
        ],
        "source_file": "CamScanner 27-05-26 11.18.pdf",
        "subject": "EDUCAZIONE_CIVICA",
        "topic": "Istituzioni - Presidente della Repubblica"
    },
    {
        "question": "Cosa prevedeva storicamente la Dichiarazione Schuman del 1950?",
        "correct_answer": "La proposta di mettere l'intera produzione franco-tedesca di carbone e acciaio sotto un'Alta Autorità comune e sovranazionale.",
        "wrong_answers": [
            "L'istituzione di un esercito unificato europeo volto a contrastare le ingerenze politiche delle nazioni del blocco sovietico.",
            "La rimozione immediata di tutte le dogane tra Inghilterra e Francia per la libera circolazione di persone e merci industriali.",
            "La creazione di una moneta unica europea che avrebbe dovuto sostituire i franchi e i marchi in tutto il continente entro 10 anni."
        ],
        "source_file": "CamScanner 27-05-26 15.32.pdf",
        "subject": "EDUCAZIONE_CIVICA",
        "topic": "Unione Europea - Storia"
    },
    {
        "question": "In che modo l'ordinamento comunitario (europeo) si relaziona alla sovranità degli Stati membri?",
        "correct_answer": "Comporta che gli Stati membri limitino parzialmente la loro sovranità, accettando vincoli in settori gestiti da istituzioni sovranazionali.",
        "wrong_answers": [
            "Obbliga gli Stati membri a cedere integralmente e definitivamente l'intera sovranità politica ed economica al Parlamento Europeo.",
            "Agisce esclusivamente con raccomandazioni informali che non sono in alcun caso vincolanti per l'ordinamento giuridico nazionale.",
            "Prevede che ogni legge europea passi obbligatoriamente da un referendum nazionale per essere accolta dallo Stato membro."
        ],
        "source_file": "CamScanner 27-05-26 15.32.pdf",
        "subject": "EDUCAZIONE_CIVICA",
        "topic": "Unione Europea - Istituzioni"
    },
    {
        "question": "Quali sono geologicamente le origini delle colline situate sul margine meridionale dell'arco alpino italiano?",
        "correct_answer": "Hanno origine morenica, generate dall'accumulo di detriti depositati dal lento movimento dei ghiacciai durante l'ultima glaciazione.",
        "wrong_answers": [
            "Sono di origine prevalentemente vulcanica, frutto dell'antico innalzamento di crateri inattivi ormai erosi dal tempo.",
            "Si sono formate a causa del sollevamento e piegamento tettonico della crosta oceanica scontratasi con l'arco dolomitico.",
            "Sono il risultato del prosciugamento di enormi laghi alpini preistorici che hanno lasciato imponenti rilievi sedimentari."
        ],
        "source_file": "CamScanner 09-06-26 09.00.pdf",
        "subject": "GEOGRAFIA",
        "topic": "Italia - Territorio"
    },
    {
        "question": "All'interno del territorio geografico e morfologico dell'Italia si trovano due piccoli Stati indipendenti. Quali sono?",
        "correct_answer": "La Città del Vaticano e la Repubblica di San Marino, entrambi enclave inserite all'interno della penisola italiana.",
        "wrong_answers": [
            "Il Principato di Monaco e la Repubblica di San Marino, posizionati entrambi in specifiche zone collinari e costiere del paese.",
            "La Città del Vaticano e il Principato del Liechtenstein, nazioni con statuto autonomo completamente esterne all'Unione Europea.",
            "La Repubblica di San Marino e lo Stato Indipendente di Malta, storicamente distaccati dai domini italiani prima della Repubblica."
        ],
        "source_file": "CamScanner 09-06-26 09.00.pdf",
        "subject": "GEOGRAFIA",
        "topic": "Italia - Territorio"
    },
    {
        "question": "Il sistema montuoso alpino-himalaiano (di cui fanno parte Alpi e Appennini) da quale grande movimento tettonico ha avuto origine?",
        "correct_answer": "Dal possente movimento di compressione e scontro avvenuto tra la zolla africana e quella europea nel corso delle ere geologiche.",
        "wrong_answers": [
            "Dalla brusca e inarrestabile espansione del fondale dell'Oceano Atlantico che ha compresso lateralmente il continente euroasiatico.",
            "Dallo sprofondamento tettonico di un antico blocco continentale emerso noto ai geologi col nome di antico mar Mediterraneo.",
            "Dall'accumulo inarrestabile di sedimenti vulcanici lungo la cintura di fuoco scaturita durante le glaciazioni dell'era quaternaria."
        ],
        "source_file": "CamScanner 09-06-26 09.00.pdf",
        "subject": "GEOGRAFIA",
        "topic": "Italia - Territorio"
    },
    {
        "question": "Quali elementi geografici segnano convenzionalmente i confini fisici tra l'Europa e il continente asiatico?",
        "correct_answer": "I rilievi montuosi degli Urali e la vasta depressione del Kuma-Manych situata nel settore sud-orientale della Russia.",
        "wrong_answers": [
            "Le alte vette della catena del Caucaso e le vaste e inesplorate distese della Siberia centrale ai confini con la Cina.",
            "La depressione del Mar Caspio e i grandi altipiani desertici della Mongolia che delimitano le steppe del continente europeo.",
            "La penisola scandinava a nord e lo stretto dei Dardanelli a sud, che da sempre impediscono il contatto terrestre tra i blocchi."
        ],
        "source_file": "CamScanner 26-05-26 20.52.pdf",
        "subject": "GEOGRAFIA",
        "topic": "Europa - Territorio"
    },
    {
        "question": "Quali caratteristiche morfologiche contraddistinguono le coste nord-occidentali dell'Europa (Francia nord, Danimarca, Paesi Bassi)?",
        "correct_answer": "Sono coste marcatamente basse e sabbiose, ampiamente modellate dalla presenza di numerose dune naturali e lagune costiere.",
        "wrong_answers": [
            "Sono prevalentemente alte e rocciose, solcate verticalmente da fiordi profondi generati dall'attività millenaria dei ghiacciai.",
            "Si presentano irregolari e scoscese, punteggiate da innumerevoli golfi vulcanici e promontori aspri e poco accessibili.",
            "Risultano frastagliate e paludose, interamente dominate da enormi sistemi di barriere coralline fossili del Pleistocene."
        ],
        "source_file": "CamScanner 26-05-26 20.52.pdf",
        "subject": "GEOGRAFIA",
        "topic": "Europa - Territorio"
    },
    {
        "question": "In Italia settentrionale, quale bacino lacustre risulta essere il più esteso in termini di superficie totale?",
        "correct_answer": "Il Lago di Garda, con una superficie totale misurata di circa 370 chilometri quadrati, esteso tra Lombardia, Veneto e Trentino.",
        "wrong_answers": [
            "Il Lago Maggiore, che vanta la maggiore ampiezza in larghezza occupando una superficie di gran lunga superiore agli altri bacini.",
            "Il Lago di Como, famoso per la sua eccezionale profondità che lo rende al contempo anche il più ampio di tutta la penisola italiana.",
            "Il Lago di Lugano, che pur trovandosi a cavallo con la Svizzera vanta una porzione idrica territoriale vastissima in Lombardia."
        ],
        "source_file": "CamScanner 09-06-26 09.08.pdf",
        "subject": "GEOGRAFIA",
        "topic": "Italia - Idrografia"
    },
    {
        "question": "Nella disciplina grammaticale, che cosa si intende per 'parti variabili del discorso'?",
        "correct_answer": "Le parole (nomi, aggettivi, pronomi, articoli, verbi) che subiscono flessioni, ovvero modificano la loro forma in base a genere, numero o tempo.",
        "wrong_answers": [
            "Esclusivamente i sostantivi derivati che cambiano costantemente radice e origine etimologica a seconda della regione in cui sono parlati.",
            "Gli avverbi e le congiunzioni che si legano in modo del tutto aleatorio ai verbi all'interno di proposizioni condizionali e ipotetiche.",
            "I verbi difettivi e irregolari, così definiti in quanto la loro estrema instabilità impedisce la formazione di una desinenza standardizzata."
        ],
        "source_file": "CamScanner 08-06-26 15.33.pdf",
        "subject": "ITALIANO",
        "topic": "Grammatica - Classificazione"
    },
    {
        "question": "Quale funzione precipua svolgono gli avverbi all'interno di una proposizione logica?",
        "correct_answer": "Sono elementi invariabili usati appositamente per modificare e precisare in modo specifico il significato di un verbo, aggettivo o altro avverbio.",
        "wrong_answers": [
            "Si comportano come veri e propri sostantivi autonomi che guidano sintatticamente l'intera principale e collegano il discorso.",
            "Determinano unicamente ed esclusivamente le flessioni di tempo nei verbi al passato remoto per marcare le tempistiche storiche.",
            "Fungono da congiunzioni coordinate tra proposizioni subordinate relative con lo scopo precipuo di annullarne le ambiguità."
        ],
        "source_file": "CamScanner 08-06-26 17.03.pdf",
        "subject": "ITALIANO",
        "topic": "Avverbi e Preposizioni"
    },
    {
        "question": "In grammatica, in quale categoria ricade l'espressione formata dall'unione di una preposizione semplice (es. 'in') con un articolo (es. 'il')?",
        "correct_answer": "Preposizione articolata, la quale fonde sinteticamente il valore della preposizione con le caratteristiche identificative dell'articolo determinativo.",
        "wrong_answers": [
            "Avverbio di specificazione temporale, usato in via eccezionale all'interno dei composti lessicali aventi radice pronominale mista.",
            "Aggettivo dimostrativo improprio, che assorbe la preposizione rendendo del tutto inutile esplicitare la collocazione spaziale esatta.",
            "Pronome relativo composto, poiché unisce strettamente l'introduzione preposizionale con l'oggetto e il soggetto a cui si relaziona."
        ],
        "source_file": "CamScanner 08-06-26 17.03.pdf",
        "subject": "ITALIANO",
        "topic": "Avverbi e Preposizioni"
    },
    {
        "question": "Quale caratteristica distingue in modo inequivocabile l'articolo 'indeterminativo' da quello 'determinativo'?",
        "correct_answer": "L'articolo indeterminativo segnala l'oggetto o l'individuo in forma generica e non specifica, mancando peraltro di una vera e propria declinazione plurale formale.",
        "wrong_answers": [
            "L'articolo indeterminativo viene usato esclusivamente dinanzi ai nomi difettivi e sovrabbondanti per mascherarne l'assenza intrinseca di un genere.",
            "L'articolo indeterminativo sostituisce obbligatoriamente le funzioni logiche proprie dei pronomi personali se impiegati nel mezzo di verbi transitivi o riflessivi.",
            "A differenza del determinativo, l'indeterminativo concorda rigidamente con la proposizione principale mutando la radice in base all'interlocutore."
        ],
        "source_file": "CamScanner 08-06-26 15.33.pdf",
        "subject": "ITALIANO",
        "topic": "Articoli"
    },
    {
        "question": "Cos'è che caratterizza la proposizione subordinata detta 'condizionale'?",
        "correct_answer": "Specifica in maniera netta l'ipotesi o la condizione dalla quale dipende inesorabilmente l'attuarsi dell'azione espressa all'interno della reggente.",
        "wrong_answers": [
            "Dichiara una condizione avversa e del tutto in contrasto con la reggente, invalidando così l'azione narrata all'interno del periodo complessivo.",
            "Indica esplicitamente il fine temporale ultimo da raggiungere affinché le tempistiche espresse nel verbo principale trovino logica collocazione.",
            "Conferma una realtà puramente descrittiva volta ad affermare qualità stabili dell'azione a prescindere dalle variabili causali espresse dal verbo."
        ],
        "source_file": "CamScanner 08-06-26 17.03.pdf",
        "subject": "ITALIANO",
        "topic": "Sintassi - Subordinate"
    },
    {
        "question": "Nel periodo ipotetico, quale specifico nome tecnico assume la proposizione dipendente che enuncia la condizione di base?",
        "correct_answer": "Viene denominata protasi, ed è generalmente introdotta dalla particella 'se' o da costrutti similari che ne determinano il carattere ipotetico.",
        "wrong_answers": [
            "Viene chiamata apodosi, e si manifesta esclusivamente sotto le forme implicite per mantenere lo stile conciso e non gravare la reggente.",
            "Prende il nome di relativa limitativa, poiché circoscrive i limiti materiali dell'azione a un ipotetico e fantasioso universo parallelo astratto.",
            "È definita incidentale causale, in quanto la sua unica utilità sintattica è chiarire la motivazione fortuita alla base dell'azione principale narrata."
        ],
        "source_file": "CamScanner 08-06-26 17.03.pdf",
        "subject": "ITALIANO",
        "topic": "Sintassi - Subordinate"
    }
]

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r"/\* INIZIO DATI \*/.*?/\* FINE DATI \*/"
replacement = "/* INIZIO DATI */\n  const QUESTIONS = " + json.dumps(questions, indent=4, ensure_ascii=False) + ";\n  /* FINE DATI */"

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"Aggiornate {len(questions)} domande in index.html.")
