// Script per aggiungere nuove domande al database esistente
// Copre gli argomenti mancanti per ogni materia

const fs = require('fs');
const path = require('path');

const newQuestions = {
    "Educazione Civica": {
        "La Costituzione e le Fonti del Diritto": {
            "Lo Stato e la Costituzione": [
                {
                    "id": 201,
                    "question": "Quale articolo della Costituzione tutela la lingua e la cultura delle minoranze linguistiche presenti in Italia?",
                    "options": ["Articolo 6", "Articolo 2", "Articolo 9", "Articolo 14"],
                    "correctAnswer": "Articolo 6",
                    "explanation": "L'art. 6 stabilisce che 'La Repubblica tutela le minoranze linguistiche', riconoscendo la diversità linguistica come valore culturale."
                },
                {
                    "id": 202,
                    "question": "Il principio democratico sancito dall'art. 1 stabilisce che la sovranità appartiene al popolo, ma con quali limiti?",
                    "options": ["Nelle forme e nei limiti della Costituzione", "Senza alcun limite, il popolo è sovrano assoluto", "Nei limiti imposti dal Parlamento", "Nei limiti fissati dall'Unione Europea"],
                    "correctAnswer": "Nelle forme e nei limiti della Costituzione",
                    "explanation": "L'art. 1 recita: 'La sovranità appartiene al popolo, che la esercita nelle forme e nei limiti della Costituzione'."
                },
                {
                    "id": 203,
                    "question": "L'art. 9 tutela il paesaggio e il patrimonio storico e artistico della Nazione. A chi ne è affidata la promozione?",
                    "options": ["Alla Repubblica", "Al solo Ministero della Cultura", "Alle Regioni", "Ai Comuni"],
                    "correctAnswer": "Alla Repubblica",
                    "explanation": "L'art. 9 attribuisce alla Repubblica (intesa come ente complessivo) la promozione dello sviluppo della cultura e la ricerca scientifica, oltre alla tutela del patrimonio."
                },
                {
                    "id": 204,
                    "question": "Cosa stabilisce il principio personalista contenuto nell'art. 2 della Costituzione?",
                    "options": ["La Repubblica riconosce i diritti inviolabili dell'uomo sia come singolo sia nelle formazioni sociali", "Ogni persona deve svolgere un lavoro per contribuire alla società", "La personalità giuridica è riconosciuta solo ai cittadini maggiorenni", "I diritti individuali cedono sempre di fronte agli interessi collettivi"],
                    "correctAnswer": "La Repubblica riconosce i diritti inviolabili dell'uomo sia come singolo sia nelle formazioni sociali",
                    "explanation": "L'art. 2 sancisce il principio personalista: la persona umana è al centro dell'ordinamento e i suoi diritti fondamentali sono inviolabili."
                },
                {
                    "id": 205,
                    "question": "La Costituzione italiana è entrata in vigore il:",
                    "options": ["1° gennaio 1948", "2 giugno 1946", "22 dicembre 1947", "28 ottobre 1948"],
                    "correctAnswer": "1° gennaio 1948",
                    "explanation": "La Costituzione fu approvata dall'Assemblea Costituente il 22 dicembre 1947, promulgata il 27 dicembre e entrata in vigore il 1° gennaio 1948."
                },
                {
                    "id": 206,
                    "question": "Come si definisce una Costituzione che può essere modificata solo con procedimenti speciali aggravati, come quella italiana?",
                    "options": ["Rigida", "Flessibile", "Consuetudinaria", "Octroyée"],
                    "correctAnswer": "Rigida",
                    "explanation": "La Costituzione italiana è rigida: per modificarla occorre una legge costituzionale approvata due volte da entrambe le Camere (artt. 138-139)."
                }
            ],
            "Diritti e Doveri dei Cittadini": [
                {
                    "id": 207,
                    "question": "L'art. 21 tutela la libertà di manifestazione del pensiero. Quali limiti pone esplicitamente la Costituzione?",
                    "options": ["È vietato il buon costume; la stampa non può essere sottoposta ad autorizzazioni o censure", "È vietato criticare le istituzioni pubbliche", "Richiede l'autorizzazione preventiva del Garante delle Comunicazioni", "È limitata al solo ambito privato"],
                    "correctAnswer": "È vietato il buon costume; la stampa non può essere sottoposta ad autorizzazioni o censure",
                    "explanation": "L'art. 21 vieta le pubblicazioni contrarie al buon costume e garantisce la libertà di stampa senza censura preventiva."
                },
                {
                    "id": 208,
                    "question": "Quale articolo sancisce il diritto-dovere di voto dei cittadini italiani maggiorenni?",
                    "options": ["Articolo 48", "Articolo 49", "Articolo 51", "Articolo 56"],
                    "correctAnswer": "Articolo 48",
                    "explanation": "L'art. 48 afferma che sono elettori tutti i cittadini, uomini e donne, che hanno raggiunto la maggiore età. Il voto è personale, eguale, libero e segreto."
                },
                {
                    "id": 209,
                    "question": "L'art. 36 tutela il lavoro stabilendo che il lavoratore ha diritto a una retribuzione proporzionata e sufficiente. Cosa deve garantire questa retribuzione?",
                    "options": ["Un'esistenza libera e dignitosa per lui e la sua famiglia", "Solo il minimo vitale per il singolo lavoratore", "L'acquisto di un'abitazione di proprietà", "Una pensione anticipata dopo 20 anni di lavoro"],
                    "correctAnswer": "Un'esistenza libera e dignitosa per lui e la sua famiglia",
                    "explanation": "L'art. 36 introduce il concetto di 'giusta retribuzione': deve essere proporzionata alla quantità e qualità del lavoro, e sufficiente a garantire un'esistenza dignitosa."
                },
                {
                    "id": 210,
                    "question": "Quale articolo della Costituzione riconosce il diritto di sciopero?",
                    "options": ["Articolo 40", "Articolo 39", "Articolo 41", "Articolo 35"],
                    "correctAnswer": "Articolo 40",
                    "explanation": "L'art. 40 stabilisce che 'Il diritto di sciopero si esercita nell'ambito delle leggi che lo regolano'. La legge disciplina i servizi pubblici essenziali."
                },
                {
                    "id": 211,
                    "question": "Cosa prevede l'art. 27 della Costituzione riguardo alla pena di morte?",
                    "options": ["Non è ammessa la pena di morte", "È ammessa solo per i crimini di guerra", "È ammessa ma mai applicata", "Non viene menzionata"],
                    "correctAnswer": "Non è ammessa la pena di morte",
                    "explanation": "L'art. 27 stabilisce che le pene non possono consistere in trattamenti contrari al senso di umanità, e che non è ammessa la pena di morte."
                },
                {
                    "id": 212,
                    "question": "L'art. 53 stabilisce il principio della contribuzione alle spese pubbliche. Su quale base deve avvenire questa contribuzione?",
                    "options": ["In ragione della loro capacità contributiva, con sistema progressivo", "In misura uguale per tutti i cittadini (tassa fissa)", "Solo per chi possiede redditi superiori a una soglia fissa", "In base al numero di figli a carico"],
                    "correctAnswer": "In ragione della loro capacità contributiva, con sistema progressivo",
                    "explanation": "L'art. 53 sancisce il principio di progressività fiscale: chi guadagna di più deve contribuire proporzionalmente di più."
                }
            ],
            "Il Parlamento e la Legge": [
                {
                    "id": 213,
                    "question": "Per essere eletti alla Camera dei Deputati, qual è l'età minima richiesta ai candidati?",
                    "options": ["25 anni", "18 anni", "30 anni", "40 anni"],
                    "correctAnswer": "25 anni",
                    "explanation": "Per essere eletti alla Camera occorrono 25 anni; per il Senato 40 anni. L'elettorato passivo alla Camera è a 18 anni (art. 56), quello attivo al Senato a 25 anni (art. 58)."
                },
                {
                    "id": 214,
                    "question": "Ogni quanto anni si rinnovano le Camere del Parlamento italiano?",
                    "options": ["5 anni", "4 anni", "6 anni", "Ogni anno"],
                    "correctAnswer": "5 anni",
                    "explanation": "La Camera e il Senato durano in carica 5 anni (art. 60), salvo scioglimento anticipato da parte del Presidente della Repubblica."
                },
                {
                    "id": 215,
                    "question": "Cosa si intende per 'referendum abrogativo' (art. 75 Cost.)?",
                    "options": ["Un voto popolare per cancellare totalmente o parzialmente una legge già in vigore", "Una votazione parlamentare per approvare una nuova legge", "La raccolta di firme per presentare una proposta di legge", "Un voto per modificare la Costituzione"],
                    "correctAnswer": "Un voto popolare per cancellare totalmente o parzialmente una legge già in vigore",
                    "explanation": "Il referendum abrogativo è richiesto da 500.000 elettori o 5 consigli regionali e permette di eliminare norme già vigenti; non può riguardare leggi tributarie, di bilancio, di amnistia o di autorizzazione a ratificare trattati."
                },
                {
                    "id": 216,
                    "question": "Come si chiama l'atto con cui il Presidente della Repubblica può rimandare una legge alle Camere, chiedendo una nuova deliberazione?",
                    "options": ["Rinvio presidenziale (o promulgazione con riserva)", "Veto assoluto", "Abrogazione", "Promulgazione condizionata"],
                    "correctAnswer": "Rinvio presidenziale (o promulgazione con riserva)",
                    "explanation": "Il Presidente può, con messaggio motivato, rinviare la legge al Parlamento (art. 74). Se le Camere la approvano di nuovo, è obbligato a promulgarla."
                },
                {
                    "id": 217,
                    "question": "I Decreti Legge (D.L.) possono essere emanati dal Governo solo in presenza di:",
                    "options": ["Casi straordinari di necessità e urgenza", "Un mandato ricevuto dal Parlamento con legge delega", "Una crisi economica ufficialmente dichiarata", "Una richiesta formale di almeno 3 Regioni"],
                    "correctAnswer": "Casi straordinari di necessità e urgenza",
                    "explanation": "L'art. 77 permette al Governo di emanare D.L. provvisori con forza di legge solo in casi di necessità e urgenza, ma devono essere convertiti in legge dal Parlamento entro 60 giorni."
                }
            ],
            "Le Fonti del Diritto": [
                {
                    "id": 218,
                    "question": "Quale tipo di fonte dell'UE è direttamente applicabile in tutti gli Stati membri senza necessità di recepimento nazionale?",
                    "options": ["Il Regolamento europeo", "La Direttiva europea", "La Decisione della Commissione", "La Raccomandazione"],
                    "correctAnswer": "Il Regolamento europeo",
                    "explanation": "Il Regolamento UE ha portata generale, è obbligatorio in tutti i suoi elementi ed è direttamente applicabile in ciascuno Stato membro (art. 288 TFUE)."
                },
                {
                    "id": 219,
                    "question": "Le leggi regionali si collocano nella gerarchia delle fonti del diritto italiano allo stesso livello di:",
                    "options": ["Le leggi ordinarie dello Stato", "La Costituzione", "I regolamenti governativi", "I decreti ministeriali"],
                    "correctAnswer": "Le leggi ordinarie dello Stato",
                    "explanation": "Le leggi regionali hanno la stessa forza formale delle leggi statali, ma si distinguono per il criterio di competenza materiale stabilito dall'art. 117 della Costituzione."
                },
                {
                    "id": 220,
                    "question": "Cosa si intende per 'abrogazione tacita' di una norma giuridica?",
                    "options": ["Avviene quando una legge successiva disciplina l'intera materia già regolata dalla precedente, anche senza dichiarare esplicitamente l'abrogazione", "Avviene quando una legge è dichiarata incostituzionale dalla Corte", "Avviene quando il Parlamento vota esplicitamente per eliminare una norma", "È l'automatica decadenza di una norma dopo 10 anni dalla promulgazione"],
                    "correctAnswer": "Avviene quando una legge successiva disciplina l'intera materia già regolata dalla precedente, anche senza dichiarare esplicitamente l'abrogazione",
                    "explanation": "L'abrogazione può essere espressa (dichiarata), tacita (per incompatibilità) o implicita (quando la nuova legge disciplina l'intera materia)."
                }
            ]
        },
        "Gli Organi dello Stato": {
            "Il Presidente della Repubblica": [
                {
                    "id": 221,
                    "question": "Quanti anni dura il mandato del Presidente della Repubblica italiana?",
                    "options": ["7 anni", "5 anni", "6 anni", "9 anni"],
                    "correctAnswer": "7 anni",
                    "explanation": "L'art. 85 stabilisce che il Presidente della Repubblica è eletto per sette anni. Questa durata è volutamente superiore a quella delle Camere (5 anni) per garantire autonomia politica."
                },
                {
                    "id": 222,
                    "question": "Il Presidente della Repubblica può sciogliere le Camere in qualsiasi momento?",
                    "options": ["No, non può farlo negli ultimi sei mesi del suo mandato (salvo coincidenza con scadenza naturale)", "Sì, in qualsiasi momento e senza condizioni", "Sì, ma solo con il voto del Consiglio dei Ministri", "No, non può mai sciogliere le Camere anticipatamente"],
                    "correctAnswer": "No, non può farlo negli ultimi sei mesi del suo mandato (salvo coincidenza con scadenza naturale)",
                    "explanation": "L'art. 88 vieta lo scioglimento delle Camere negli ultimi sei mesi del settennato presidenziale (il cosiddetto 'semestre bianco'), per evitare interferenze politiche."
                }
            ],
            "Il Governo": [
                {
                    "id": 223,
                    "question": "Come si chiama la procedura attraverso cui le Camere possono togliere la fiducia al Governo?",
                    "options": ["Mozione di sfiducia", "Interpellanza", "Interrogazione parlamentare", "Disegno di legge di sfiducia"],
                    "correctAnswer": "Mozione di sfiducia",
                    "explanation": "La mozione di sfiducia deve essere firmata da almeno un decimo dei componenti della Camera, è discussa dopo tre giorni dalla sua presentazione e approvata per appello nominale a maggioranza assoluta (art. 94)."
                },
                {
                    "id": 224,
                    "question": "Cosa si intende per 'questione di fiducia' posta dal Governo sul voto di un disegno di legge?",
                    "options": ["Il Governo lega la sua sopravvivenza all'approvazione di quel provvedimento, costringendo il Parlamento a votare compattamente", "Il Governo chiede al Parlamento di rinviare il voto a data successiva", "Il Governo richiede un'analisi giuridica preventiva da parte della Corte Costituzionale", "Il Governo dichiara lo stato di emergenza nazionale"],
                    "correctAnswer": "Il Governo lega la sua sopravvivenza all'approvazione di quel provvedimento, costringendo il Parlamento a votare compattamente",
                    "explanation": "Ponendo la fiducia, il Governo fa sì che la bocciatura del disegno di legge equivalga a una mozione di sfiducia, portando alle dimissioni del Governo stesso."
                },
                {
                    "id": 225,
                    "question": "Quale organo del Governo coordina l'attività dei Ministri e mantiene l'unità di indirizzo politico?",
                    "options": ["Il Presidente del Consiglio dei Ministri", "Il Vicepresidente del Consiglio", "Il Consiglio dei Ministri collegialmente", "Il Ministro dell'Economia"],
                    "correctAnswer": "Il Presidente del Consiglio dei Ministri",
                    "explanation": "L'art. 95 stabilisce che il Presidente del Consiglio dirige la politica generale del Governo, ne è responsabile e mantiene l'unità di indirizzo politico e amministrativo."
                }
            ],
            "La Magistratura e la Corte Costituzionale": [
                {
                    "id": 226,
                    "question": "Cosa significa il principio 'nulla poena sine lege' garantito dall'art. 25 della Costituzione?",
                    "options": ["Nessuno può essere punito se non in forza di una legge che sia già in vigore prima del fatto commesso", "Le pene devono essere proporzionali al reato commesso", "Il giudice può punire qualsiasi comportamento che ritenga moralmente sbagliato", "La pena detentiva è l'unica forma di sanzione ammessa"],
                    "correctAnswer": "Nessuno può essere punito se non in forza di una legge che sia già in vigore prima del fatto commesso",
                    "explanation": "Il principio di legalità penale vieta la retroattività della legge penale sfavorevole (nessuno può essere punito per un fatto che non era reato quando è stato commesso)."
                },
                {
                    "id": 227,
                    "question": "Quale è la durata del mandato dei giudici della Corte Costituzionale?",
                    "options": ["9 anni non rinnovabili", "7 anni rinnovabili una volta", "5 anni non rinnovabili", "12 anni non rinnovabili"],
                    "correctAnswer": "9 anni non rinnovabili",
                    "explanation": "I giudici della Corte Costituzionale durano in carica 9 anni e il mandato non è prorogabile, per garantirne l'indipendenza."
                }
            ],
            "Le Autonomie Locali": [
                {
                    "id": 228,
                    "question": "Quante sono le Regioni a Statuto Speciale in Italia e quali sono?",
                    "options": ["5: Sicilia, Sardegna, Valle d'Aosta, Trentino-Alto Adige e Friuli-Venezia Giulia", "4: Sicilia, Sardegna, Valle d'Aosta e Trentino", "6: più la regione del Molise", "3: Sicilia, Sardegna e Valle d'Aosta"],
                    "correctAnswer": "5: Sicilia, Sardegna, Valle d'Aosta, Trentino-Alto Adige e Friuli-Venezia Giulia",
                    "explanation": "Le 5 regioni a statuto speciale godono di maggiore autonomia rispetto alle 15 regioni ordinarie, per ragioni storiche, geografiche o di minoranze linguistiche."
                },
                {
                    "id": 229,
                    "question": "Cos'è lo Statuto comunale?",
                    "options": ["L'atto normativo fondamentale del Comune che ne regola l'organizzazione e il funzionamento", "Il documento di fondazione storica del Comune", "Il bilancio annuale approvato dal Consiglio comunale", "Il regolamento edilizio del territorio comunale"],
                    "correctAnswer": "L'atto normativo fondamentale del Comune che ne regola l'organizzazione e il funzionamento",
                    "explanation": "Lo Statuto comunale è la 'costituzione' del Comune: stabilisce i principi fondamentali dell'organizzazione, le forme di partecipazione dei cittadini e i rapporti con gli altri enti."
                },
                {
                    "id": 230,
                    "question": "Chi è il Sindaco e come viene eletto?",
                    "options": ["È il capo dell'amministrazione comunale, eletto direttamente dai cittadini del Comune", "È un funzionario statale nominato dal Prefetto", "È eletto dal Consiglio Comunale tra i propri componenti", "È nominato dal Presidente della Regione"],
                    "correctAnswer": "È il capo dell'amministrazione comunale, eletto direttamente dai cittadini del Comune",
                    "explanation": "Dal 1993 il Sindaco viene eletto direttamente dai cittadini con voto popolare, conferendogli una legittimazione democratica diretta."
                }
            ]
        },
        "Diritto Internazionale ed Europeo": {
            "L'Unione Europea": [
                {
                    "id": 231,
                    "question": "Quale trattato, in vigore dal 2009, ha riformato l'assetto istituzionale dell'UE, istituendo tra l'altro il presidente stabile del Consiglio Europeo?",
                    "options": ["Il Trattato di Lisbona", "Il Trattato di Nizza", "Il Trattato di Amsterdam", "Il Trattato di Roma"],
                    "correctAnswer": "Il Trattato di Lisbona",
                    "explanation": "Il Trattato di Lisbona (2007, in vigore 2009) ha rinominato i trattati fondanti, creato il presidente fisso del Consiglio Europeo e introdotto la figura dell'Alto Rappresentante per la politica estera."
                },
                {
                    "id": 232,
                    "question": "Cos'è la Banca Centrale Europea (BCE) e qual è il suo compito principale?",
                    "options": ["È l'istituzione monetaria dell'UE che gestisce la politica monetaria della zona euro e mira alla stabilità dei prezzi", "È la banca che finanzia i prestiti agli Stati membri in difficoltà tramite aiuti a fondo perduto", "È un organo del Parlamento Europeo che controlla i bilanci degli Stati", "È un'istituzione privata indipendente che gestisce gli investimenti europei"],
                    "correctAnswer": "È l'istituzione monetaria dell'UE che gestisce la politica monetaria della zona euro e mira alla stabilità dei prezzi",
                    "explanation": "La BCE, con sede a Francoforte, è indipendente dai governi e ha come obiettivo primario mantenere l'inflazione vicino al 2% nella zona euro."
                },
                {
                    "id": 233,
                    "question": "Quanti sono gli Stati membri dell'Unione Europea dopo la Brexit (uscita del Regno Unito)?",
                    "options": ["27", "28", "26", "30"],
                    "correctAnswer": "27",
                    "explanation": "Con l'uscita del Regno Unito (Brexit, effettiva dal 1° febbraio 2020), l'UE è composta da 27 Stati membri."
                }
            ],
            "Organizzazioni Internazionali": [
                {
                    "id": 234,
                    "question": "Quale agenzia specializzata dell'ONU si occupa di salute pubblica globale e ha coordinato la risposta alla pandemia di COVID-19?",
                    "options": ["L'OMS (Organizzazione Mondiale della Sanità / WHO)", "L'UNICEF", "L'UNESCO", "L'FAO"],
                    "correctAnswer": "L'OMS (Organizzazione Mondiale della Sanità / WHO)",
                    "explanation": "L'OMS/WHO è l'agenzia dell'ONU che dirige e coordina la salute internazionale, pubblica linee guida e monitora le malattie a livello globale."
                },
                {
                    "id": 235,
                    "question": "La Corte Penale Internazionale (CPI), con sede all'Aia, ha il potere di giudicare individui per:",
                    "options": ["Genocidio, crimini contro l'umanità, crimini di guerra e crimine di aggressione", "Solo reati economici e di corruzione internazionale", "Qualsiasi reato commesso in territorio straniero", "Violazioni dei diritti d'autore a livello internazionale"],
                    "correctAnswer": "Genocidio, crimini contro l'umanità, crimini di guerra e crimine di aggressione",
                    "explanation": "La CPI, istituita dallo Statuto di Roma nel 1998, giudica individui (non Stati) per i crimini più gravi che toccano la comunità internazionale."
                }
            ]
        }
    },
    "Geografia": {
        "L'Italia": {
            "Territorio e Clima": [
                {
                    "id": 301,
                    "question": "Qual è la cima più alta delle Alpi italiane e dell'intera catena alpina?",
                    "options": ["Monte Bianco (4.808 m)", "Monte Rosa (4.634 m)", "Gran Paradiso (4.061 m)", "Monte Cervino (4.478 m)"],
                    "correctAnswer": "Monte Bianco (4.808 m)",
                    "explanation": "Il Monte Bianco, al confine tra Italia e Francia, è la vetta più alta delle Alpi e dell'Europa occidentale."
                },
                {
                    "id": 302,
                    "question": "Quale pianura alluvionale è la più grande d'Italia e una delle più fertili d'Europa?",
                    "options": ["La Pianura Padana", "La Piana di Sibari", "La Pianura Campana", "Il Tavoliere delle Puglie"],
                    "correctAnswer": "La Pianura Padana",
                    "explanation": "La Pianura Padana, estesa per circa 46.000 km², è il maggiore distretto industriale e agricolo d'Italia."
                },
                {
                    "id": 303,
                    "question": "Il vulcano Etna, il più alto e attivo d'Europa, si trova in:",
                    "options": ["Sicilia", "Campania", "Calabria", "Sardegna"],
                    "correctAnswer": "Sicilia",
                    "explanation": "L'Etna si trova in Sicilia, nella città metropolitana di Catania, e con i suoi oltre 3.300 m è il vulcano attivo più alto d'Europa."
                },
                {
                    "id": 304,
                    "question": "Quale clima caratterizza prevalentemente le coste del Sud Italia e le isole maggiori?",
                    "options": ["Clima mediterraneo (estati calde e secche, inverni miti e piovosi)", "Clima continentale (freddo rigido d'inverno, caldo umido d'estate)", "Clima alpino (freddo con abbondanti nevicate)", "Clima oceanico (piovoso e mite tutto l'anno)"],
                    "correctAnswer": "Clima mediterraneo (estati calde e secche, inverni miti e piovosi)",
                    "explanation": "Il clima mediterraneo tipico del Sud e delle isole è caratterizzato da estate calda e secca e inverno mite con precipitazioni concentrate nel periodo freddo."
                },
                {
                    "id": 305,
                    "question": "Qual è il lago più grande d'Italia per superficie?",
                    "options": ["Il Lago di Garda", "Il Lago Maggiore", "Il Lago di Como", "Il Lago Trasimeno"],
                    "correctAnswer": "Il Lago di Garda",
                    "explanation": "Il Lago di Garda (368 km²) è il più grande lago italiano per superficie, condiviso tra Veneto, Lombardia e Trentino."
                }
            ],
            "Demografia ed Economia": [
                {
                    "id": 306,
                    "question": "Come si chiama il fenomeno storico dello spostamento di lavoratori dal Sud verso il Nord Italia e l'estero, avvenuto principalmente negli anni '50 e '60?",
                    "options": ["Migrazione interna (o esodo meridionale)", "Urbanesimo settentrionale", "La diaspora italiana", "Il boom demografico"],
                    "correctAnswer": "Migrazione interna (o esodo meridionale)",
                    "explanation": "Il miracolo economico italiano degli anni '50-'60 attirò milioni di lavoratori dal Sud e dal Nordest verso le fabbriche del triangolo industriale (Milano, Torino, Genova)."
                },
                {
                    "id": 307,
                    "question": "Cosa si intende per 'triangolo industriale' italiano?",
                    "options": ["L'area tra Milano, Torino e Genova, cuore dell'industria manifatturiera italiana nel dopoguerra", "La zona tra Roma, Napoli e Bari, nota per l'industria alimentare", "L'area tra Venezia, Trieste e Bologna, nota per l'export", "La regione tra Firenze, Bologna e Prato, capitale del fashion"],
                    "correctAnswer": "L'area tra Milano, Torino e Genova, cuore dell'industria manifatturiera italiana nel dopoguerra",
                    "explanation": "Il triangolo industriale è storicamente il polo manifatturiero dell'Italia, con l'industria automobilistica (FIAT a Torino), siderurgica e chimica."
                },
                {
                    "id": 308,
                    "question": "Qual è la regione italiana con il maggior numero di abitanti?",
                    "options": ["Lombardia", "Lazio", "Campania", "Sicilia"],
                    "correctAnswer": "Lombardia",
                    "explanation": "La Lombardia è la regione più popolosa d'Italia con circa 10 milioni di abitanti, seguita da Lazio e Campania."
                }
            ]
        },
        "Le Regioni d'Italia": {
            "Il Nord Italia": [
                {
                    "id": 309,
                    "question": "Qual è il capoluogo del Piemonte, prima capitale del Regno d'Italia?",
                    "options": ["Torino", "Cuneo", "Asti", "Novara"],
                    "correctAnswer": "Torino",
                    "explanation": "Torino è stata la prima capitale del Regno d'Italia (1861-1864) ed è oggi il principale centro industriale del Piemonte."
                },
                {
                    "id": 310,
                    "question": "Il Trentino-Alto Adige è una regione a statuto speciale. Quali sono le due Province autonome che la compongono?",
                    "options": ["Trento e Bolzano", "Trento e Trieste", "Bolzano e Udine", "Verona e Trento"],
                    "correctAnswer": "Trento e Bolzano",
                    "explanation": "Il Trentino-Alto Adige è suddiviso nelle Province Autonome di Trento e Bolzano (South Tyrol), quest'ultima a prevalenza di lingua tedesca."
                },
                {
                    "id": 311,
                    "question": "Qual è il capoluogo del Friuli-Venezia Giulia, importante porto adriatico?",
                    "options": ["Trieste", "Udine", "Gorizia", "Pordenone"],
                    "correctAnswer": "Trieste",
                    "explanation": "Trieste è il capoluogo del Friuli-Venezia Giulia e ospita uno dei porti più importanti del Mediterraneo orientale."
                },
                {
                    "id": 312,
                    "question": "La Valle d'Aosta è la regione italiana più piccola per superficie e la meno popolosa. Quale lingua, oltre all'italiano, è ufficiale?",
                    "options": ["Il francese", "Il tedesco", "Il ladino", "Il provenzale"],
                    "correctAnswer": "Il francese",
                    "explanation": "In Valle d'Aosta il francese è lingua ufficiale insieme all'italiano, retaggio storico dell'appartenenza alla Casa Savoia e della vicinanza alla Francia."
                }
            ],
            "Il Centro Italia": [
                {
                    "id": 313,
                    "question": "Perugia è il capoluogo di quale regione dell'Italia Centrale, priva di sbocchi sul mare?",
                    "options": ["Umbria", "Marche", "Abruzzo", "Toscana"],
                    "correctAnswer": "Umbria",
                    "explanation": "Perugia è il capoluogo dell'Umbria, l'unica regione peninsulare senza accesso al mare, conosciuta per le sue colline, i borghi medievali e il tartufo nero."
                },
                {
                    "id": 314,
                    "question": "Ancona è il capoluogo di quale regione italiana?",
                    "options": ["Marche", "Abruzzo", "Umbria", "Lazio"],
                    "correctAnswer": "Marche",
                    "explanation": "Le Marche è una regione centro-adriatica con capoluogo Ancona, porto importante sull'Adriatico."
                },
                {
                    "id": 315,
                    "question": "Quale piccolo Stato sovrano è completamente circondato dal territorio italiano?",
                    "options": ["La Repubblica di San Marino", "Il Principato di Monaco", "Il Vaticano", "Andorra"],
                    "correctAnswer": "La Repubblica di San Marino",
                    "explanation": "San Marino, con 61 km², è il più piccolo Stato sovrano del mondo circondato interamente dall'Italia, situato nell'Appennino romagnolo."
                }
            ],
            "Il Sud Italia e le Isole": [
                {
                    "id": 316,
                    "question": "Qual è il capoluogo della Calabria, la regione che forma il 'puntale' dello stivale?",
                    "options": ["Catanzaro", "Reggio Calabria", "Cosenza", "Crotone"],
                    "correctAnswer": "Catanzaro",
                    "explanation": "Catanzaro è il capoluogo della Calabria, situato sull'istmo tra il Mar Tirreno e il Mar Ionio."
                },
                {
                    "id": 317,
                    "question": "Potenza è il capoluogo di quale regione, la meno densamente popolata d'Italia?",
                    "options": ["Basilicata", "Molise", "Calabria", "Abruzzo"],
                    "correctAnswer": "Basilicata",
                    "explanation": "La Basilicata è la regione meno densamente popolata d'Italia; è nota per Matera, città rupestre patrimonio UNESCO."
                },
                {
                    "id": 318,
                    "question": "Qual è il capoluogo della Sardegna e la sua principale città portuale?",
                    "options": ["Cagliari", "Sassari", "Nuoro", "Oristano"],
                    "correctAnswer": "Cagliari",
                    "explanation": "Cagliari è il capoluogo della Regione Autonoma della Sardegna, con un porto naturale che la rende polo marittimo fondamentale del Mediterraneo."
                },
                {
                    "id": 319,
                    "question": "Campobasso è il capoluogo di quale piccola regione del Sud Italia?",
                    "options": ["Molise", "Basilicata", "Abruzzo", "Puglia"],
                    "correctAnswer": "Molise",
                    "explanation": "Il Molise è la seconda regione più piccola d'Italia (dopo la Valle d'Aosta). È spesso indicata come 'la regione che non esiste', a causa della sua scarsa visibilità mediatica."
                },
                {
                    "id": 320,
                    "question": "L'Aquila è il capoluogo di quale regione, nota per i parchi naturali e il massiccio del Gran Sasso?",
                    "options": ["Abruzzo", "Molise", "Lazio", "Marche"],
                    "correctAnswer": "Abruzzo",
                    "explanation": "L'Abruzzo, con capoluogo L'Aquila, ospita il Gran Sasso d'Italia (2.912 m), la cima più alta dell'Appennino, e il Parco Nazionale d'Abruzzo."
                }
            ]
        },
        "L'Europa e i suoi Stati": {
            "Il Continente Europeo": [
                {
                    "id": 321,
                    "question": "Quale catena montuosa separa la Francia dalla Spagna?",
                    "options": ["I Pirenei", "Le Alpi", "I Vosgi", "Il Massiccio Centrale"],
                    "correctAnswer": "I Pirenei",
                    "explanation": "I Pirenei si estendono per circa 430 km dal Golfo di Biscaglia al Mar Mediterraneo, formando un confine naturale quasi invalicabile tra Francia e Spagna."
                },
                {
                    "id": 322,
                    "question": "In quale Paese europeo si trova la capitale Amsterdam, famosa per i suoi canali e i suoi musei?",
                    "options": ["Paesi Bassi", "Belgio", "Danimarca", "Svezia"],
                    "correctAnswer": "Paesi Bassi",
                    "explanation": "Amsterdam è la capitale dei Paesi Bassi (Olanda), sebbene l'Aia sia la sede del governo e del Parlamento."
                },
                {
                    "id": 323,
                    "question": "Quale stato dell'Europa del Nord è famoso per i fiordi e ha Oslo come capitale?",
                    "options": ["Norvegia", "Svezia", "Finlandia", "Islanda"],
                    "correctAnswer": "Norvegia",
                    "explanation": "La Norvegia è famosa per i suoi fiordi (insenature profonde create dai ghiacciai) e l'aurora boreale. Non fa parte dell'UE ma appartiene all'area Schengen."
                },
                {
                    "id": 324,
                    "question": "Qual è la capitale della Grecia, culla della democrazia occidentale?",
                    "options": ["Atene", "Salonicco", "Creta", "Rodi"],
                    "correctAnswer": "Atene",
                    "explanation": "Atene è la capitale e la città più grande della Grecia, sede dell'Acropoli e del Partenone. È considerata la culla della democrazia e della filosofia occidentale."
                },
                {
                    "id": 325,
                    "question": "Quale piccolo Stato, privo di sbocco sul mare, si trova tra Italia e San Marino ed è famoso per le sue banche e il Principato?",
                    "options": ["Monaco", "Liechtenstein", "Andorra", "Lussemburgo"],
                    "correctAnswer": "Monaco",
                    "explanation": "Il Principato di Monaco (2 km²) è il secondo Stato più piccolo al mondo, dopo il Vaticano, affacciato sul Mar Mediterraneo e circondato dalla Francia."
                }
            ],
            "Aree Geopolitiche e Stati": [
                {
                    "id": 326,
                    "question": "Quale Paese è la 'cerniera' geografica tra Europa Occidentale e quella Orientale, con Varsavia come capitale?",
                    "options": ["Polonia", "Repubblica Ceca", "Austria", "Ungheria"],
                    "correctAnswer": "Polonia",
                    "explanation": "La Polonia è uno dei Paesi più estesi dell'UE (9° per superficie) e rappresenta il ponte geografico tra il centro-ovest e l'est europeo."
                },
                {
                    "id": 327,
                    "question": "Vienna è la capitale di quale Paese dell'Europa Centrale, ex cuore dell'Impero Austro-Ungarico?",
                    "options": ["Austria", "Ungheria", "Repubblica Ceca", "Svizzera"],
                    "correctAnswer": "Austria",
                    "explanation": "Vienna, capitale dell'Austria, è stata per secoli uno dei centri culturali e politici più importanti d'Europa come capitale dell'Impero Asburgico."
                },
                {
                    "id": 328,
                    "question": "Quale Paese europeo è l'unico a non far parte dell'UE ma è considerato il cuore geografico dell'Europa, con Berna come capitale?",
                    "options": ["Svizzera", "Norvegia", "Liechtenstein", "Islanda"],
                    "correctAnswer": "Svizzera",
                    "explanation": "La Svizzera è una confederazione di 26 cantoni con quattro lingue nazionali (tedesco, francese, italiano, romancio) e mantiene la neutralità storica non aderendo all'UE."
                },
                {
                    "id": 329,
                    "question": "Quale Paese della Penisola Scandinava ha Stoccolma come capitale?",
                    "options": ["Svezia", "Norvegia", "Danimarca", "Finlandia"],
                    "correctAnswer": "Svezia",
                    "explanation": "La Svezia è uno dei Paesi più grandi d'Europa, membro dell'UE ma non della zona euro, famosa per il design, l'innovazione e il welfare state."
                }
            ]
        },
        "Il Territorio Italiano": {
            "I Confini e i Mari": [
                {
                    "id": 330,
                    "question": "Con quale Paese condivide l'Italia il confine più lungo?",
                    "options": ["Francia", "Svizzera", "Austria", "Slovenia"],
                    "correctAnswer": "Francia",
                    "explanation": "Il confine italo-francese si estende per circa 488 km lungo l'arco alpino occidentale, dalla Liguria alla Valle d'Aosta."
                },
                {
                    "id": 331,
                    "question": "Quale stretto di mare separa la Sicilia dalla penisola italiana (Calabria)?",
                    "options": ["Lo Stretto di Messina", "Lo Stretto di Sicilia", "Il Canale di Sardegna", "Lo Stretto di Otranto"],
                    "correctAnswer": "Lo Stretto di Messina",
                    "explanation": "Lo Stretto di Messina, largo in alcuni punti meno di 3 km, separa la Sicilia dalla Calabria ed è percorso quotidianamente da traghetti."
                },
                {
                    "id": 332,
                    "question": "Quale mare si trova tra la Sardegna e la costa spagnola/francese?",
                    "options": ["Il Mar di Sardegna (o Mare delle Baleari)", "Il Mar Ligure", "Il Mar Tirreno", "Il Mare Adriatico"],
                    "correctAnswer": "Il Mar di Sardegna (o Mare delle Baleari)",
                    "explanation": "Il Mar di Sardegna è la parte del Mediterraneo occidentale che bagna le coste occidentali della Sardegna, separandola dalle isole Baleari e dalla penisola iberica."
                }
            ],
            "Monti e Fiumi d'Italia": [
                {
                    "id": 333,
                    "question": "Qual è la cima più alta dell'Appennino italiano?",
                    "options": ["Il Gran Sasso d'Italia (2.912 m)", "Il Monte Pollino (2.248 m)", "Il Monte Vettore (2.476 m)", "La Majella (2.795 m)"],
                    "correctAnswer": "Il Gran Sasso d'Italia (2.912 m)",
                    "explanation": "Il Gran Sasso d'Italia, in Abruzzo, è il massiccio più alto dell'Appennino. Il Corno Grande (2.912 m) è la sua vetta più alta e ospita il ghiacciaio del Calderone, il più meridionale d'Europa."
                },
                {
                    "id": 334,
                    "question": "In quale regione nasce il fiume Tevere, che attraversa Roma?",
                    "options": ["Toscana", "Umbria", "Lazio", "Marche"],
                    "correctAnswer": "Toscana",
                    "explanation": "Il Tevere nasce dal Monte Fumaiolo in Toscana (Appennino Tosco-Romagnolo), attraversa l'Umbria e poi il Lazio, sfociando nel Mar Tirreno a Ostia."
                },
                {
                    "id": 335,
                    "question": "Quale fiume italiano segna per buona parte il confine tra Veneto ed Emilia-Romagna?",
                    "options": ["Il Po", "L'Adige", "Il Reno", "Il Tagliamento"],
                    "correctAnswer": "Il Po",
                    "explanation": "Il Po, lungo 682 km (il più lungo d'Italia), scorre tra Piemonte, Lombardia, Emilia-Romagna e Veneto prima di sfociare nell'Adriatico con un ampio delta."
                }
            ]
        }
    },
    "Italiano": {
        "Morfologia": {
            "Articolo e Nome": [
                {
                    "id": 401,
                    "question": "Quale articolo indeterminativo si usa davanti a parole maschili che iniziano per vocale o per 's' impura?",
                    "options": ["Uno", "Un", "Il", "Lo"],
                    "correctAnswer": "Uno",
                    "explanation": "'Uno' si usa davanti a parole maschili che iniziano per vocale (uno zaino, uno specchio) o per s+consonante, ps, pn, z, x, gn (uno studente, uno psicologo)."
                },
                {
                    "id": 402,
                    "question": "Come si chiamano i nomi che indicano concetti astratti, qualità o stati d'animo (es. 'amore', 'bellezza', 'libertà')?",
                    "options": ["Nomi astratti", "Nomi concreti", "Nomi collettivi", "Nomi propri"],
                    "correctAnswer": "Nomi astratti",
                    "explanation": "I nomi astratti non indicano cose percepibili con i sensi, ma concetti, stati d'animo, qualità e azioni (amore, paura, bontà, corsa)."
                },
                {
                    "id": 403,
                    "question": "Come si chiama il procedimento per cui unendo due o più parole se ne crea una nuova (es. 'capostazione', 'arcobaleno')?",
                    "options": ["Composizione", "Derivazione", "Alterazione", "Conversione"],
                    "correctAnswer": "Composizione",
                    "explanation": "La composizione è un procedimento di formazione delle parole che unisce due o più basi lessicali autonome per formare un nuovo vocabolo."
                }
            ],
            "Aggettivo e Pronome": [
                {
                    "id": 404,
                    "question": "Quali sono i gradi dell'aggettivo qualificativo?",
                    "options": ["Positivo, comparativo e superlativo", "Assoluto, relativo e indefinito", "Semplice, composto e derivato", "Maschile, femminile e neutro"],
                    "correctAnswer": "Positivo, comparativo e superlativo",
                    "explanation": "Il grado positivo esprime la qualità semplicemente (bello); il comparativo la confronta (più bello di); il superlativo la esprime al massimo grado (bellissimo / il più bello)."
                },
                {
                    "id": 405,
                    "question": "Nella frase 'Prendi QUESTO libro!', la parola 'questo' è:",
                    "options": ["Aggettivo dimostrativo", "Pronome dimostrativo", "Aggettivo possessivo", "Articolo determinativo"],
                    "correctAnswer": "Aggettivo dimostrativo",
                    "explanation": "'Questo' è un aggettivo dimostrativo perché accompagna il nome 'libro' indicando la sua vicinanza nello spazio o nel tempo rispetto a chi parla."
                },
                {
                    "id": 406,
                    "question": "I pronomi relativi 'che', 'cui', 'il quale' hanno la funzione di:",
                    "options": ["Collegare una proposizione relativa alla proposizione principale, sostituendo un nome già nominato", "Esprimere una domanda su persone o cose", "Indicare il possesso di qualcosa da parte di qualcuno", "Sostituire il soggetto grammaticale della frase principale"],
                    "correctAnswer": "Collegare una proposizione relativa alla proposizione principale, sostituendo un nome già nominato",
                    "explanation": "I pronomi relativi (che=sogg./comp.ogg.; cui=dopo preposizione; il quale=alternativa formale) introducono proposizioni subordinate relative collegandole all'antecedente."
                },
                {
                    "id": 407,
                    "question": "Cosa indica il pronome personale di 1ª persona plurale 'noi'?",
                    "options": ["Il parlante più uno o più interlocutori/terzi", "Solo il parlante in forma di cortesia", "Il solo interlocutore", "Una persona indeterminata"],
                    "correctAnswer": "Il parlante più uno o più interlocutori/terzi",
                    "explanation": "'Noi' si riferisce all'insieme formato dal parlante (io) e da almeno un'altra persona, che può essere l'interlocutore (tu) o una terza persona."
                }
            ],
            "Verbo": [
                {
                    "id": 408,
                    "question": "Cosa indica il modo 'Congiuntivo' del verbo?",
                    "options": ["Azioni incerte, dubbiose, desiderate o soggettive, spesso in proposizioni subordinate", "Azioni certe e reali al momento del discorso", "Ordini e comandi diretti", "Azioni che si compiono abitualmente"],
                    "correctAnswer": "Azioni incerte, dubbiose, desiderate o soggettive, spesso in proposizioni subordinate",
                    "explanation": "Il congiuntivo è il modo della soggettività e dell'incertezza (penso che venga; vorrei che studiasse) e si usa tipicamente in proposizioni subordinate."
                },
                {
                    "id": 409,
                    "question": "Qual è la differenza tra l'imperfetto indicativo e il passato remoto?",
                    "options": ["L'imperfetto descrive azioni continuate o abituali nel passato; il passato remoto indica azioni concluse e lontane nel tempo", "L'imperfetto indica azioni già concluse; il passato remoto indica azioni che continuano nel presente", "Non c'è differenza sostanziale di uso tra i due", "Il passato remoto si usa solo nel parlato; l'imperfetto solo nello scritto"],
                    "correctAnswer": "L'imperfetto descrive azioni continuate o abituali nel passato; il passato remoto indica azioni concluse e lontane nel tempo",
                    "explanation": "Es: 'Da bambino giocavo sempre (impf., azione abituale) nel parco dove un giorno incontrai (p.rem., azione puntuale) il mio migliore amico'."
                },
                {
                    "id": 410,
                    "question": "Come si chiama il modo verbale che non ha una propria desinenza personale e indica l'azione in modo astratto? (Es. 'mangiare', 'correre')",
                    "options": ["L'Infinito", "Il Congiuntivo", "Il Gerundio", "Il Participio"],
                    "correctAnswer": "L'Infinito",
                    "explanation": "L'infinito è il modo indefinito del verbo che ne esprime il significato senza indicare persona, numero o modo; è la forma base riportata nei vocabolari."
                },
                {
                    "id": 411,
                    "question": "I verbi 'potere', 'volere', 'dovere', 'sapere' sono detti verbi:",
                    "options": ["Servili (o modali)", "Ausiliari", "Transitivi", "Impersonali"],
                    "correctAnswer": "Servili (o modali)",
                    "explanation": "I verbi servili si 'servono' di un altro verbo all'infinito per completare il loro significato (posso andare, devo studiare). Prendono l'ausiliare del verbo che accompagnano."
                }
            ]
        },
        "Sintassi e Invariabili": {
            "Parti Invariabili": [
                {
                    "id": 412,
                    "question": "Nella frase 'Studio AFFINCHÉ tu possa imparare', la parola 'affinché' è:",
                    "options": ["Congiunzione subordinante finale", "Avverbio di scopo", "Preposizione impropria", "Congiunzione coordinante"],
                    "correctAnswer": "Congiunzione subordinante finale",
                    "explanation": "'Affinché' (= perché, per il fatto che) introduce una proposizione finale subordinata che esprime lo scopo dell'azione principale."
                },
                {
                    "id": 413,
                    "question": "Cosa sono le preposizioni 'articolate' (es. 'del', 'alla', 'nello', 'sulla')?",
                    "options": ["Preposizioni semplici fuse con l'articolo determinativo", "Preposizioni semplici fuse con l'articolo indeterminativo", "Avverbi con valore preposizionale", "Congiunzioni con funzione di moto a luogo"],
                    "correctAnswer": "Preposizioni semplici fuse con l'articolo determinativo",
                    "explanation": "Le preposizioni articolate nascono dalla fusione di preposizioni semplici (di, a, da, in, con, su) con gli articoli determinativi (il, lo, la, i, gli, le)."
                },
                {
                    "id": 414,
                    "question": "Quale funzione svolgono le interiezioni (es. 'ah!', 'oh!', 'ahi!', 'mah!')?",
                    "options": ["Esprimere sentimenti, stati d'animo o reazioni spontanee del parlante", "Collegare due proposizioni dello stesso livello sintattico", "Indicare la posizione di qualcosa nello spazio", "Modificare il significato del verbo nella frase"],
                    "correctAnswer": "Esprimere sentimenti, stati d'animo o reazioni spontanee del parlante",
                    "explanation": "Le interiezioni (o esclamazioni) sono parti invariabili del discorso che esprimono reazioni emotive immediate: gioia, dolore, sorpresa, disappunto."
                }
            ],
            "Sintassi della Frase": [
                {
                    "id": 415,
                    "question": "Nella frase 'Maria canta BENE', qual è il predicato?",
                    "options": ["Canta (predicato verbale)", "Maria (soggetto)", "Bene (complemento di modo)", "Canta bene (predicato nominale)"],
                    "correctAnswer": "Canta (predicato verbale)",
                    "explanation": "'Canta' è il predicato verbale della frase: indica l'azione compiuta dal soggetto (Maria). 'Bene' è un complemento di modo."
                },
                {
                    "id": 416,
                    "question": "Nella frase 'Ho scritto LA LETTERA', il sintagma 'la lettera' è:",
                    "options": ["Complemento oggetto (diretto)", "Complemento di specificazione", "Complemento di termine", "Soggetto della frase"],
                    "correctAnswer": "Complemento oggetto (diretto)",
                    "explanation": "Il complemento oggetto è un complemento diretto (senza preposizione) che risponde alla domanda 'chi?' o 'che cosa?' riferita al verbo transitivo."
                },
                {
                    "id": 417,
                    "question": "Come si chiama il complemento che risponde alla domanda 'con quale mezzo?' (es. 'Vado a scuola IN BICICLETTA')?",
                    "options": ["Complemento di mezzo (o strumento)", "Complemento di modo", "Complemento di causa", "Complemento di compagnia"],
                    "correctAnswer": "Complemento di mezzo (o strumento)",
                    "explanation": "Il complemento di mezzo (o strumento) indica il mezzo fisico o astratto con cui si compie l'azione; risponde alle domande 'con quale mezzo?', 'con quale strumento?'."
                }
            ],
            "Sintassi del Periodo": [
                {
                    "id": 418,
                    "question": "Cosa introduce una proposizione soggettiva?",
                    "options": ["Svolge la funzione di soggetto della proposizione reggente (es. 'È importante CHE TU STUDI')", "Esprime la causa dell'azione principale", "Indica il fine o lo scopo dell'azione", "Descrive una condizione necessaria per l'azione principale"],
                    "correctAnswer": "Svolge la funzione di soggetto della proposizione reggente (es. 'È importante CHE TU STUDI')",
                    "explanation": "La proposizione soggettiva fa le veci del soggetto nella frase reggente. È introdotta da 'che + congiuntivo' o da un infinito."
                },
                {
                    "id": 419,
                    "question": "Come si chiama la proposizione subordinata che esprime la causa di un'azione? (Es. 'Studio molto PERCHÉ voglio imparare')",
                    "options": ["Proposizione causale", "Proposizione finale", "Proposizione concessiva", "Proposizione consecutiva"],
                    "correctAnswer": "Proposizione causale",
                    "explanation": "La proposizione causale indica il motivo o la causa dell'azione della principale. È introdotta da congiunzioni come 'perché', 'poiché', 'dato che', 'siccome'."
                },
                {
                    "id": 420,
                    "question": "Cosa indica una proposizione temporale? (Es. 'QUANDO arriva Marco, usciamo')",
                    "options": ["Il momento o il periodo in cui avviene l'azione della proposizione principale", "La condizione necessaria affinché avvenga l'azione principale", "La conseguenza dell'azione principale", "Il fine per cui si compie l'azione principale"],
                    "correctAnswer": "Il momento o il periodo in cui avviene l'azione della proposizione principale",
                    "explanation": "Le proposizioni temporali forniscono una collocazione nel tempo all'azione della reggente. Sono introdotte da congiunzioni come 'quando', 'mentre', 'appena', 'dopo che'."
                },
                {
                    "id": 421,
                    "question": "Come si chiama la proposizione subordinata che esprime una circostanza opposta o contraria a quella della principale? (Es. 'SEBBENE fosse stanco, studiò lo stesso')",
                    "options": ["Proposizione concessiva", "Proposizione avversativa", "Proposizione condizionale", "Proposizione causale"],
                    "correctAnswer": "Proposizione concessiva",
                    "explanation": "La concessiva indica una circostanza che si oppone all'azione principale senza però impedirla. È introdotta da 'sebbene', 'benché', 'nonostante', 'anche se' + congiuntivo."
                }
            ]
        },
        "Analisi del Testo": {
            "Tipologie Testuali": [
                {
                    "id": 422,
                    "question": "Quali sono le principali caratteristiche del testo narrativo?",
                    "options": ["Racconta fatti ed eventi in sequenza cronologica con personaggi, luoghi e un narratore", "Descrive le caratteristiche di oggetti o persone con linguaggio sensoriale", "Spiega relazioni causali tra fenomeni con linguaggio scientifico", "Esprime opinioni e tesi sostenute da argomenti logici"],
                    "correctAnswer": "Racconta fatti ed eventi in sequenza cronologica con personaggi, luoghi e un narratore",
                    "explanation": "Il testo narrativo è organizzato attorno a una storia (fabula) con una struttura narrativa (situazione iniziale - complicazione - conclusione) e un punto di vista narrativo."
                },
                {
                    "id": 423,
                    "question": "Cosa si intende per 'testo argomentativo'?",
                    "options": ["Un testo che sostiene una tesi con argomenti logici e confuta le obiezioni (antitesi)", "Un testo che descrive un oggetto o un paesaggio nei dettagli", "Un testo che informa su eventi accaduti in modo oggettivo", "Un testo che racconta una storia inventata con personaggi fittizi"],
                    "correctAnswer": "Un testo che sostiene una tesi con argomenti logici e confuta le obiezioni (antitesi)",
                    "explanation": "Il testo argomentativo (es. saggio, articolo di opinione) presenta una tesi, la supporta con argomenti (prove, esempi, dati) e risponde alle possibili obiezioni."
                },
                {
                    "id": 424,
                    "question": "Cosa si intende per 'narratore onnisciente' in un romanzo?",
                    "options": ["Un narratore che conosce tutto: i pensieri e i sentimenti di tutti i personaggi, gli eventi passati e futuri", "Un narratore che è protagonista della storia e racconta in prima persona", "Un narratore che osserva dall'esterno senza conoscere i pensieri dei personaggi", "Un narratore che interviene direttamente nella storia per modificarla"],
                    "correctAnswer": "Un narratore che conosce tutto: i pensieri e i sentimenti di tutti i personaggi, gli eventi passati e futuri",
                    "explanation": "Il narratore onnisciente (o 'a fuoco zero') ha una visione totale della storia: sa tutto di tutti i personaggi e può raccontare anche ciò che non è stato detto esplicitamente."
                }
            ],
            "Figure Retoriche": [
                {
                    "id": 425,
                    "question": "Come si chiama la figura retorica che consiste nel dare caratteristiche umane a oggetti inanimati, animali o concetti astratti? (Es. 'il vento urla', 'la luna sorride')",
                    "options": ["Personificazione (o Prosopopea)", "Metafora", "Similitudine", "Metonimia"],
                    "correctAnswer": "Personificazione (o Prosopopea)",
                    "explanation": "La personificazione attribuisce qualità, azioni o sentimenti tipicamente umani a entità non umane, creando un forte effetto poetico e di animazione."
                },
                {
                    "id": 426,
                    "question": "Qual è la differenza tra una similitudine e una metafora?",
                    "options": ["La similitudine usa esplicitamente i termini 'come' o 'simile a'; la metafora no, identificando direttamente i due termini", "La metafora riguarda solo il linguaggio poetico; la similitudine è usata solo in prosa", "Non c'è differenza: sono sinonimi", "La similitudine è più forte della metafora perché più esplicita"],
                    "correctAnswer": "La similitudine usa esplicitamente i termini 'come' o 'simile a'; la metafora no, identificando direttamente i due termini",
                    "explanation": "Similitudine: 'È forte come un leone'. Metafora: 'È un leone'. La metafora è più incisiva perché l'identificazione è totale e implicita."
                },
                {
                    "id": 427,
                    "question": "Come si chiama la figura retorica che consiste nella ripetizione di uno stesso suono consonantico all'inizio di parole vicine? (Es. 'Sopra la panca la capra campa')",
                    "options": ["Allitterazione", "Assonanza", "Onomatopea", "Anafora"],
                    "correctAnswer": "Allitterazione",
                    "explanation": "L'allitterazione è la ripetizione di uno stesso suono (consonante o vocale) all'inizio di parole vicine, creando un effetto musicale e mnemonico."
                }
            ]
        }
    }
};

// Legge il file esistente
const existingPath = path.join(__dirname, 'questions.json');
const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));

// Deep merge function
function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else if (Array.isArray(source[key])) {
            if (!target[key]) target[key] = [];
            // Aggiungi solo le domande con ID non già presenti
            const existingIds = new Set(target[key].map(q => q.id));
            source[key].forEach(q => {
                if (!existingIds.has(q.id)) {
                    target[key].push(q);
                }
            });
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

const merged = deepMerge(existing, newQuestions);

// Rimuovi la sezione "Organizzazione dello Stato" che è duplicata di "Gli Organi dello Stato"
if (merged["Educazione Civica"] && merged["Educazione Civica"]["Organizzazione dello Stato"]) {
    // Sposta le domande uniche in sezioni già esistenti
    const orgStato = merged["Educazione Civica"]["Organizzazione dello Stato"];
    
    // Crea map di domande già esistenti
    const getExistingQuestions = (materia, topic) => {
        const arr = [];
        if (merged[materia] && merged[materia][topic]) {
            for (const sub in merged[materia][topic]) {
                arr.push(...merged[materia][topic][sub]);
            }
        }
        return new Set(arr.map(q => q.question));
    };
    
    // Elimina la sezione duplicata
    delete merged["Educazione Civica"]["Organizzazione dello Stato"];
}

fs.writeFileSync(existingPath, JSON.stringify(merged, null, 4), 'utf8');

// Conta il totale
let total = 0;
function count(obj) {
    if (Array.isArray(obj)) { total += obj.length; return; }
    if (typeof obj === 'object') { Object.values(obj).forEach(count); }
}
count(merged);
console.log(`✅ Merge completato! Totale domande nel database: ${total}`);

// Stampa distribuzione per materia
for (const materia in merged) {
    let mat_total = 0;
    for (const topic in merged[materia]) {
        for (const sub in merged[materia][topic]) {
            mat_total += merged[materia][topic][sub].length;
        }
    }
    console.log(`  📚 ${materia}: ${mat_total} domande`);
}
