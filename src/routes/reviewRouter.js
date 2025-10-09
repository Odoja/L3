import express from 'express'
import { ReviewController } from '../controllers/ReviewController.js'

export const router = express.Router()

const controller = new ReviewController()


// Map HTTP verbs and route paths to controller action methods.
router.get('/restaurant/:id', (req, res, next) => controller.restaurantReviews(req, res, next))

router.post('/create', (req, res, next) => controller.createPost(req, res, next))
