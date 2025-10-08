import { ReviewModel } from '../models/ReviewModel.js'

/**
 * Encapsulates a controller.
 */
export class ReviewController {
  /**
   * Provide req.doc to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the post to load.
   */
  async loadPostDocument (req, res, next, id) {
    try {
      // Get the post document.
      const postDoc = await ReviewModel.findById(id)

      // If the post document is not found, throw an error.
      if (!postDoc) {
        const error = new Error('The post you requested does not exist.')
        error.status = 404
        throw error
      }

      // Provide the post document to req.
      req.doc = postDoc

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Displays a list of all posts.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const posts = await ReviewModel.find().sort({ createdAt: -1 })
      res.json(posts)
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
