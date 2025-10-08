import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as reviewRouter } from './reviewRouter.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/review', reviewRouter)
