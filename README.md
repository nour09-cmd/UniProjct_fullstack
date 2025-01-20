# Barber Shops Finder. Fullstack Webanwendungen bei (Prof. Dr. Kohler) WiSe2024/25

## Beschreibung

My Barber Webapp. Finden Sie die besten Friseure in Ihrem Ort und buchen Sie Ihre Termine bequem online. Mit My Barber können Sie nicht nur Termine vereinbaren, sondern diese auch ganz einfach verwalten, verschieben oder absagen – alles an einem Ort.

## Ziele

• Für Friseur\*innen:

- Einfaches Erstellen eines Profils und Präsentation der Dienstleistungen.
- Flexible Terminverwaltung, um Kund\*innen den besten Service zu bieten.
- Erhöhte Sichtbarkeit durch spezielle Angebote und Rabatte.

• Für Kund\*innen:

- Schnelle und bequeme Terminbuchung bei professionellen Friseur\*innen.
- Verwaltung der eigenen Termine, inklusive Änderungen oder Stornierungen.
- Erhalt des perfekten Looks durch den passenden Friseur.

## Umgebung

My Barber wird in einer modernen Technologieumgebung entwickelt, die Node.js und Docker für die Backend-Architektur nutzt, Angular in TypeScript für das Frontend verwendet und auf AWS für das Hosting eingesetzt werden kann.

## Demo-Projekt herunterladen

### 1. `git clone https://github.com/nour022/UniProjct_fullstack.git`

### 2. Um das Projekt zu starten, öffnen Sie einfach die Docker-App und geben Sie diesen Befehl ein:

### `docker-compose up --build` oder `npm start`

## Um das Projekt zu testen:

- Docker anschalten
- `docker run -p 5432:5432 -d -e POSTGRES_PASSWORD=test -e POSTGRES_USER=admin -e POSTGRES_DB=barber postgres`
- `docker run -d -p 27017:27017 --name mongodb -v mongodb_volume:/data/db mongo:latest`
- Beim ersten Mal muss man alles lokal in `server/utils` ändern:

  - `export const DB_URIMONGODB = "mongodb://localhost:27017/"; //export const DB_URIMONGODB = "mongodb://mongodbNonosql:27017/test";`
  - `export const DB_URIPOSTGRESQL = "postgresql://admin:test@localhost:5432/barber"; //export const DB_URIPOSTGRESQL = "postgresql://admin:test@postgresSQLdb:5432/barber";`

- Frontend: `cd client; ng test --include src/app/Components/willkommen/willkommen.component.spec.ts`
- Backend: `cd server; npm run test`

## Teammitglieder

- Mohammad Nour Gaser (inf4024, 678565)
- Jafar Alizadeh (inf4213, 679545)
- Mohamad Alraghban (inf4365, 680300)
- Amer Al-Aloush (inf4049, 678721)
