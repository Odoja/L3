import { ReviewService } from '../services/ReviewService.js'
import { RestaurantSchema } from '../models/schemas/RestaurantSchema.js'
/**
 * Encapsulates a controller.
 */
export class ReviewController {
  #reviewService = new ReviewService()

  /**
   * Displays reviews for a specific restaurant.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async restaurantReviews(req, res, next) {
    try {
      const restaurantId = req.params.id

      const restaurant = await RestaurantSchema.findById(
        restaurantId,
        { reviews: 1 }
      )

      res.json(restaurant.reviews)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new review.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createReview(req, res) {
    try {
      const newReview = await this.#reviewService.createReview(req.body)
      res.status(201).json({ review: newReview })
    } catch (error) {
      res.status(400).json({ errors: error.errors || [error.message] })
    }
  }
}
