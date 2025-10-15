import { RestaurantSchema } from '../models/schemas/RestaurantSchema.js'
import { ReviewModel } from '../models/ReviewModel.js'

/**
 * Encapsulates a controller.
 */
export class ReviewController {

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
      // console.log('ID:' + restaurantId)

      const restaurant = await RestaurantSchema.findById(
        restaurantId,
        { reviews: 1 }
      )

      //console.log(restaurant)
      res.json(restaurant.reviews)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async createReview(req, res) {
    try {
      const { username, review, rating, restaurantId } = req.body

      //console.log('Received data:', { username, review, rating, restaurantId })

      const reviewModel = new ReviewModel({ username, review, rating })

      const errors = reviewModel.validate()
      if (errors.length > 0) {
        return res.status(400).json({ errors })
      }

      const restaurant = await RestaurantSchema.findById(restaurantId)
      restaurant.reviews.push({
        username,
        review,
        rating
      })
      await restaurant.save()

      // Send back the newly created review
      const newReview = restaurant.reviews[restaurant.reviews.length - 1]

      res.status(201).json({
        success: true,
        message: '',
        review: newReview
      })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}
