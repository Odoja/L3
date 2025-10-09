import { ReviewModel } from '../models/ReviewModel.js'
import { RestaurantModel } from '../models/RestaurantModel.js'

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

      const restaurant = await RestaurantModel.findById(
        restaurantId,
        { reviews: 1 }
      )

      console.log(restaurant)
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
  async createPost (req, res) {
    try {
      const { username, review, rating } = req.body

      console.log('Received data:', { username, review, rating })

      const newReview = await ReviewModel.create({
        username,
        review,
        rating
      })

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
