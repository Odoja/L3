# Testpecifikation - Restaurant World App

## Testverktyg
- **Browser DevTools** - Kontrollera konsolloggar och DOM-ändringar
- **MongoDB Compass** - Verifiera att data sparas korrekt i databasen
- **Webbläsare** - Testa i Chrome

## Teststrategi

1. Starta servern: `npm run dev`
2. Öppna webbläsaren: `http://localhost:XXXX`
3. Gå igenom testfallen systematiskt
4. Fyll i Status-kolumnen för varje testfall

## Instruktioner
- ✅ = Test godkänd
- ❌ = Test misslyckad
- ⏭️ = Ej testad


## Testfall

### **K-001: Visa restauranger**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-001 | Visa huvudsidan med restauranger | Navigera till huvudsidan | Huvudsidan visas med alla restauranger från databasen. Varje restaurang visar namn, typ, pris, bild och betyg | ✅ |

---

### **K-002: Filtrera restauranger efter kökstyp**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-002 | Filtrera - Alla restauranger | Klicka på "Restaurang"-Emblemet | Alla restauranger visas. Rubriken visar "All Restaurants" | ✅ |
| TC-003 | Filtrera - Svensk mat | Klicka på "Svensk"-Emblemet | Endast svenska restauranger visas. Rubriken visar "Swedish" | ✅ |
| TC-004 | Filtrera - Italiensk mat | Klicka på "Italiensk"-Emblemet | Endast italienska restauranger visas. Rubriken visar "Italian" | ✅ |
| TC-005 | Filtrera - Thai mat | Klicka på "Thai"-Emblemet | Endast thailändska restauranger visas. Rubriken visar "Thai" | ✅ |
| TC-006 | Filtrera - Turkisk mat | Klicka på "Turkisk"-Emblemet | Endast turkiska restauranger visas. Rubriken visar "Turkish" | ✅ |
| TC-007 | Filtrera - Japansk mat | Klicka på "Japansk"-Emblemet | Endast japanska restauranger visas. Rubriken visar "Japanese" | ✅ |
| TC-008 | Filtrera - Amerikansk mat | Klicka på "Amerikansk"-Emblemet | Endast amerikanska restauranger visas. Rubriken visar "American" | ✅ |
| TC-009 | Filtrera - Kinesisk mat | Klicka på "Kinesisk"-Emblemet | Endast kinesiska restauranger visas. Rubriken visar "Chinese" | ✅ |
| TC-010 | Filtrera - Mexikansk mat | Klicka på "Mexikansk"-Emblemet | Endast mexikanska restauranger visas. Rubriken visar "Mexican" | ✅ |
| TC-011 | Filtrera - Vietnamesisk mat | Klicka på "Vietnamesisk"-Emblemet | Endast vietnamesiska restauranger visas. Rubriken visar "Vietnamese" | ✅ |

---

### **K-003: Sortera restauranger**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-012 | Sortera - Högst betyg | Klicka på "Top Rated"-knappen | Restauranger visas i fallande ordning efter betyg (högsta betyget först). Knappen markeras som aktiv | ✅ |
| TC-013 | Sortera - Lägst betyg | Klicka på "Lowest Rated"-knappen | Restauranger visas i stigande ordning efter betyg (lägsta betyget först). Knappen markeras som aktiv | ✅ |
| TC-014 | Sortera - Högsta pris | Klicka på "Highest Price"-knappen | Restauranger visas i fallande ordning efter pris (dyrast först, ex: $$$ före $$). Knappen markeras som aktiv | ✅ |
| TC-015 | Sortera - Lägsta pris | Klicka på "Lowest Price"-knappen | Restauranger visas i stigande ordning efter pris (billigast först, ex: $ före $$). Knappen markeras som aktiv | ✅ |
| TC-016 | Kombinera sortering och filter | Filtrera på "Italiensk", klicka sedan "Top Rated" | Endast italienska restauranger visas, sorterade efter högsta betyg först | ✅ |
| TC-017 | Byta sortering | Klicka "Top Rated" sedan "Lowest Price" | Restaurangerna sorteras om från betyg till pris. Den tidigare knappen blir inaktiv | ✅ |

---

### **K-004: Visa restaurangsida**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-018 | Navigera till restaurangsida | Klicka på en restaurang från huvudsidan | Restaurangsidan öppnas med bild, namn, typ, betyg, antal recensioner och beskrivning | ✅ |
| TC-019 | Visa restaurangbild | Öppna restaurangsida | Restaurangens huvudbild visas högst upp på sidan | ✅ |
| TC-020 | Visa restauranginfo | Öppna restaurangsida | Restaurangens namn, kökstyp, genomsnittsbetyg och antal recensioner visas korrekt | ✅ |
| TC-021 | Visa restaurangbeskrivning | Öppna restaurangsida | Restaurangens beskrivning visas under "About The Restaurant" | ✅ |
| TC-022 | Tillbaka-knapp | Klicka på "Back to main page"-knappen | Användaren navigeras tillbaka till huvudsidan | ✅ |

---

### **K-005: Visa recensioner**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-023 | Visa recensionslista | Öppna restaurangsida med recensioner | Alla recensioner för restaurangen visas med användarnamn, recensionstext och betyg | ✅ |
| TC-024 | Visa tom recensionslista | Öppna restaurangsida utan recensioner | Recensionssektionen visas men utan recensioner | ✅ |

---

### **K-006: Sortera recensioner**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-025 | Sortera - Nyaste först | Välj "Newest Reviews" i dropdown | Recensioner visas med senast skapade först | ✅ |
| TC-026 | Sortera - Äldste först | Välj "Oldest Reviews" i dropdown | Recensioner visas med äldsta först | ✅ |
| TC-027 | Sortera - Högsta betyg | Välj "Highest Rating" i dropdown | Recensioner visas med högsta betyg först | ✅ |
| TC-028 | Sortera - Lägsta betyg | Välj "Lowest Rating" i dropdown | Recensioner visas med lägsta betyg först | ✅ |
| TC-029 | Dölj sortering när inga recensioner | Öppna restaurang utan recensioner | Sorteringsdropdown är dold/inaktiv | ✅ |

---

### **K-007: Skriva recensioner**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-030 | Skapa recension | Fyll i namn: "Anna", recension: "Fantastisk mat!", betyg: 5 stjärnor. Klicka "Send" | Recensionen sparas och visas i listan. Formuläret återställs | ✅ |
| TC-031 | Skapa recension utan namn | Fyll i recension och betyg, lämna namn tomt. Klicka "Send" | Meddelande att fylla i saknande fält visas | ✅ |
| TC-032 | Skapa recension utan text | Fyll i namn och betyg, lämna recensionstext tom. Klicka "Send" | Meddelande att fylla i saknande fält visas | ✅ |
| TC-033 | Skapa recension utan betyg | Fyll i namn och recension, välj inget betyg. Klicka "Send" | Meddelande att fylla i saknande fält visas | ✅ |
| TC-034 | Välj betyg - 1 stjärna | Klicka på första stjärnan | 1 stjärna blir ifylld (gul). Rating-värdet sätts till 1 | ✅ |
| TC-035 | Välj betyg - 3 stjärnor | Klicka på tredje stjärnan | 3 stjärnor blir ifyllda. Rating-värdet sätts till 3 | ✅ |
| TC-036 | Välj betyg - 5 stjärnor | Klicka på femte stjärnan | 5 stjärnor blir ifyllda. Rating-värdet sätts till 5 | ✅ |
| TC-037 | Hover över stjärnor | För muspekaren över stjärna 4 | Stjärnor 1-4 blir temporärt ifyllda. När musen lämnar återgår till valt betyg | ✅ |
| TC-038 | Ändra betyg | Välj 5 stjärnor, klicka sedan på 2 stjärnor | Betyget ändras till 2 stjärnor | ✅ |

---

### **K-008: Visa ny recension i listan**

| Test-ID | Testfall | Indata | Förväntat utfall | Resultat |
|---------|----------|--------|------------------|--------|
| TC-039 | Ny recension visas i listan | Skapa ny recension | Den nya recensionen visas i recensionslistan **utan att ladda om sidan** | ✅ |
| TC-040 | Ny recension visas högst upp | Sortering är "Newest Reviews". Skapa ny recension | Den nya recensionen visas högst upp i listan | ✅ |
| TC-041 | Formuläret återställs | Skapa recension med namn "Test", text "Bra!", 4 stjärnor | Efter skickad recension är alla fält tomma och stjärnorna återställda (inga ifyllda stjärnor) | ✅ |
