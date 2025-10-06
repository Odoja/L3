import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
export const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 40
  },
  review: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
})

reviewSchema.add(BASE_SCHEMA)

// Create a model using the schema.
export const ReviewModel = mongoose.model('Post', reviewSchema)
