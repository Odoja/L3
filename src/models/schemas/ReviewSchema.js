import mongoose from 'mongoose'
import { BASE_SCHEMA } from './BaseSchema.js'

// Create a schema.
export const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  review: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

reviewSchema.add(BASE_SCHEMA)
