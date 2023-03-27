const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  message: {
    type: String
  }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order