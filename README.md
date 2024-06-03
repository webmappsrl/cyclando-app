# Cyclando

Cyclando è un'applicazione Ionic sviluppata con Angular che consente di gestire documenti e informazioni in modo semplice e accessibile. Questo progetto utilizza Surge per la distribuzione e GitHub Actions per il flusso di lavoro CI/CD.

## Prerequisiti

Assicurati di avere installato le seguenti dipendenze globalmente:

- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)
- [Ionic CLI](https://ionicframework.com/docs/cli)

## Installazione

1. Clona il repository:

    ```bash
    git clone https://github.com/webmappsrl/cyclando-app.git
    cd cyclando-app
    ```

2. Installa e utilizza la versione corretta di Node.js:

    Se stai utilizzando `nvm`, esegui i seguenti comandi:

    ```bash
    nvm install
    nvm use
    ```

3. Installa le dipendenze del progetto:

    ```bash
    npm install
    ```

## Sviluppo Locale

Per avviare l'applicazione in modalità di sviluppo, esegui:

ionic serve
Questo comando avvierà un server di sviluppo e aprirà una nuova scheda del browser con l'applicazione in esecuzione. Ogni modifica al codice sorgente verrà automaticamente ricaricata.

Struttura del Progetto
La struttura principale del progetto è la seguente:

bash
Copia codice
cyclando-app/
├── e2e/                        # Test end-to-end
├── node_modules/               # Dipendenze del progetto
├── src/                        # Codice sorgente dell'applicazione
│   ├── app/                    # Moduli e componenti principali
│   ├── assets/                 # Risorse statiche (immagini, icone, ecc.)
│   ├── environments/           # Configurazioni degli ambienti
│   ├── theme/                  # Stili dell'applicazione
│   └── index.html              # File HTML principale
├── .editorconfig               # Configurazione dell'editor
├── .gitignore                  # File per ignorare file specifici in Git
├── angular.json                # Configurazione di Angular CLI
├── ionic.config.json           # Configurazione di Ionic CLI
├── package.json                # Dipendenze e script del progetto
└── README.md                   # Documentazione del progetto
Costruzione
Per costruire l'applicazione per la distribuzione, esegui:

bash
Copia codice
ionic build
I file pronti per la distribuzione saranno nella directory www.

Distribuzione
Per distribuire l'applicazione utilizzando Surge, segui questi passaggi:

Installa Surge se non lo hai già fatto:

bash
Copia codice
npm install -g surge
Esegui il comando di distribuzione:

bash
Copia codice
surge ./www your-custom-domain.surge.sh
CI/CD con GitHub Actions
Questo progetto include un workflow CI/CD configurato con GitHub Actions. Il workflow si trova in .github/workflows/ci-cd.yml ed esegue le seguenti operazioni:

Installa le dipendenze
Esegue i test
Costruisce l'applicazione
Distribuisce l'applicazione utilizzando Surge
Contribuire
Se desideri contribuire a questo progetto, segui questi passaggi:

Fai un fork del repository
Crea un nuovo branch per la tua funzionalità (git checkout -b feature/nome-funzionalità)
Fai commit delle tue modifiche (git commit -am 'Aggiungi nuova funzionalità')
Spingi il branch (git push origin feature/nome-funzionalità)
Apri una Pull Request
Licenza
Questo progetto è distribuito sotto la licenza MIT. Vedi il file LICENSE per ulteriori dettagli.

```bash
