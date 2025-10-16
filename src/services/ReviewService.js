import { RestaurantSchema } from '../models/schemas/RestaurantSchema.js'
import { ReviewModel } from '../models/ReviewModel.js'

/**
 * Review service class for managing reviews.
 */
export class ReviewService {
  /**
   * Creates and saves a new review.
   *
   * @param {string} username - Username.
   * @param {string} review - Review text.
   * @param {number} rating - Rating.
   * @param {string} restaurantId - Restaurant ID.
   * @returns {object} The newly created review.
   */
  async createReview({ username, review, rating, restaurantId }) {
    
    this.#validateReview(username, review, rating)

    return this.#saveReview(restaurantId, username, review, rating)
  }

  /**
   * Validates review data.
   *
   * @param {string} username - Username.
   * @param {string} review - Review text.
   * @param {number} rating - Rating.
   */
  #validateReview(username, review, rating) {
    const reviewModel = new ReviewModel({ username, review, rating })
    reviewModel.validate()
  }

  /**
   * Finds a restaurant by its ID and saves review to restaurant.
   *
   * @param {string} restaurantId - Restaurant ID.
   * @param {string} username - Username.
   * @param {string} review - Review text.
   * @param {number} rating - Rating.
   * @returns {object} The newly created review.
   */
  async #saveReview(restaurantId, username, review, rating) {
    const restaurant = await RestaurantSchema.findById(restaurantId)

    restaurant.reviews.push({
      username,
      review,
      rating
    })

    await restaurant.save()

    return restaurant.reviews
  }
}