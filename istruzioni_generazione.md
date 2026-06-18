# Protocollo Operativo AuraTest: Creazione e Integrazione Domande

Questo documento contiene le istruzioni riga per riga per l'aggiunta di nuove materie, moduli o PDF all'interno del database di AuraTest, garantendo l'altissima qualità e l'assenza di ripetizioni o artefatti visivi.

Ogni volta che l'utente fornisce un nuovo PDF e richiede l'inserimento nel database, l'AI deve consultare **obbligatoriamente** queste istruzioni e seguirle in modo sequenziale.

---

## FASE 1: Estrazione e Lettura
1. Usa gli strumenti di OCR/conversione (es. `pdftotext` o simili) per leggere il contenuto del PDF.
2. Salva il testo estratto in formato UTF-8 puro in un file testuale locale temporaneo per non perdere contesto.

## FASE 2: Mappatura Argomenti (Gerarchia Obbligatoria)
1. Analizza il testo ed estrai una mappa concettuale in formato Markdown.
2. La gerarchia deve essere:
   - **Materia** (es. Diritto Privato)
   - **Topic** (es. I Contratti)
   - **Subtopic** (es. La Rescissione del Contratto)
3. Approva la mappa con l'utente se la materia è nuova, per assicurarsi che i macro-argomenti siano corretti.

## FASE 3: Generazione Domande (Qualità Assoluta)
1. Per ogni `Topic`, crea un file JSON separato temporaneo (es. `questions_materia_topic1.json`).
2. Per ogni `Subtopic` della mappa, estrai i concetti chiave.
3. Genera **solo** domande uniche, scritte manualmente e perfettamente contestualizzate. Non utilizzare cicli for o varianti algoritmiche (es. cambiare solo il nome di una città) per gonfiare il numero: la qualità prevale sempre sulla quantità.
4. **Formato JSON rigoroso**:
   ```json
   {
       "Materia": {
           "Topic": {
               "Subtopic": [
                   {
                       "id": "univoco",
                       "question": "Testo pulito, senza sigle come (Q.1) o (ID-2)",
                       "options": ["Corretta", "Errata1", "Errata2", "Errata3"],
                       "correctAnswer": "Corretta",
                       "explanation": "Spiegazione dettagliata per il feedback."
                   }
               ]
           }
       }
   }
   ```
5. **Attenzione**: Non aggiungere nessuna etichetta o punteggiatura non inerente (come `(Var 1)`) alla fine della `question`.

## FASE 4: Unione e Controllo
1. Usa uno script in Node.js per fare un "deep merge" dei file JSON temporanei con il file `questions.json` di produzione.
2. Controlla che le nuove domande non siano semanticamente identiche a quelle già presenti.
3. Lo script di gioco di AuraTest (`script.js`) si occuperà in automatico del campionamento e dello "shuffle" delle opzioni, tu assicurati solo che nel JSON i campi siano corretti e che il testo sia pulito.

## FASE 5: Rilascio
1. Dopo l'unione, committa e fai il push su GitHub della modifica al file `questions.json`.
2. Informa l'utente della disponibilità delle nuove domande e della corretta esecuzione del protocollo.
