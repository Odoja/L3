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
   */
  validate() {
    this.#blackList()
    this.#errors()
    
  }

  #blackList() {

  }
  
  /**
   * Checks for errors and throws if any found.
   */
  #errors() {
    // Single error
    if (this.#username.length === 0) {
      throw new Error('Username is required')
    }

    if (this.#username && this.#username.length > 40) {
      throw new Error('Username cannot be longer than 40 characters')
    }

    if (this.#reviewText.length === 0) {
      throw new Error('Review text is required')
    }

    if (this.#reviewText && this.#reviewText.length > 200) {
      throw new Error('Review cannot be longer than 200 characters')
    }

    if (!this.#rating || this.#rating < 1 || this.#rating > 5) {
      throw new Error('A rating between 1 and 5 is required')
    }

    // Multiple errors
    if (this.#username.length === 0 && this.#reviewText.length === 0 && (!this.#rating || this.#rating < 1 || this.#rating > 5)) {
      throw new Error('All fields are required')
    }

    if (this.#username.length === 0 && this.#reviewText.length === 0) {
      throw new Error('Username and review text are required')
    }

    if (this.#username.length === 0 && (!this.#rating || this.#rating < 1 || this.#rating > 5)) {
      throw new Error('Username and rating are required')
    }

    if (this.#reviewText.length === 0 && (!this.#rating || this.#rating < 1 || this.#rating > 5)) {
      throw new Error('Review text and rating are required')
    }
  }
}
