# Restaurant World

En webbapplikation för att utforska, filtrera och recensera restauranger.

## Dokumentation

- **[Vision](./docs/Vision.md)** - Vision och baskrav
- **[Krav](./docs/Krav.md)** - Detaljerad kravspecifikation
- **[Testplan](./docs/Testplan.md)** - Testfall och teststrategi
- **[Testresultat](./docs/TESTRESULTAT.md)** - Testresultat

## Komma igång

### Förutsättningar
- Node.js
- MongoDB

### Installation

1. Klona repot
```bash
git clone [repository-url]
cd L3
```

2. Installera dependencies
```bash
npm i
```

3. Skapa en `.env`-fil i rotkatalogen
```env
#Databas
DB_CONNECTION_STRING="mongodb://localhost:27017/****"


#Session
SESSION_NAME="****"
SESSION_SECRET="****"

#PORT
PORT=8080

#Base_URL
BASE_URL="/"
```

4. Starta applikationen
```bash
npm run dev
```

5. Öppna i webbläsaren: `http://localhost:8080`

## Licens

MIT License
