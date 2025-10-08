import express from 'express'
import { ReviewController } from '../controllers/ReviewController.js'

export const router = express.Router()

const controller = new ReviewController()

// Provide req.doc to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadPostDocument(req, res, next, id))

// Map HTTP verbs and route paths to controller action methods.
router.get('/all', (req, res, next) => controller.index(req, res, next))
router.post('/create', (req, res, next) => controller.createPost(req, res, next))
