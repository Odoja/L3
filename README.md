# Restaurant World

En webbapplikation för att utforska, filtrera, sortera och recensera restauranger.

**Live Demo:** https://restaurantworld.up.railway.app/

## Innehållsförteckning

- [Om Projektet](#om-projektet)
- [Dokumentation](#dokumentation)
- [Teknologier](#teknologier)
- [Komma igång](#komma-igång)
- [Användning](#användning)
- [Tillgängliga Scripts](#tillgängliga-scripts)
- [Licens](#licens)

## Om Projektet

Restaurant World är en app byggd för kursen 1DV610 på Linnéuniversitetet. Applikationen låter användare:

- Utforska restauranger med bilder och beskrivningar
- Filtrera restauranger efter kökstyp (Svensk, Italiensk, Thai, etc.)
- Sortera efter betyg eller prisnivå
- Läsa och skriva recensioner med stjärnbetyg

### Arkitektur

Projektet följer **MVC + Service Layer** arkitektur med tydlig separation of concerns:

```
Frontend (Web Components)
    ↓
Backend (Express.js)
    ↓
Router → Controller → Service → Model → MongoDB (Mongoose)
```

## Dokumentation

- **[Vision](./docs/Vision.md)** - Projektets vision och baskrav
- **[Kravspecifikation](./docs/Krav.md)** - Detaljerad kravspecifikation
- **[Testspecifikation](./docs/Testplan.md)** - Teststrategi och testfall

## Teknologier

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Webb-ramverk
- **MongoDB** - NoSQL-databas
- **Mongoose** - ODM för MongoDB
- **EJS** - Template engine

### Frontend
- **Vanilla JavaScript** - Ingen frontend-ramverk
- **Web Components** - Custom elements för återanvändbarhet
- **CSS** - Styling och responsiv design

### Dev Tools
- **Nodemon** - Auto-restart vid kodändringar
- **ESLint** - Kodkvalitet och linting

## Komma igång

### Förutsättningar

Innan du börjar, se till att du har följande installerat:

- **Node.js** (v18 eller senare) - [Ladda ner här](https://nodejs.org/)
- **Docker Desktop** - [Ladda ner här](https://www.docker.com/products/docker-desktop/)
- **Git** - För att klona projektet

### Installation

#### 1. Starta MongoDB med Docker

Om du inte redan har en MongoDB-container, kör:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Om containern redan finns, starta den:

```bash
docker start mongodb
```

Verifiera att MongoDB körs:
```bash
docker ps
```
(Du ska se `mongodb` i listan)

#### 2. Klona projektet

```bash
git clone https://github.com/Odoja/L3.git
cd L3
```

#### 3. Installera dependencies

```bash
npm install
```

#### 4. Konfigurera miljövariabler

Skapa en `.env`-fil i rotkatalogen:

```env
# Databas
DB_CONNECTION_STRING="mongodb://localhost:27017/restaurantworld"

# Session
SESSION_NAME="restaurant-session"
SESSION_SECRET="your-secret-key-here-change-this-in-production"

# Server
PORT=8080

# Base URL
BASE_URL="/"
```

> **⚠️ Viktigt:** Ändra `SESSION_SECRET` till en säker, slumpmässig sträng i produktion.

#### 5. Starta applikationen

**Development mode (med auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

#### 6. Öppna i webbläsaren

Navigera till: **http://localhost:8080**

## Användning

1. **Huvudsidan** - Bläddra genom alla tillgängliga restauranger
2. **Filtrera** - Klicka på kökstyp-emblemen för att filtrera
3. **Sortera** - Använd sorteringsknappar (Högst betyg, Lägst pris, etc.)
4. **Visa detaljer** - Klicka på en restaurang för att se mer information
5. **Skriv recension** - Fyll i namn, recension och välj stjärnbetyg

### Första användningen

Applikationen kommer med fördefinierade restauranger i databasen. Om databasen är tom kan du skapa restauranger via MongoDB Compass eller lägga till dem programmatiskt.

## Tillgängliga Scripts

| Kommando | Beskrivning |
|----------|-------------|
| `npm run dev` | Startar development server med nodemon och debugging |
| `npm start` | Startar production server |
| `npm run lint` | Kör ESLint för att hitta kodproblem |
| `npm run lint:fix` | Fixar automatiskt lintproblem |

## Licens

MIT License
