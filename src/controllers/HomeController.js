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
  async MainIndex (req, res, next) {
    try {
      const restaurantData = (await RestaurantSchema.find())
        .map(restaurant => restaurant.toObject())

      // console.log(restaurantData)

      res.render('Huvudsida/index', { restaurantData })
    } catch (error) {
      next(error)
    }
  }

  async RestaurantPage (req, res, next) {
    try {
      const restaurantId = req.params.id
      const restaurantData = await RestaurantSchema.findById(restaurantId)

      // console.log(restaurantData)

      res.render('Restaurangsida/index', { restaurantData })
    } catch (error) {
      next(error)
    }
  }
}
