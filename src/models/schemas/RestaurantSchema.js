import mongoose from 'mongoose'
import { BASE_SCHEMA } from './BaseSchema.js'
import { reviewSchema } from './ReviewSchema.js'

// Restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema]
})

restaurantSchema.add(BASE_SCHEMA)


// Virtual för snittbetyg, Inte min kod så ska kanske bort!
restaurantSchema.virtual('averageRating').get(function () {
  if (this.reviews.length === 0) {
    return 0
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / this.reviews.length).toFixed(1)
  }
})

export const RestaurantSchema = mongoose.model('Restaurants', restaurantSchema)
