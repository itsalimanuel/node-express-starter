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
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order