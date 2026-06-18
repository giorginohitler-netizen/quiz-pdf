/**
 * add_batch2.js
 * Aggiunge nuove domande al database questions.json.
 * Basato ESCLUSIVAMENTE sui PDF sorgente letti integralmente.
 * Controlla duplicati per testo della domanda prima di inserire.
 */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'questions.json');

// ======================== NUOVE DOMANDE ========================
// Organizzate per Materia → Topic → Subtopic
// Basate al 100% sui PDF all_texts_utf8.txt

const NEW_QUESTIONS = {

  "Educazione Civica": {

    "Fonti del Diritto e UE": {
      "Atti dell'Unione Europea": [
        {
          question: "Quale atto dell'UE ha portata generale, è obbligatorio in tutti i suoi elementi e direttamente applicabile in ciascuno Stato membro?",
          options: ["Il regolamento", "La direttiva", "La decisione", "La raccomandazione"],
          correctAnswer: "Il regolamento",
          explanation: "L'art. 288 TFUE distingue: il regolamento ha portata generale ed è direttamente applicabile; la direttiva vincola solo quanto al risultato; la decisione è obbligatoria solo per i destinatari."
        },
        {
          question: "La direttiva europea vincola lo Stato membro cui è rivolta rispetto a…",
          options: ["Il risultato da raggiungere", "La forma e i mezzi da usare", "Ogni singolo elemento dell'atto", "Nessun obbligo concreto"],
          correctAnswer: "Il risultato da raggiungere",
          explanation: "La direttiva fissa l'obiettivo lasciando agli organi nazionali libertà di scelta sulla forma e sui mezzi per raggiungerlo."
        },
        {
          question: "Le raccomandazioni e i pareri dell'UE hanno…",
          options: ["Efficacia precettiva e vincolante", "Solo efficacia verso lo Stato destinatario", "Nessuna efficacia vincolante", "La stessa forza delle direttive"],
          correctAnswer: "Nessuna efficacia vincolante",
          explanation: "A differenza di regolamenti, direttive e decisioni, le raccomandazioni e i pareri sono sforniti di efficacia precettiva e vincolante."
        },
        {
          question: "Con quale legge è stata introdotta la distinzione tra 'legge di delegazione europea' e 'legge europea' per adeguare l'ordinamento italiano all'UE?",
          options: ["L. 86/1989 (legge La Pergola)", "L. 11/2005 (legge Buttiglione)", "L. 234/2012", "L. 183/1987 (legge Fabbri)"],
          correctAnswer: "L. 234/2012",
          explanation: "La L. 24 dicembre 2012, n. 234 ha abrogato la L. 11/2005 e introdotto due strumenti distinti: la legge di delegazione europea (da presentare entro il 28 febbraio) e la legge europea."
        },
        {
          question: "Quale articolo della Costituzione italiana è stato ritenuto il principale fondamento costituzionale della partecipazione italiana alle Comunità europee?",
          options: ["Art. 11 Cost.", "Art. 117 Cost.", "Art. 10 Cost.", "Art. 72 Cost."],
          correctAnswer: "Art. 11 Cost.",
          explanation: "L'art. 11 Cost., che consente limitazioni di sovranità in condizioni di parità con altri Stati, è stato invocato come copertura costituzionale per i trattati comunitari."
        }
      ]
    },

    "Organi dello Stato": {
      "NATO e Organizzazioni Internazionali": [
        {
          question: "Qual è l'organo dell'ONU responsabile del mantenimento della pace e della sicurezza internazionale?",
          options: ["Il Consiglio di Sicurezza", "L'Assemblea Generale", "Il Segretario Generale", "La Corte Internazionale di Giustizia"],
          correctAnswer: "Il Consiglio di Sicurezza",
          explanation: "Il Consiglio di Sicurezza è l'organo cui spetta la responsabilità principale del mantenimento della pace e della sicurezza internazionale."
        },
        {
          question: "Quanti membri permanenti siede nel Consiglio di Sicurezza dell'ONU, e qual è il loro privilegio?",
          options: ["Cinque, con diritto di veto", "Dieci, con doppio voto", "Quindici, senza privilegi speciali", "Tre, con potere di veto"],
          correctAnswer: "Cinque, con diritto di veto",
          explanation: "Il Consiglio di Sicurezza è composto da 15 membri: 5 permanenti (USA, Russia, Francia, Gran Bretagna, Cina) con diritto di veto, e 10 eletti a rotazione ogni 2 anni."
        },
        {
          question: "La Dichiarazione Universale dei Diritti dell'Uomo è stata adottata dall'Assemblea Generale dell'ONU il…",
          options: ["10 dicembre 1948", "24 ottobre 1945", "26 giugno 1945", "4 aprile 1949"],
          correctAnswer: "10 dicembre 1948",
          explanation: "Il 10 dicembre 1948 l'Assemblea Generale adottò la Dichiarazione Universale dei Diritti dell'Uomo, contenente i principi essenziali della dignità umana."
        },
        {
          question: "Chi nomina il Segretario Generale dell'ONU e per quanti anni rimane in carica?",
          options: ["L'Assemblea Generale, ogni cinque anni", "Il Consiglio di Sicurezza, ogni tre anni", "I cinque membri permanenti, a vita", "Il Consiglio di Sicurezza, ogni cinque anni"],
          correctAnswer: "L'Assemblea Generale, ogni cinque anni",
          explanation: "Il Segretario Generale è eletto ogni cinque anni dall'Assemblea Generale su raccomandazione del Consiglio di Sicurezza."
        },
        {
          question: "La Corte Penale Internazionale (CPI) ha il compito di…",
          options: ["Giudicare le persone fisiche responsabili di crimini internazionali gravi", "Risolvere le controversie tra Stati", "Emanare sanzioni economiche", "Gestire le operazioni di peacekeeping"],
          correctAnswer: "Giudicare le persone fisiche responsabili di crimini internazionali gravi",
          explanation: "La Corte Penale Internazionale, con sede all'Aja, giudica le persone fisiche responsabili di genocidio, crimini contro l'umanità e crimini di guerra."
        },
        {
          question: "Il Consiglio d'Europa ha sede in quale città?",
          options: ["Strasburgo", "Bruxelles", "L'Aja", "Ginevra"],
          correctAnswer: "Strasburgo",
          explanation: "Il Consiglio d'Europa ha sede a Strasburgo. Non va confuso con il Consiglio dell'Unione Europea o il Consiglio Europeo."
        },
        {
          question: "Quale tra i seguenti non è un obiettivo principale del Consiglio d'Europa?",
          options: ["Gestione della moneta unica europea", "Promozione dei diritti umani", "Sostenere la democrazia parlamentare", "Rafforzare lo Stato di diritto"],
          correctAnswer: "Gestione della moneta unica europea",
          explanation: "Il Consiglio d'Europa si occupa di diritti umani, democrazia e Stato di diritto. La gestione della moneta unica è competenza dell'UE tramite la BCE."
        }
      ]
    }
  },

  "Geografia": {

    "Italia": {
      "Territorio e Morfologia": [
        {
          question: "La superficie totale dell'Italia è di circa…",
          options: ["301.336 km²", "250.000 km²", "350.000 km²", "280.000 km²"],
          correctAnswer: "301.336 km²",
          explanation: "Il territorio italiano ha una superficie di circa 301.336 km², comprendendo la penisola, le isole maggiori e minori."
        },
        {
          question: "Qual è la montagna più alta d'Europa, situata nelle Alpi Graie?",
          options: ["Monte Bianco (4.810 m)", "Monte Rosa (4.633 m)", "Gran Paradiso (4.061 m)", "Cervino (4.478 m)"],
          correctAnswer: "Monte Bianco (4.810 m)",
          explanation: "Il Monte Bianco, con 4.810 m, è la cima più alta d'Europa e si trova nelle Alpi Graie, al confine tra Valle d'Aosta e Francia."
        },
        {
          question: "Il Monte Rosa appartiene a quale sezione alpina e qual è la sua altezza?",
          options: ["Alpi Pennine, 4.633 m", "Alpi Graie, 4.061 m", "Alpi Retiche, 4.050 m", "Alpi Cozie, 3.841 m"],
          correctAnswer: "Alpi Pennine, 4.633 m",
          explanation: "Il Monte Rosa (4.633 m) appartiene alle Alpi Pennine ed è la seconda vetta più alta d'Europa, condiviso tra Piemonte, Valle d'Aosta e Svizzera."
        },
        {
          question: "Dove nasce il fiume Po e quale caratteristica ha la sua foce?",
          options: ["Nasce dal Monviso e ha foce a delta nel Mar Adriatico", "Nasce dal Monte Bianco e sfocia nel Tirreno", "Nasce dalle Alpi Retiche e ha foce a estuario", "Nasce dal Gran Sasso e sfocia nell'Adriatico"],
          correctAnswer: "Nasce dal Monviso e ha foce a delta nel Mar Adriatico",
          explanation: "Il Po nasce dal Monviso (Alpi Cozie) e, alimentato da numerosi affluenti alpini e appenninici, sfocia con foce a delta nel Mar Adriatico. È il fiume più lungo d'Italia (652 km)."
        },
        {
          question: "Quale fiume italiano è il più lungo dopo il Po?",
          options: ["Adige (410 km)", "Tevere (405 km)", "Adda (313 km)", "Arno (241 km)"],
          correctAnswer: "Adige (410 km)",
          explanation: "L'Adige con 410 km è il secondo fiume più lungo d'Italia, seguito dal Tevere con 405 km."
        },
        {
          question: "Il Corno Grande, vetta massima dell'Appennino centrale, è situato nel…",
          options: ["Gran Sasso (2.912 m)", "Monte Cimone (2.165 m)", "Monte Pollino (2.248 m)", "La Maiella (2.795 m)"],
          correctAnswer: "Gran Sasso (2.912 m)",
          explanation: "Il Corno Grande (2.912 m), nel massiccio del Gran Sasso, è la montagna più elevata dell'intera catena appenninica e si trova nell'Appennino Abruzzese."
        },
        {
          question: "L'Etna è il vulcano più alto della placca euroasiatica e si trova nell'Appennino…",
          options: ["Meridionale (Appennino Siculo), 3.323 m", "Centrale, 2.912 m", "Settentrionale, 2.165 m", "Calabrese, 1.955 m"],
          correctAnswer: "Meridionale (Appennino Siculo), 3.323 m",
          explanation: "L'Etna (o Mongibello, 3.323 m) si erge nell'Appennino meridionale, nel tratto siculo, ed è il più alto vulcano attivo terrestre della placca euroasiatica."
        },
        {
          question: "Qual è il lago più grande d'Italia per superficie?",
          options: ["Lago di Garda (Benaco), 370 km²", "Lago Maggiore (Verbano), 212 km²", "Lago di Como (Lario), 146 km²", "Lago Trasimeno, 128 km²"],
          correctAnswer: "Lago di Garda (Benaco), 370 km²",
          explanation: "Il Lago di Garda, con 370 km² di superficie, è il più grande lago d'Italia. Il lago di Como è invece il più profondo (410 m)."
        },
        {
          question: "Quale lago italiano ha la profondità massima maggiore?",
          options: ["Lago di Como (410 m)", "Lago Maggiore (372 m)", "Lago di Garda (346 m)", "Lago di Lugano (288 m)"],
          correctAnswer: "Lago di Como (410 m)",
          explanation: "Il Lago di Como (Lario) raggiunge una profondità massima di 410 m, risultando il più profondo lago italiano."
        },
        {
          question: "Quante regioni italiane hanno uno statuto speciale?",
          options: ["5 regioni", "4 regioni", "6 regioni", "3 regioni"],
          correctAnswer: "5 regioni",
          explanation: "Le regioni a statuto speciale sono 5: Valle d'Aosta, Friuli-Venezia Giulia, Trentino-Alto Adige, Sicilia e Sardegna."
        },
        {
          question: "L'Italia è il terzo Paese dell'UE per numero di abitanti. Quanti abitanti conta (stima al 1° gennaio 2020)?",
          options: ["60.244.639", "58.000.000", "63.000.000", "55.000.000"],
          correctAnswer: "60.244.639",
          explanation: "Con una popolazione di 60.244.639 unità (stima 2020), l'Italia è il terzo Paese dell'UE per numero di abitanti, dopo Germania e Francia."
        },
        {
          question: "Quale isola italiana è la più grande del Mediterraneo?",
          options: ["Sicilia (25.426 km²)", "Sardegna (23.812 km²)", "Elba (223 km²)", "Pantelleria (83 km²)"],
          correctAnswer: "Sicilia (25.426 km²)",
          explanation: "La Sicilia, con circa 25.426 km², è la più grande isola del Mediterraneo. La Sardegna (23.812 km²) è la seconda per dimensione."
        }
      ],
      "Economia Italiana": [
        {
          question: "A quale gruppo intergovernativo appartiene l'Italia insieme a Canada, Francia, Germania, Giappone, Regno Unito e USA?",
          options: ["G7", "G20", "OCSE", "NATO"],
          correctAnswer: "G7",
          explanation: "L'Italia fa parte del G7 (Gruppo dei Sette), l'organizzazione intergovernativa dei sette Stati economicamente più avanzati del pianeta."
        },
        {
          question: "In quale anno l'Italia ha adottato l'euro come moneta circolante?",
          options: ["2002", "1999", "2001", "1998"],
          correctAnswer: "2002",
          explanation: "L'Italia ha aderito all'euro nel 1999 (per le transazioni finanziarie), ma l'euro ha sostituito la lira nella circolazione cartacea a partire dal 2002."
        },
        {
          question: "Qual è il principale settore dell'economia italiana per numero di occupati e valore aggiunto?",
          options: ["Il terziario (servizi), oltre il 70%", "L'industria manifatturiera, 30%", "L'agricoltura, 45%", "Il settore energetico, 25%"],
          correctAnswer: "Il terziario (servizi), oltre il 70%",
          explanation: "Il terziario costituisce il settore più importante dell'economia italiana, sia per numero di occupati che per valore aggiunto, con percentuali che in entrambi i casi superano il 70%."
        },
        {
          question: "Quale regione meridionale ospita i più grandi giacimenti petroliferi dell'Europa continentale?",
          options: ["Basilicata (Val d'Agri)", "Sicilia (Ragusa)", "Puglia (Foggia)", "Calabria (Crotone)"],
          correctAnswer: "Basilicata (Val d'Agri)",
          explanation: "I giacimenti della Val d'Agri in Basilicata sono i più grandi dell'Europa continentale, scoperti nella prima metà del XX secolo e sfruttati dagli anni '80."
        },
        {
          question: "Nel 2019, l'Italia si colloca al quinto posto nel mondo per numero di arrivi di turisti stranieri. Quanti erano all'anno?",
          options: ["62,1 milioni", "75 milioni", "45 milioni", "90 milioni"],
          correctAnswer: "62,1 milioni",
          explanation: "Con 62,1 milioni di turisti stranieri all'anno (dati 2019), l'Italia si collocava al quinto posto nel mondo per arrivi internazionali."
        },
        {
          question: "Quale casa automobilistica italiana fa parte del gruppo Stellantis, che ha sede legale ad Amsterdam?",
          options: ["FIAT", "Ferrari", "Lamborghini", "Maserati"],
          correctAnswer: "FIAT",
          explanation: "FIAT (Fabbrica Italiana Automobili Torino) è un marchio automobilistico di Stellantis, impresa multinazionale nata dalla fusione tra PSA e FIAT Chrysler Automobiles, con sede legale ad Amsterdam."
        }
      ],
      "Regioni d'Italia": [
        {
          question: "Qual è il capoluogo della Valle d'Aosta e quanti comuni la compongono?",
          options: ["Aosta, 74 comuni", "Aosta, 112 comuni", "Torino, 50 comuni", "Aosta, 8 comuni"],
          correctAnswer: "Aosta, 74 comuni",
          explanation: "La Valle d'Aosta ha capoluogo Aosta e non è suddivisa in province, bensì in 74 comuni."
        },
        {
          question: "Qual è la regione italiana più popolosa?",
          options: ["Lombardia (9.742.676 ab.)", "Campania (5.812.962 ab.)", "Lazio (5.626.710 ab.)", "Sicilia (5.037.800 ab.)"],
          correctAnswer: "Lombardia (9.742.676 ab.)",
          explanation: "La Lombardia è la regione italiana più popolosa con circa 9,7 milioni di abitanti. Il suo capoluogo è Milano."
        },
        {
          question: "Quale regione italiana confina con Austria, Svizzera, Lombardia e Veneto?",
          options: ["Trentino-Alto Adige", "Friuli-Venezia Giulia", "Piemonte", "Valle d'Aosta"],
          correctAnswer: "Trentino-Alto Adige",
          explanation: "Il Trentino-Alto Adige confina a nord con l'Austria, a ovest con la Svizzera, a sud-ovest con la Lombardia e a sud-est con il Veneto."
        },
        {
          question: "Qual è il capoluogo della Calabria?",
          options: ["Catanzaro", "Reggio Calabria", "Cosenza", "Crotone"],
          correctAnswer: "Catanzaro",
          explanation: "Catanzaro è il capoluogo della regione Calabria, mentre Reggio Calabria è Città metropolitana."
        },
        {
          question: "La regione Friuli-Venezia Giulia ha sostituito le province con quali enti?",
          options: ["4 Enti di decentramento regionale (EDR)", "18 Comuni capoluogo", "6 Liberi consorzi", "12 Unioni territoriali"],
          correctAnswer: "4 Enti di decentramento regionale (EDR)",
          explanation: "Dopo la soppressione delle province (2017-2018) e la soppressione delle 18 UTI (2020), in Friuli-Venezia Giulia sono stati istituiti 4 Enti di decentramento regionale."
        },
        {
          question: "Quale isola si trova nel Lago d'Iseo, in Lombardia?",
          options: ["Monte Isola (4,3 km²)", "Isola Bella", "Isola Polvese", "Isola Maggiore"],
          correctAnswer: "Monte Isola (4,3 km²)",
          explanation: "Monte Isola è la principale isola del Lago d'Iseo (Sebino), con una superficie di 4,3 km², ed è la più grande isola lacustre dell'Europa centro-meridionale."
        }
      ]
    },

    "Europa": {
      "Morfologia e Idrografia": [
        {
          question: "Quale fiume europeo è il più lungo in assoluto?",
          options: ["Volga (3.531 km, Russia)", "Danubio (2.860 km)", "Reno (1.326 km)", "Dnepr (2.201 km)"],
          correctAnswer: "Volga (3.531 km, Russia)",
          explanation: "Il Volga, che scorre in Russia e sfocia nel Mar Caspio, è il fiume più lungo d'Europa con 3.531 km."
        },
        {
          question: "Qual è il lago più esteso d'Europa (escluso il Mar Caspio)?",
          options: ["Lago di Ladoga, Russia (18.400 km²)", "Lago di Onega, Russia (9.610 km²)", "Vanern, Svezia (5.585 km²)", "Iso-Saimaa, Finlandia (4.400 km²)"],
          correctAnswer: "Lago di Ladoga, Russia (18.400 km²)",
          explanation: "Il Lago di Ladoga in Russia, con circa 18.400 km², è il lago più esteso d'Europa, se si esclude il Mar Caspio."
        },
        {
          question: "Quale sistema montuoso costituisce il confine naturale tra il continente europeo e quello asiatico?",
          options: ["Monti Urali", "Catena del Caucaso", "Alpi Scandinave", "Monti Balcani"],
          correctAnswer: "Monti Urali",
          explanation: "I Monti Urali, di modesta altitudine e forme smussate, costituiscono il confine naturale tra Europa e Asia."
        },
        {
          question: "Quale cima è la più alta d'Europa per il continente nel suo complesso?",
          options: ["Monte Bianco (4.810 m)", "Monte Rosa (4.634 m)", "Elbrus (5.642 m, Russia)", "Cervino (4.478 m)"],
          correctAnswer: "Elbrus (5.642 m, Russia)",
          explanation: "Se si considera la Russia, l'Elbrus (5.642 m nel Caucaso) è la montagna più alta del continente europeo. Se si considera solo l'Europa occidentale, è il Monte Bianco."
        }
      ],
      "Paesi europei": [
        {
          question: "Qual è la capitale della Svizzera (sede del governo)?",
          options: ["Berna", "Zurigo", "Ginevra", "Basilea"],
          correctAnswer: "Berna",
          explanation: "La Svizzera è una Repubblica federale. Berna è la sede del governo federale, sebbene Zurigo sia la città più grande."
        },
        {
          question: "In quale data il Regno Unito ha lasciato ufficialmente l'Unione Europea (Brexit)?",
          options: ["31 gennaio 2020", "23 giugno 2016", "1 marzo 2019", "31 dicembre 2020"],
          correctAnswer: "31 gennaio 2020",
          explanation: "Il Regno Unito ha lasciato ufficialmente l'Unione Europea il 31 gennaio 2020, dopo il referendum del giugno 2016 che aveva sancito la scelta per la Brexit."
        },
        {
          question: "Quale Paese della regione scandinava NON fa parte dell'Unione Europea?",
          options: ["Norvegia", "Finlandia", "Svezia", "Danimarca"],
          correctAnswer: "Norvegia",
          explanation: "La Norvegia non è membro dell'UE, anche se fa parte dello Spazio Economico Europeo (SEE). Finlandia, Svezia e Danimarca sono invece membri UE."
        },
        {
          question: "In quale Paese si trova il Monte Olimpo, la montagna più alta della Grecia?",
          options: ["Grecia (2.917 m)", "Albania (2.753 m)", "Macedonia del Nord (2.754 m)", "Bulgaria (2.925 m)"],
          correctAnswer: "Grecia (2.917 m)",
          explanation: "Il Monte Olimpo (2.917 m) è la montagna più alta della Grecia, nella mitologia sede degli dèi greci."
        },
        {
          question: "Quante lingue ufficiali ha la Svizzera?",
          options: ["4 (tedesco, francese, italiano, romancio)", "3 (tedesco, francese, italiano)", "2 (tedesco, francese)", "5"],
          correctAnswer: "4 (tedesco, francese, italiano, romancio)",
          explanation: "La Svizzera ha 4 lingue ufficiali: tedesco (la più parlata), francese, italiano e reto-romancio."
        },
        {
          question: "Il Benelux è un'unione commerciale stipulata nel 1960 tra quali Paesi?",
          options: ["Belgio, Paesi Bassi e Lussemburgo", "Belgio, Norvegia e Lussemburgo", "Belgio, Olanda e Liechtenstein", "Bosnia, Paesi Bassi e Lituania"],
          correctAnswer: "Belgio, Paesi Bassi e Lussemburgo",
          explanation: "Il nome Benelux deriva dall'unione commerciale del 1960 tra Belgio, Paesi Bassi (Nederland) e Lussemburgo (Luxembourg)."
        },
        {
          question: "Quale Paese europeo ha la maggiore economia tra tutti i Paesi membri dell'UE?",
          options: ["Germania (25% del PIL UE)", "Francia (17%)", "Italia (12,5%)", "Spagna (8,4%)"],
          correctAnswer: "Germania (25% del PIL UE)",
          explanation: "La Germania ha l'economia più sviluppata tra gli Stati UE, con un PIL pari a circa 3.332 miliardi di euro, ovvero il 25% del totale UE."
        },
        {
          question: "I Paesi baltici (Estonia, Lettonia, Lituania) sono entrati nell'Unione Europea in quale anno?",
          options: ["2004", "1995", "2000", "2007"],
          correctAnswer: "2004",
          explanation: "Dal 2004 Estonia, Lettonia e Lituania sono membri dell'Unione Europea. Dal 1945 al 1991 erano stati sotto il controllo dell'Unione Sovietica."
        },
        {
          question: "La penisola iberica è separata dall'Africa da quale stretto?",
          options: ["Stretto di Gibilterra (14 km)", "Stretto di Otranto", "Stretto di Messina", "Stretto di Sicilia"],
          correctAnswer: "Stretto di Gibilterra (14 km)",
          explanation: "La penisola iberica è separata dall'Africa dai soli 14 km dello Stretto di Gibilterra, che collega l'Oceano Atlantico con il Mar Mediterraneo."
        },
        {
          question: "Qual è la montagna più alta del Regno Unito?",
          options: ["Ben Nevis (Scozia)", "Scafell Pike (Inghilterra)", "Snowdon (Galles)", "Slieve Donard (Irlanda del Nord)"],
          correctAnswer: "Ben Nevis (Scozia)",
          explanation: "Il Ben Nevis, situato in Scozia nelle Highlands, è la cima più alta dell'intero arcipelago britannico."
        },
        {
          question: "Quale Stato europeo ha la superficie più piccola dopo la Città del Vaticano?",
          options: ["Monaco (2,02 km²)", "San Marino (61,2 km²)", "Liechtenstein (160,5 km²)", "Andorra (468 km²)"],
          correctAnswer: "Monaco (2,02 km²)",
          explanation: "Il Principato di Monaco ha una superficie di soli 2,02 km², rendendolo il secondo Stato più piccolo del mondo dopo la Città del Vaticano."
        },
        {
          question: "Quale Stato si trova nelle enclave all'interno del territorio italiano?",
          options: ["San Marino e Città del Vaticano", "Andorra e Monaco", "Liechtenstein e San Marino", "San Marino e Malta"],
          correctAnswer: "San Marino e Città del Vaticano",
          explanation: "San Marino (61,2 km², capitale San Marino) e la Città del Vaticano (0,44 km²) sono i due Stati indipendenti situati all'interno del territorio italiano."
        },
        {
          question: "La guerra civile jugoslava, iniziata nel 1991, quando ha avuto fine (prima fase) e dove è ripresa nel 1998?",
          options: ["Fine nel 1995, ripresa in Kosovo", "Fine nel 1993, ripresa in Bosnia", "Fine nel 1999, ripresa in Croazia", "Fine nel 1997, ripresa in Serbia"],
          correctAnswer: "Fine nel 1995, ripresa in Kosovo",
          explanation: "La guerra civile jugoslava durò fino al 1995 e riprese in Kosovo nel 1998, a seguito delle spinte autonomistiche e degli odi interetnici dopo la dissoluzione della Jugoslavia."
        }
      ]
    }
  },

  "Italiano": {

    "Grammatica": {
      "Morfologia - Parti del Discorso": [
        {
          question: "Quante sono le parti del discorso in italiano?",
          options: ["9 (articolo, nome, aggettivo, pronome, verbo, avverbio, preposizione, congiunzione, interiezione)", "7", "10", "8"],
          correctAnswer: "9 (articolo, nome, aggettivo, pronome, verbo, avverbio, preposizione, congiunzione, interiezione)",
          explanation: "Le parti del discorso sono 9: articolo, nome, aggettivo, pronome e verbo sono variabili; avverbio, preposizione, congiunzione e interiezione sono invariabili."
        },
        {
          question: "L'articolo 'lo' si usa davanti a nomi maschili che cominciano per…",
          options: ["X, Z, GN, PS, PN, S impura", "Vocale", "Qualsiasi consonante", "B, D, F, G, L"],
          correctAnswer: "X, Z, GN, PS, PN, S impura",
          explanation: "L'articolo determinativo 'lo' (plurale 'gli') si usa davanti a nomi maschili inizianti per x, z, gn, ps, pn, s impura (es. lo studente, lo zaino, lo gnomo)."
        },
        {
          question: "Quale dei seguenti è un nome collettivo?",
          options: ["Gregge", "Pecora", "Sara", "Gioia"],
          correctAnswer: "Gregge",
          explanation: "Il nome collettivo riguarda un insieme di persone, animali o cose della stessa specie (es. gregge, popolo, flotta). 'Pecora' è individuale, 'Sara' è proprio, 'gioia' è astratto."
        },
        {
          question: "Un nome alterato diminutivo si ottiene con quale suffisso?",
          options: ["-ino, -etto, -ello", "-one, -acchione", "-accio, -astro", "-issimo, -mente"],
          correctAnswer: "-ino, -etto, -ello",
          explanation: "I nomi alterati diminutivi si formano con suffissi come -ino (ombrellino), -etto (bacetto), -ello (alberello). I peggiorativi usano -accio, gli accrescitivi -one."
        },
        {
          question: "Qual è la differenza tra aggettivo qualificativo e aggettivo determinativo?",
          options: ["Il qualificativo esprime una qualità del nome, il determinativo ne precisa aspetti come quantità o posizione", "Il qualificativo cambia genere, il determinativo no", "Il qualificativo è sempre prima del nome, il determinativo dopo", "Non c'è differenza"],
          correctAnswer: "Il qualificativo esprime una qualità del nome, il determinativo ne precisa aspetti come quantità o posizione",
          explanation: "Gli aggettivi qualificativi esprimono una qualità o condizione del nome (alto, bello). Gli aggettivi determinativi (possessivi, dimostrativi, numerali ecc.) ne precisano aspetti come la vicinanza, la quantità o la posizione."
        },
        {
          question: "Il pronome relativo 'cui' ha quale caratteristica sintattica?",
          options: ["È invariabile e non è mai soggetto, ma sempre complemento", "È variabile e si usa solo come soggetto", "Può essere sia soggetto che complemento diretto", "Si usa esclusivamente in funzione di soggetto"],
          correctAnswer: "È invariabile e non è mai soggetto, ma sempre complemento",
          explanation: "Il pronome relativo 'cui' è invariabile e non è mai soggetto, bensì sempre complemento (es. Ti do un consiglio di cui mi ringrazierai)."
        },
        {
          question: "A quale coniugazione appartengono i verbi che all'infinito presente escono in -ere?",
          options: ["Seconda coniugazione", "Prima coniugazione", "Terza coniugazione", "Coniugazione irregolare"],
          correctAnswer: "Seconda coniugazione",
          explanation: "Le coniugazioni italiane sono: I (-are: cantare), II (-ere: vedere, temere), III (-ire: udire, partire). I verbi in -ere appartengono alla seconda coniugazione."
        },
        {
          question: "Quali sono le preposizioni semplici in italiano?",
          options: ["Di, a, da, in, con, su, per, tra, fra (nove in totale)", "Di, a, da, in, per, tra (sei)", "A, da, in, su, per, tra, verso (sette)", "Di, a, da, in, con, su, per (sette)"],
          correctAnswer: "Di, a, da, in, con, su, per, tra, fra (nove in totale)",
          explanation: "Le preposizioni proprie semplici sono in tutto nove: di, a, da, in, con, su, per, tra, fra. Da queste, unite agli articoli determinativi, si formano le preposizioni articolate."
        },
        {
          question: "Come si chiamano le congiunzioni che uniscono due proposizioni stabilendo fra esse un rapporto di dipendenza?",
          options: ["Subordinanti", "Coordinanti", "Copulative", "Disgiuntive"],
          correctAnswer: "Subordinanti",
          explanation: "Le congiunzioni subordinanti (es. benché, perché, quando, sebbene) congiungono due proposizioni in modo tale da stabilire fra esse un rapporto di dipendenza o subordinazione."
        },
        {
          question: "Quale tipo di avverbio si forma aggiungendo il suffisso -mente alla forma femminile dell'aggettivo qualificativo?",
          options: ["Avverbio di modo (qualificativo)", "Avverbio di luogo", "Avverbio di tempo", "Avverbio di quantità"],
          correctAnswer: "Avverbio di modo (qualificativo)",
          explanation: "Gli avverbi di modo (qualificativi) si formano spesso aggiungendo il suffisso -mente alla forma femminile dell'aggettivo (es. precisa → precisamente). Indicano il modo in cui avviene un'azione."
        }
      ],
      "Sintassi": [
        {
          question: "Quante proposizioni contiene un periodo?",
          options: ["Tante quanti sono i verbi in esso contenuti", "Sempre due: principale e subordinata", "Tante quante le virgole", "Una sola proposizione principale"],
          correctAnswer: "Tante quanti sono i verbi in esso contenuti",
          explanation: "In un periodo ci sono tante proposizioni quanti sono i verbi in esso contenuti. La proposizione è l'unità sintattica retta da un verbo."
        },
        {
          question: "Quale tipo di proposizione subordinata svolge la funzione di soggetto rispetto alla principale?",
          options: ["La proposizione soggettiva", "La proposizione oggettiva", "La proposizione relativa", "La proposizione dichiarativa"],
          correctAnswer: "La proposizione soggettiva",
          explanation: "La proposizione soggettiva svolge la funzione di soggetto rispetto alla principale, rispondendo alla domanda 'che cosa?' ed è introdotta dalla congiunzione 'che' (es. Sembra che non sia contento)."
        },
        {
          question: "La proposizione concesiva indica…",
          options: ["La circostanza nonostante la quale si verifica l'azione della principale", "Lo scopo da raggiungere", "La causa dell'azione principale", "Il mezzo con cui si compie l'azione"],
          correctAnswer: "La circostanza nonostante la quale si verifica l'azione della principale",
          explanation: "La proposizione concessiva indica la circostanza nonostante la quale si verifica l'azione della principale. È introdotta da benché, sebbene, nonostante, quantunque (es. Sebbene fosse stanca, continuava a leggere)."
        },
        {
          question: "Il predicato nominale è composto da…",
          options: ["Il verbo essere (copula) + parte nominale", "Solo da un verbo d'azione", "Un verbo intransitivo + avverbio", "Un sostantivo + aggettivo"],
          correctAnswer: "Il verbo essere (copula) + parte nominale",
          explanation: "Il predicato nominale è formato dal verbo essere (copula) + una parte nominale (es. L'oro è costoso: 'è' = copula, 'costoso' = parte nominale)."
        },
        {
          question: "L'apposizione è un sostantivo che si unisce a un altro sostantivo per…",
          options: ["Meglio determinarlo", "Sostituirlo completamente", "Esprimere un'azione", "Indicare una qualità astratta"],
          correctAnswer: "Meglio determinarlo",
          explanation: "L'apposizione è un sostantivo che si 'appone' a un altro sostantivo per meglio determinarlo (es. Il poeta Virgilio celebrò le origini di Roma)."
        },
        {
          question: "Quale complemento risponde alla domanda 'a chi? a che cosa?' ed è retto dalla preposizione 'a'?",
          options: ["Complemento di termine", "Complemento oggetto", "Complemento di causa", "Complemento di stato in luogo"],
          correctAnswer: "Complemento di termine",
          explanation: "Il complemento di termine risponde alla domanda 'a chi? a che cosa?' ed è retto dalla preposizione 'a' semplice o articolata (es. Ho regalato un libro a mia sorella)."
        },
        {
          question: "Le proposizioni coordinate sono unite alla principale da…",
          options: ["Una congiunzione coordinante o da un segno di interpunzione debole", "Una congiunzione subordinante", "Un pronome relativo", "Un avverbio di modo"],
          correctAnswer: "Una congiunzione coordinante o da un segno di interpunzione debole",
          explanation: "Le proposizioni coordinate sono unite alla principale da una congiunzione coordinante (e, ma, o, dunque...) o da un segno di interpunzione debole (virgola, due punti, punto e virgola)."
        },
        {
          question: "Quale tipo di proposizione principale esprime un ordine o un'esortazione?",
          options: ["La proposizione volitiva (o imperativa)", "La proposizione enunciativa", "La proposizione desiderativa", "La proposizione esclamativa"],
          correctAnswer: "La proposizione volitiva (o imperativa)",
          explanation: "La proposizione volitiva (o imperativa) comunica un ordine, un'esortazione, un divieto o un invito, usando l'imperativo, il congiuntivo o non + infinito (es. State buoni)."
        }
      ]
    }
  }
};

// ===================================================================
// FUNZIONI DI MERGE
// ===================================================================

function loadDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function getExistingQuestions(db) {
  const set = new Set();
  for (const materia in db) {
    for (const topic in db[materia]) {
      for (const subtopic in db[materia][topic]) {
        db[materia][topic][subtopic].forEach(q => set.add(q.question.trim().toLowerCase()));
      }
    }
  }
  return set;
}

function mergeQuestions(db, newQuestions, existingSet) {
  let added = 0;
  let skipped = 0;

  for (const materia in newQuestions) {
    if (!db[materia]) db[materia] = {};

    for (const topic in newQuestions[materia]) {
      if (!db[materia][topic]) db[materia][topic] = {};

      for (const subtopic in newQuestions[materia][topic]) {
        if (!db[materia][topic][subtopic]) db[materia][topic][subtopic] = [];

        for (const q of newQuestions[materia][topic][subtopic]) {
          const key = q.question.trim().toLowerCase();
          if (existingSet.has(key)) {
            console.log(`  [SKIP] "${q.question.substring(0, 60)}..."`);
            skipped++;
          } else {
            db[materia][topic][subtopic].push(q);
            existingSet.add(key);
            added++;
          }
        }
      }
    }
  }

  return { added, skipped };
}

// ===================================================================
// MAIN
// ===================================================================

console.log('=== AuraTest – Batch 2 Question Importer ===\n');

const db = loadDB();
const existingSet = getExistingQuestions(db);
console.log(`Domande esistenti nel database: ${existingSet.size}`);

const { added, skipped } = mergeQuestions(db, NEW_QUESTIONS, existingSet);

// Conteggio finale
let total = 0;
for (const m in db) for (const t in db[m]) for (const s in db[m][t]) total += db[m][t][s].length;

saveDB(db);

console.log(`\n✅ Importazione completata:`);
console.log(`   Aggiunte:  ${added}`);
console.log(`   Saltate (duplicate): ${skipped}`);
console.log(`   Totale domande nel DB: ${total}`);
