/**
 * Review model class with logic for reviews.
 */
export class ReviewModel {
  #username
  #reviewText
  #rating

  /**
   * Creates a Review instance.
   *
   * @param {string} username - Username of reviewer.
   * @param {string} review - Review text.
   * @param {number} rating - Rating.
   */
  constructor({ username, review, rating }) {
    this.#username = username
    this.#reviewText = review
    this.#rating = rating
  }

  /**
   * Validates the review data.
   *
   * @returns {object} Validation result { isValid: boolean, errors: string[] }.
   */
  validate() {
    const errors = []

    if (this.#username.length === 0) {
      errors.push('Username is required')
    }

    if (this.#username && this.#username.length > 40) {
      errors.push('Username cannot be longer than 40 characters')
    }

    if (this.#reviewText.length === 0) {
      errors.push('Review text is required')
    }

    if (this.#reviewText && this.#reviewText.length > 200) {
      errors.push('Review cannot be longer than 200 characters')
    }

    if (!this.#rating || this.#rating < 1 || this.#rating > 5) {
      errors.push('Select a rating between 1 and 5')
    }

    return errors
  }
}
