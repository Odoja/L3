import { ReviewFetcher } from './Review-Fetcher.js'
import { ReviewRenderer } from './Review-Renderer.js'
import { ReviewSorter } from './Review-Sorter.js'
import { ReviewRating } from './Review-Rating.js'

const template = document.createElement('template')
template.innerHTML = `
  <link rel="stylesheet" href="./css/review-component.css">
  <div class="container">
    <h1>Reviews</h1>
    <form id="review-form">
      <div id="top-section">
        <input type="text" id="username" name="username" placeholder="Name">
        <textarea name="review" placeholder="Write you're review here"></textarea>
      </div>
      <div id="bottom-section">
        <div class="star-rating">
          <span>Rating:</span>
          <input type="hidden" name="rating" id="rating" value="">
          <svg class="star" data-value="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <button type="submit" id="review-btn">Send</button>
      </div>
      <div id="error-message" class="error-message hidden"></div>
    </form>
    <div id="review-wrapper"> 
      <select name="" id="sort-option" class="hide-select">
        <option value="Newest" selected>Newest Reviews</option>
        <option value="Oldest">Oldest Reviews</option>
        <option value="Top-rated">Highest Rating</option>
        <option value="Lowest-rated">Lowest Rating</option>
      </select>
      <div id="review-section">
      </div> 
    </div>
  </div>
`
customElements.define('review-component',
  /**
   * Represents a review-component element.
   */
  class extends HTMLElement {
    #form
    #errorMessage
    #reviewRenderer
    #reviewSorter
    #reviewFetcher
    #reviewRating

    /**
     * Creates an instance of the review-component element.
     */
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.#form = this.shadowRoot.getElementById('review-form')
      this.#errorMessage = this.shadowRoot.querySelector('#error-message')
      this.#reviewRenderer = new ReviewRenderer(this.shadowRoot)
      this.#reviewSorter = new ReviewSorter(this.shadowRoot)
      this.#reviewFetcher = new ReviewFetcher(this.shadowRoot)
      this.#reviewRating = new ReviewRating(this.shadowRoot)
    }

    connectedCallback() {
      this.#reviewRating.ratingSetup()
      this.#displayReviews()
      this.#setupForm()
      this.#reviewSorter.sortSetup()
    }

    /**
     * Fetches the reviews from the database and displays them.
     */
    async #displayReviews() {
      try {
        const reviews = await this.#reviewFetcher.fetchReviews()
        this.#reviewSorter.displaySortOptions(reviews)
        this.#reviewSorter.sortReviewsByOption(reviews, 'Newest')
        this.#reviewRenderer.renderReviews(reviews)
      } catch (err) {
        console.error(err)
      }
    }

    // Form Methods

    /**
     * Sets up the form submission logic.
     */
    #setupForm() {
      this.#form.addEventListener('submit', async (e) => {
        e.preventDefault()
        this.#hideError()

        const formData = new FormData(this.#form)
        try {
          await this.#submitReview(formData)
        } catch (error) {
          this.#displayError(error.message)
        }
      })
    }

    /**
     * Submits the review form data to the server.
     *
     * @param {FormData} formData - The form data to submit.
     */
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
        throw new Error(this.#renderErrorMessage(errorData))
      } else {
        this.#form.reset()
        this.#reviewRating.setRating(0)
        this.#displayReviews()
      }
    }

    // Error Methods

    /**
     * Renders the error message.
     *
     * @param {object} errorData - Error data from server.
     * @returns - A string with the error message.
     */
    #renderErrorMessage(errorData) {
      if (errorData.errors && errorData.errors.length > 0) {
        return errorData.errors.join(', ')
      } else if (errorData.error) {
        return errorData.error
      } else {
        return 'Failed to submit review'
      }
    }

    #displayError(message) {
      this.#errorMessage.textContent = message
      this.#errorMessage.classList.remove('hidden')
    }

    #hideError() {
      this.#errorMessage.textContent = ''
      this.#errorMessage.classList.add('hidden')
    }
  }
)



