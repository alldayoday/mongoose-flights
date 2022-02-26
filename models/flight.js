import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema
	
const flightSchema = new Schema({
  airline:{
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  airport: {
    type: String,
    enum: ["DFW", "DEN", "LAX", "SAN"]
  },
  departs:  {
    type: Date,
}})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}