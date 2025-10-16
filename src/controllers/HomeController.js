import { RestaurantSchema } from '../models/schemas/RestaurantSchema.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a specific view and sends the rendered HTML as a response.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async MainIndex(req, res, next) {
    try {
      const restaurantData = (await RestaurantSchema.find())
        .map(restaurant => restaurant.toObject())

      res.render('Huvudsida/index', { restaurantData })
    } catch (error) {
      next(error)
    }
  }

  async RestaurantPage(req, res, next) {
    try {
      const restaurantData = await RestaurantSchema.findById(req.params.id)

      res.render('Restaurangsida/index', { restaurantData })
    } catch (error) {
      error.status = 404
      next(error)
    }
  }
}
