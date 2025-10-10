/**
 * A class to render reviews.
 */
export class ReviewFetcher {
  /**
   * Creates an instance of Review.
   *
   * @param {*} shadowRoot - the shadow root of the review-component.
   */
  constructor(shadowRoot) {
    this.shadowRoot = shadowRoot
    this.restaurantId = this.getRestaurantId()
  }

  getRestaurantId() {
    return window.location.pathname.split('/').pop()
  }

  /**
 * Fetches reviws from the databas.
 *
 * @returns {Promise<Array>} - Array of review objects.
 */
  async fetchReviews() {
    try {
      const res = await fetch(`/review/restaurant/${this.restaurantId}`) // fill in your own fetch route
      console.log(res)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      return await res.json()
    } catch (err) {
      console.error(err)
    }
  }
}
