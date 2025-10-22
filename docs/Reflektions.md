# Reflektion - L3

## Kapitel 2: Meaningful Names

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
// Blandning av "comment" och "review"
renderReviews (reviews) {
  const commentSection = this.shadowRoot.getElementById('comment-section')
  commentSection.innerHTML = ''

  reviews.forEach(review => {
    const container = document.createElement('div')
    container.classList.add('comment-container')

    const username = document.createElement('h4')
    username.textContent = review.username

    const text = document.createElement('p')
    text.textContent = review.review

    const rating = document.createElement('span')
    rating.textContent = `Rating: ${review.rating}/5`

    container.appendChild(username)
    container.appendChild(text)
    container.appendChild(rating)

    commentSection.appendChild(container)
  })
}

// Blandning av "filter" och "sort"
displaySortOptions (reviews) {
  const sortList = this.shadowRoot.getElementById('filter-option')

  if (!reviews || reviews.length === 0) {
    sortList.classList.add('hidden')
  } else {
     sortList.classList.remove('hidden')
  }
}
```

**L3:**
```javascript
// Genomgående "review" överallt
renderReviews (reviews) {
  const reviewSection = this.#shadowRoot.getElementById('review-section')
  reviewSection.innerHTML = ''

  reviews.forEach(review => {
    reviewSection.appendChild(this.#createReviewContainer(review))
  })
}

// Genomgående "sort" överallt
displaySortOptions(reviews) {
  const sortList = this.#shadowRoot.getElementById('sort-option')

  if (!reviews || reviews.length === 0) {
    sortList.classList.add('hide-select')
  } else {
    sortList.classList.remove('hide-select')
  }
}
```

**Reflektion:**  
I min L2-reflektion nämnde jag min inkonsekventa namngivning med "comment" vs "review" och "filter" vs "sort", vilket bröt mot "Pick One Word per Concept". Jag hade `commentFilter()`, `comment-section`, och `comment-container` samtidigt som jag använde `renderReviews()` och `displayReviews()`, vilket skapade förvirring eftersom "comment" och "review" var samma sak. Jag blandade också "filter" och "sort" - metoden `commentFilter()` sorterade reviews, HTML-elementet hette `filter-option`, men variabeln hette `sortList`. Även om jag själv förstod kopplingen mellan filter och sortering, insåg jag att detta krävde mental mapping för andra. I den refaktorerade versionen applicerade jag "Use Intention-Revealing Names" genom att konsekvent välja ETT ord per koncept: genomgående "review" (`ReviewRenderer`, `review-section`, `review-container`, `#createReviewContainer`) och genomgående "sort" (`ReviewSorter`, `sortReviewsByOption()`, `sort-option`, `#reviewSorting()`). Detta eliminerar mental mapping och följer "Avoid Disinformation".

---

## Kapitel 3: Functions

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
// Gör flera saker: tömmer section, skapar username, text, rating, container
renderReviews(reviews) {
  const commentSection = this.shadowRoot.getElementById('comment-section')
  commentSection.innerHTML = ''

  reviews.forEach(review => {
    const container = document.createElement('div')
    container.classList.add('comment-container')

    const username = document.createElement('h4')
    username.textContent = review.username

    const text = document.createElement('p')
    text.textContent = review.review

    const rating = document.createElement('span')
    rating.textContent = `Rating: ${review.rating}/5`

    container.appendChild(username)
    container.appendChild(text)
    container.appendChild(rating)

    commentSection.appendChild(container)
  })
}
```

**L3:**
```javascript
// Rendera lista av reviews
renderReviews(reviews) {
  const reviewSection = this.#shadowRoot.getElementById('review-section')
  reviewSection.innerHTML = ''

  reviews.forEach(review => {
    reviewSection.appendChild(this.#createReviewContainer(review))
  })
}

// Skapar container
#createReviewContainer(review) {
  const container = document.createElement('div')
  container.classList.add('review-container')
  container.appendChild(this.#createUsername(review))
  container.appendChild(this.#createReview(review))
  container.appendChild(this.#createRating(review))
  return container
}

// Skapar username element
#createUsername(review) {
  const username = document.createElement('h4')
  username.textContent = review.username
  return username
}

// Skapar review text element
#createReview(review) {
  const reviewText = document.createElement('p')
  reviewText.textContent = review.review
  return reviewText
}

// Skapar rating element
#createRating(review) {
  const amountOfStars = review.rating
  const rating = document.createElement('div')
  rating.classList.add('review-rating')

  for (let i = 1; i <= amountOfStars; i++) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.classList.add('star')
    // ...skapar SVG stjärnor
    rating.appendChild(svg)
  }
  return rating
}
```

**Reflektion:**  
Något annat jag nämde i min L2-reflektion var att `renderReviews()` gjorde för många saker och jag kunde dela upp det i hjälpmetoder som `createUsername()` och `createReview()`. Så istället för att låta `renderReviews()` göra allt och bryta mot "Do One Thing". Metoden blandade också abstraktionsnivåer från high-level iteration (`reviews.forEach()`) till low-level DOM-manipulation (`createElement()`, `textContent`). I den refaktorerade versionen delade jag upp allting genom att extrahera varje skapande-operation till sin egen metod: `#createReviewContainer()`, `#createUsername()`, `#createReview()`, och `#createRating()`. Nu gör `renderReviews()` bara en sak: iterera och rendera. Detta följer "One Level of Abstraction per Function" huvudfunktionen opererar på hög nivå medan hjälpfunktioner hanterar detaljer. Jag är ändå lite kluven, man ställs för olika sorters problem när man har allt i ett och allt uppdelat. Jag hade nog velat behålla min version jag hade i L2 då detta är en väldigt simpel metod som bara skapar element och sätter ihop dem. I L3 versionen blir det ganska jobbigt att hålla koll på parametrar som ska skrivas i alla metoder vilket kan göra en förvirrad.

---

## Kapitel 4: Comments

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript

/**
 * Sorting logic for the comments.
 *
 * @param {string} filterOption - the filter the code is going to sort by.
 */
async commentFilter(filterOption) {
  try {
    const res = await fetch('/review/all')
    // ....
  }
}

/**
 * Renders reviews in the DOM.
 *
 * @param {*} reviews - a list with reviews.
 */
renderReviews(reviews) {
  // ...
}
```

**L3:**
```javascript

/**
 * Sorts reviews array based on the selected sorting option.
 *
 * @param {Array} reviews - the array of reviews to sort.
 * @param {string} sortOption - the sorting option.
 */
sortReviewsByOption(reviews, sortOption) {
  switch (sortOption) {
    case 'Newest':
      reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    // ...
  }
}

renderReviews(reviews) {
  const reviewSection = this.#shadowRoot.getElementById('review-section')
  reviewSection.innerHTML = ''
  reviews.forEach(review => {
    reviewSection.appendChild(this.#createReviewContainer(review))
  })
}
```

**Reflektion:**  
Även om jag tycker boken är lite väl negativt inställd till kommentarer, så kan jag se vart Martin kommer ifrån med det han säger. I L2 hade jag bl.a. "Noise Comments" som `renderReviews()` med "Renders reviews in the DOM", metodnamnet är redan förklarande nog så kommentar är onödigt. `commentFilter` hade dessutom "Misleading Comments" och sa "sorting logic" men namnet var "filter". I den refaktorerade versionen försöker jag mig på "Explain Yourself in Code" så väl jag kan, t.ex. med mina hjälpmetoder som `#createReviewContainer()`, `#createUsername()` där jag inte använder några kommentarer. Jag har dock kvar vad som skulle klassas som "onödiga kommentarer", men jag använder mig lite av samma logik som när det kommer till brandsläckare när det kommer till kommentarer, bättre att ha och inte behöva "använda"(läsa), än att inte ha och behöva.

---

## Kapitel 5: Formatting

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
class extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.currentRating = 0
    this.stars = this.shadowRoot.querySelectorAll('.star')
    this.ratingInput = this.shadowRoot.querySelector('#rating')
  }

  
  connectedCallback() {}
  ratingSetup() {}
  setRating(rating) {}
  ratingDisplay(rating) {}
  displayReviews() {}
  formLogic() {}
  filterSetup() {}
  commentFilter(filterOption) {}
  renderReviews(reviews) {}
  displaySortOptions(reviews) {}
}
```

**L3:**
```javascript
class extends HTMLElement {
  // 1. Privata fält samlade högst upp
  #form
  #errorMessage
  #reviewRenderer
  #reviewSorter
  #reviewFetcher
  #reviewRating

  // 2. Constructor
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.#form = this.shadowRoot.getElementById('review-form')
    this.#reviewRating = new ReviewRating(this.shadowRoot)
    // ... init
  }

  // 3. Lifecycle metoder
  connectedCallback() {
    this.#reviewRating.ratingSetup()
    this.#displayReviews()
    this.#setupForm()
    this.#reviewSorter.sortSetup()
  }

  // 4. Display metoder
  async #displayReviews() {}

  // 5. Form metoder (kommenterad sektion för tydlighet)
  #setupForm() {}
  async #submitReview(formData) {}

  // 6. Error metoder (alla error-metoder tillsammans)
  #renderErrorMessage(errorData) {}
  #displayError(message) {}
  #hideError() {}
}
```

**Reflektion:**  
Jag använde mig av "The Newspaper Metaphor" och "Vertical Formatting" genom att strukturera koden så den läses uppifrån och ner. I L2 försökte jag hålla ihop metoder som hörde samman men när jag kom på nya saker att implementera blev det bara att jag placerade dem längst ner. I den refaktorerade versionen använder jag "Conceptual Affinity" genom att gruppera relaterade metoder tillsammans med kommentarer som "Form Methods" och "Error Methods". Jag följer också "Vertical Distance",  metoder som anropar varandra är nära varandra. Dock blir det svårt att få det perfekt då jag delat upp L3 i flera klasser, vilket leder till att vid enstaka tillfällen måste man hoppa mellan klasser om man vill gå till botten med all kod.

---

## Kapitel 6: Objects and Data Structures

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
class extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    // Publika fält
    this.currentRating = 0
    this.stars = this.shadowRoot.querySelectorAll('.star')
    this.ratingInput = this.shadowRoot.querySelector('#rating')
  }

  // Extern kod kan ändra this.currentRating direkt
  setRating(rating) {
    this.currentRating = rating
    this.ratingInput.value = rating
    this.ratingDisplay(rating)
  }
}
```

**L3:**
```javascript
export class ReviewRating {
  // Privata fält
  #shadowRoot        
  #stars             
  #ratingInput       
  #currentRating     

  constructor(shadowRoot) {
    this.#shadowRoot = shadowRoot
    this.#stars = shadowRoot.querySelectorAll('.star')
    this.#ratingInput = shadowRoot.querySelector('#rating')
    this.#currentRating = 0
  }

  // Publik getter, endast read-only tillgänglighet
  get currentRating() {
    return this.#currentRating
  }

  // Publik API, kontrollerad tillgänglighet
  setRating(rating) {
    this.#currentRating = rating
    this.#ratingInput.value = rating
    this.#displayRating(rating)
  }

  // Privat metod, implementation dold
  #displayRating(rating) {
    this.#stars.forEach((star) => {
      const starValue = star.getAttribute('data-value')
      if (starValue <= rating) {
        star.classList.add('filled')
      } else {
        star.classList.remove('filled')
      }
    })
  }
}
```

**ReviewFetcher.js - Law of Demeter:**
```javascript
export class ReviewFetcher {
  #shadowRoot
  #restaurantId

  constructor(shadowRoot) {
    this.#shadowRoot = shadowRoot
    this.#restaurantId = this.#getRestaurantId()
  }

  // Publik getter, abstraherar bort implementationen
  get restaurantId() {
    return this.#restaurantId
  }

  // Privat metod, externa klasser behöver inte veta hur
  #getRestaurantId() {
    return window.location.pathname.split('/').pop()
  }
}
```

**Reflektion:**  
Här är en av de större ändringarna jag gjorde mellan L2 och L3, då allt var publikt i L2. Jag använde mig av "Data Abstraction" och "Data/Object Anti-Symmetry" genom att göra så mycket jag kan privat. Jag exponerade bl.a. `currentRating`, `stars`, och `ratingInput` i L2, vilket bröt mot inkapsling. Externa klasser kunde direkt manipulera dessa. I L3 använder jag privata fält och exponerar endast kontrollerade API:er via metoder och getters, vilket följer "The Law of Demeter". ReviewFetcher är ett exempel på hur jag döljer restaurantId hämtas (från URL:en), andra klasser får bara resultatet.

---

## Kapitel 7: Error Handling

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
formLogic() {
  const form = this.shadowRoot.getElementById('review-form')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const username = formData.get('username')
    const review = formData.get('review')
    const rating = formData.get('rating')

    // Felhantering med alert
    if (!username || !review || !rating) {
      alert('Fill in all fields and select a rating')
      return
    }

    try {
      const response = await fetch('/review/create', {
        method: 'POST',
        body: JSON.stringify({ username: username.trim(), review: review.trim(), rating })
      })

      if (response.ok) {
        form.reset()
        this.setRating(0)
        this.displayReviews()
      } else {
        // Generiskt felmeddelande utan detaljer
        console.error('Failed to submit review ' + response.status)
      }
    } catch (error) {
      console.error(error)
    }
  })
}
```

**L3:**
```javascript
#setupForm() {
  this.#form.addEventListener('submit', async (e) => {
    e.preventDefault()
    this.#hideError()

    const formData = new FormData(this.#form)
    try {
      await this.#submitReview(formData)
    } catch (error) {
      // Visar error i UI istället för alert
      this.#displayError(error.message)
    }
  })
}

async #submitReview(formData) {
  const response = await fetch('/review/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: formData.get('username').trim(),
      review: formData.get('review').trim(),
      rating: formData.get('rating'),
      restaurantId: this.#reviewFetcher.restaurantId
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    // Kastar exception med specifikt meddelande
    throw new Error(this.#renderErrorMessage(errorData))
  } else {
    this.#form.reset()
    this.#reviewRating.setRating(0)
    this.#displayReviews()
  }
}

// Specifika felmeddelanden från servern
#renderErrorMessage(errorData) {
  if (errorData.errors && errorData.errors.length > 0) {
    return errorData.errors.join(', ')
  } else if (errorData.error) {
    return errorData.error
  } else {
    return 'Failed to submit review'
  }
}

// Visuell felvisning
#displayError(message) {
  this.#errorMessage.textContent = message
  this.#errorMessage.classList.remove('hidden')
}
```

**Backend - ReviewController.js:**
```javascript
async createReview(req, res) {
  try {
    const newReview = await this.#reviewService.createReview(req.body)
    res.status(201).json({ review: newReview })
  } catch (error) {
    // Strukturerad error response
    return res.json({ errors: error.errors || [error.message] })
  }
}
```

**Backend - ReviewModel.js:**
```javascript
validate() {
  this.#blackListedWords()
  this.#errors()
}

#errors() {
  // Kastar specifika errors direkt
  if (!this.#username || this.#username.length === 0) {
    throw new Error('Username is required')
  }
  if (this.#username.length > 40) {
    throw new Error('Username cannot be longer than 40 characters')
  }
  // ... fler error
}
```

**Reflektion:**  
Jag applicerade "Use Exceptions Rather Than Return Codes" och "Provide Context with Exceptions". I L2 använde jag `alert()` och `console.error()` för fel, samt hade min felhantering i frontenden. I L3 flyttade jag felhanteringen till backend där ReviewModel kastar specifika exceptions som går igenom Model → Service → Controller → Client. Genom att använda exceptions istället för return codes och byta från `alert()` och `console.error()`, till visuell felvisning i UI, ger komponenten en bättre användarupplevelse.

---

## Kapitel 8: Boundaries

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
async displayReviews() {
  try {
    // Direkt fetch-anrop, tight coupling
    const res = await fetch('/review/all')
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const reviews = await res.json()
    this.renderReviews(reviews)
  } catch (err) {
    console.error(err)
  }
}

async formLogic() {
  // Direkt POST-anrop, tight coupling
  const response = await fetch('/review/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, review, rating })
  })
  
  if (response.ok) {
    form.reset()
    this.setRating(0)
    this.displayReviews()
  }
}

// Backend finns inte
```

**L3:**
```javascript
// Frontend, ReviewFetcher.js som boundary
export class ReviewFetcher {
  #shadowRoot
  #restaurantId

  constructor(shadowRoot) {
    this.#shadowRoot = shadowRoot
    this.#restaurantId = this.#getRestaurantId()
  }

  // Wrapping fetch API, abstraherar bort detaljer
  async fetchReviews() {
    try {
      const res = await fetch(`/review/restaurant/${this.#restaurantId}`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      console.error(err)
    }
  }

  #getRestaurantId() {
    return window.location.pathname.split('/').pop()
  }
}

// Backend, ReviewService.js (delvis boundary)
export class ReviewService {
  async createReview({ username, review, rating, restaurantId }) {
    this.#validateReview(username, review, rating)
    return this.#saveReview(restaurantId, username, review, rating)
  }

  #validateReview(username, review, rating) {
    const reviewModel = new ReviewModel({ username, review, rating })
    reviewModel.validate()
  }

  async #saveReview(restaurantId, username, review, rating) {
    // Mongoose-specifik kod direkt i Service vilket inte är perfekt boundary
    const restaurant = await RestaurantSchema.findById(restaurantId)
    restaurant.reviews.push({ username, review, rating })
    await restaurant.save()
    return restaurant.reviews
  }
}
```

**Reflektion:**  
Jag applicerade "Using Third-Party Code" delvis genom att skapa boundary layers på frontend. I L2 hade jag fetch-anrop spridda överallt, vilket gav tight coupling. I L3 wrappade jag all data fetching i ReviewFetcher, så vill jag byta från fetch till axios behöver jag bara ändra ReviewFetcher, vilket följer "Clean Boundaries". På backend är det inte lika rent - ReviewService innehåller Mongoose-specifik kod (`findById()`, `.save()`), vilket betyder att om jag skulle byta till t.ex. Prisma måste jag ändra i ReviewService. För en perfekt boundary skulle jag behövt ett Repository-lager mellan Service och Mongoose. Dock är det bättre än L2 där jag inte hade någon backend alls, så det är en förbättring men inte perfekt enligt "Exploring and Learning Boundaries".

---

## Kapitel 9: Unit Tests

**Reflektion:**  
Jag använder manuella tester istället för automatiska tester. Jag följer inte "The Three Laws of TDD" då testerna skrevs efter implementation, vilket betyder jag inte fick TDD:s design-fördelar där tester driver kod-strukturen. Dock använder jag mig av "One Assert per Test" då varje testfall i min [Testspecifikation](./docs/Testplan.md) testar en specifik sak. "Clean Tests" och "Readability" försökte jag uppnå genom tydliga testfall-namn och strukturerad tabell-format.

---

## Kapitel 10: Classes

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
// En klass gör allt
customElements.define('review-component',
  class extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      // Publika fält, bryter encapsulation
      this.currentRating = 0
      this.stars = this.shadowRoot.querySelectorAll('.star')
      this.ratingInput = this.shadowRoot.querySelector('#rating')
    }

    // Rating ansvar
    ratingSetup() {}
    setRating(rating) {}
    ratingDisplay(rating) {}

    // Formulär ansvar
    formLogic() {}

    // Fetch ansvar
    displayReviews() {}

    // Render ansvar
    renderReviews(reviews) {}

    // Sort ansvar
    commentFilter(filterOption) {}
    displaySortOptions(reviews) {}
    filterSetup() {}
  }
)
```

**L3:**
```javascript
// Huvudkomponent, delegerar ansvar
class extends HTMLElement {
  #form
  #errorMessage
  #reviewRenderer    // rendering
  #reviewSorter      // sorting
  #reviewFetcher     // fetching
  #reviewRating      // rating

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    // Dependency injection
    this.#reviewRating = new ReviewRating(this.shadowRoot)
    this.#reviewFetcher = new ReviewFetcher(this.shadowRoot)
    this.#reviewRenderer = new ReviewRenderer(this.shadowRoot)
    this.#reviewSorter = new ReviewSorter(this.shadowRoot)
  }

  connectedCallback() {
    this.#reviewRating.ratingSetup()
    this.#displayReviews()
    this.#setupForm()
    this.#reviewSorter.sortSetup()
  }
}

// ReviewRating.js, hantera rating funktionalitet
export class ReviewRating {
  #shadowRoot
  #stars
  #ratingInput
  #currentRating

  ratingSetup() {}
  setRating(rating) {}
  #displayRating(rating) {}
}

// ReviewFetcher.js, fetch reviews från API
export class ReviewFetcher {
  async fetchReviews() {}
}

// ReviewRenderer.js, rendera reviews i DOM
export class ReviewRenderer {
  renderReviews(reviews) {}
  #createReviewContainer(review) {}
  #createUsername(review) {}
  #createReview(review) {}
  #createRating(review) {}
}

// ReviewSorter.js, sortera reviews
export class ReviewSorter {
  sortSetup() {}
  #reviewSorting(sortOption) {}
  displaySortOptions(reviews) {}
  sortReviewsByOption(reviews, sortOption) {}
}
```

**Class Organization följer principen:**
```javascript
export class ReviewRenderer {
  // 1. Privata variablar först
  #shadowRoot

  // 2. Constructor
  constructor(shadowRoot) {
    this.#shadowRoot = shadowRoot
  }

  // 3. Publika metoder
  renderReviews(reviews) {
    const reviewSection = this.#shadowRoot.getElementById('review-section')
    reviewSection.innerHTML = ''
    reviews.forEach(review => {
      reviewSection.appendChild(this.#createReviewContainer(review))
    })
  }

  // 4. Privata hjälpmetoder sist
  #createReviewContainer(review) {}
  #createUsername(review) {}
  #createReview(review) {}
  #createRating(review) {}
}
```

**Reflektion:**  
I L2 skrev jag all kod i en fil, och jag kände själv att det blev svårt att hålla koll på allting när raderna blev fler och fler. Så jag använde mig av "Single Responsibility Principle" och "Classes Should Be Small" genom att bryta upp min ena klass till flera speficierade klasser. Dock har review-component.js fortfarande flera ansvarsområden, vilket betyder jag inte följde SRP perfekt. Jag följer dessutom "Class Organization", genom att sätta privata variablar först, constructor, publika metoder, och privata hjälpmetoder sist. Detta följer "Organizing for Change", och om jag vill ändra hur reviews renderas, ändrar jag bara ReviewRenderer utan att röra andra klasser.

---

## Kapitel 11: Systems

### Jämförelse: L2 (innan) vs L3 (refaktorerad version) 

**L2:**
```javascript
// Frontend är en komponent utan separation
customElements.define('review-component',
  class extends HTMLElement {
    // Allt i en klass:
    // - Rating logic
    // - Form logic
    // - Fetch logic
    // - Render logic
    // - Sort logic
  }
)

// Backend finns inte

```

**L3:**
```
┌─────────────────────────────────────────────┐
│              CLIENT REQUEST                 │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│         ROUTER (router.js)                  │
│  Ansvar: Route requests to controllers      │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│    CONTROLLER (ReviewController.js)         │
│  Ansvar: HTTP layer (req/res handling)      │
│  - Tar emot request                         │
│  - Delegerar till Service                   │
│  - Returnerar response                      │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│      SERVICE (ReviewService.js)             │
│  Ansvar: Business logic layer               │
│  - Koordinerar operations                   │
│  - Använder Model för validering            │
│  - Använder Schema för data access          │
└─────────────────────────────────────────────┘
                     ↓
         ┌───────────────────────┐
         ↓                       ↓
┌─────────────────┐    ┌─────────────────────┐
│ MODEL           │    │ MONGOOSE SCHEMA     │
│ ReviewModel.js  │    │ RestaurantModel.js  │
│ Ansvar:         │    │ Ansvar:             │
│ - Validation    │    │ - Database layer    │
│ - Business rules│    │ - Data persistence  │
└─────────────────┘    └─────────────────────┘
```

**Separation of Concerns:**

**ReviewController.js:**
```javascript
export class ReviewController {
  #reviewService

  // Dependency injection
  constructor() {
    this.#reviewService = new ReviewService()
  }

  // Endast HTTP handling, inga business rules här
  async createReview(req, res) {
    try {
      const newReview = await this.#reviewService.createReview(req.body)
      res.status(201).json({ review: newReview })
    } catch (error) {
      return res.json({ errors: error.errors || [error.message] })
    }
  }
}
```

**ReviewService.js:**
```javascript
export class ReviewService {
  #restaurantSchema

  // Dependency injection
  constructor() {
    this.#restaurantSchema = RestaurantSchema
  }

  // Business logic, koordinerar validering och saving
  async createReview({ username, review, rating, restaurantId }) {
    const reviewModel = new ReviewModel({ username, review, rating })
    reviewModel.validate()  // Använder Model för validation
    
    return this.#saveReview(restaurantId, username, review, rating)
  }

  // Data access isolerad här
  async #saveReview(restaurantId, username, reviewText, rating) {
    const restaurant = await this.#restaurantSchema.findById(restaurantId)
    restaurant.reviews.push({ username, review: reviewText, rating })
    await restaurant.save()
    return restaurant.reviews
  }
}
```

**ReviewModel.js:**
```javascript
export class ReviewModel {
  #username
  #reviewText
  #rating

  constructor({ username, review, rating }) {
    this.#username = username
    this.#reviewText = review
    this.#rating = rating
  }

  // Endast validerings logik
  validate() {
    this.#blackListedWords()
    this.#errors()
  }
}
```

**Reflektion:**  
L2 hade ingen systemarkitektur, allt var ihopblandat i en frontend-komponent vilket blev riktigt svårt att underhålla. I L3 byggde jag en MVC + Service Layer arkitektur där varje lager har sitt eget ansvar: Router för routing, Controller för HTTP, Service för business logic, Model för validering, och Schema för databas. Detta var min tolkning av "Separate Constructing a System from Using It". Jag använder dock inte riktig "Dependency Injection", ReviewController skapar sin egen ReviewService istället för att få den injected, och ReviewService importerar RestaurantSchema direkt. För fullständig DI skulle jag behövt skicka in dependencies via constructor. Error hantering är konsekvent över alla lager med try-catch, vilket är "Cross-Cutting Concerns". Systemet är mer skalbart än L2, men DI-implementationen kunde varit bättre.
