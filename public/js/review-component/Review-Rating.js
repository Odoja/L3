export class ReviewRating {
  #shadowRoot
  #stars
  #ratingInput
  #currentRating

  /**
   * Creates an instance of ReviewRating.
   *
   * @param {ShadowRoot} shadowRoot - The shadow root containing the rating elements.
   */
  constructor(shadowRoot) {
    this.#shadowRoot = shadowRoot
    this.#stars = shadowRoot.querySelectorAll('.star')
    this.#ratingInput = shadowRoot.querySelector('#rating')
    this.#currentRating = 0
  }

  /**
   * Gets the current rating value.
   *
   * @returns {number} - The current rating.
   */
  get currentRating() {
    return this.#currentRating
  }

  /**
   * Sets up the event listeners for the rating system.
   */
  ratingSetup() {
    this.#stars.forEach((star) => {
      star.addEventListener('click', (event) => {
        const rating = event.currentTarget.getAttribute('data-value')
        this.setRating(rating)
      })

      star.addEventListener('mouseenter', (event) => {
        const currentStar = event.currentTarget.getAttribute('data-value')
        this.#displayRating(currentStar)
      })

      star.addEventListener('mouseleave', () => {
        this.#displayRating(this.#currentRating)
      })
    })
  }

  /**
   * Sets the rating value and updates the display.
   */
  setRating(rating) {
    this.#currentRating = rating
    this.#ratingInput.value = rating
    this.#displayRating(rating)
  }

  /**
   * Updates the star color depending on the selected amount of stars.
   */
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