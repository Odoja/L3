import { ReviewFetcher } from './Review-Fetcher.js'
import { ReviewRenderer } from './Review-Renderer.js'
import { ReviewSorter } from './Review-Sorter.js'

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
      <select name="" id="sort-option" class="hidden">
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
   * Represents a review-component element that can be used to create draggable popup windows.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the review-component element.
     */
    constructor() {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.currentRating = 0
      this.stars = this.shadowRoot.querySelectorAll('.star')
      this.ratingInput = this.shadowRoot.querySelector('#rating')
      this.errorMessage = this.shadowRoot.querySelector('#error-message')
      this.reviewRenderer = new ReviewRenderer(this.shadowRoot)
      this.reviewSorter = new ReviewSorter(this.shadowRoot)
      this.reviewFetcher = new ReviewFetcher(this.shadowRoot)
    }

    /**
     * Sets up event listeners when the element is connected to the DOM.
     */
    connectedCallback() {
      this.ratingSetup()
      this.displayReviews()
      this.formLogic()
      this.reviewSorter.sortSetup()
    }

    /**
     * Setups the event listeners for the rating method.
     */
    ratingSetup() {
      this.stars.forEach((star) => {
        star.addEventListener('click', (star) => {
          const rating = star.currentTarget.getAttribute('data-value')
          this.setRating(rating)
        })

        star.addEventListener('mouseenter', (star) => {
          const currentStar = star.currentTarget.getAttribute('data-value')
          this.displayRating(currentStar) // Stars are filled to the star the cursor is on.
        })

        star.addEventListener('mouseleave', () => {
          this.displayRating(this.currentRating) // Stars filled returned to the one that was selected.
        })
      })
    }

    /**
     * Takes the rating obtained from param and gives the input value/the current rating the same.
     *
     * @param {string} rating - data value from stars.
     */
    setRating(rating) {
      this.currentRating = rating
      this.ratingInput.value = rating
      this.displayRating(rating)
    }

    /**
     * Updates the star color depending on the selected amount of stars.
     *
     * @param {string} rating - the amount of stars to be displayed.
     */
    displayRating(rating) {
      this.stars.forEach((star) => {
        const starValue = star.getAttribute('data-value')

        if (starValue <= rating) {
          star.classList.add('filled')
        } else {
          star.classList.remove('filled')
        }
      })
    }

    /**
     * Fetches the reviews from the database and displays them.
     */
    async displayReviews() {
      try {
        const reviews = await this.reviewFetcher.fetchReviews()
        this.reviewSorter.displaySortOptions(reviews)
        this.reviewSorter.sortReviewsByOption(reviews, 'Newest')
        this.reviewRenderer.renderReviews(reviews)
      } catch (err) {
        console.error(err)
      }
    }

    /**
     * Handles form data and sends it to a database through a POST request.
     */
    formLogic() {
      const form = this.shadowRoot.getElementById('review-form')

      form.addEventListener('submit', async (e) => {
        e.preventDefault()
        this.hideError()

        const formData = new FormData(form)

        try {
          const response = await fetch('/review/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: formData.get('username').trim(),
              review: formData.get('review').trim(),
              rating: formData.get('rating'),
              restaurantId: this.reviewFetcher.restaurantId
            })
          })

          if (response.ok) {
            form.reset()
            this.setRating(0)
            this.displayReviews()
          } else {
            const errorData = await response.json()

            if (errorData.errors && errorData.errors.length > 0) {
              this.displayError(errorData.errors.join(', '))
            } else if (errorData.error) {
              this.displayError(errorData.error)
            } else {
              this.displayError('Failed to submit review')
            }
          }
        } catch {
          this.displayError('An error occurred while submitting your review')
        }
      })
    }

    /**
   * Displays error message.
   *
   * @param {string} message - Error message.
   */
    displayError(message) {
      this.errorMessage.textContent = message
      this.errorMessage.classList.remove('hidden')
    }

    /**
     * Hides error message.
     */
    hideError() {
      this.errorMessage.textContent = ''
      this.errorMessage.classList.add('hidden')
    }
  }
)
