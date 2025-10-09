import express from 'express'
import { HomeController } from '../controllers/HomeController.js'

export const router = express.Router()

const controller = new HomeController()

router.get('/', (req, res, next) => controller.MainIndex(req, res, next))
router.get('/restaurant/:id', (req, res, next) => controller.RestaurantPage(req, res, next))