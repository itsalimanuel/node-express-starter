const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fName: {
    type: String,
  },
  lName: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User