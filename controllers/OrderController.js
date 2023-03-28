const mongoose = require('mongoose')
const Order = require('../modules/Order')
const User = require('../modules/User')
// get all

const index = (req, res, next) => {
  if (req.query.page && req.query.limit) {
    Order.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then(response => {
        res.json({
          response
        })
      }).catch(err => {
        res.json({
          message: `can't get all the orders,error :: ${err}`
        })
      })
  } else {
    Order.find()
      .then(response => {
        res.json({
          response
        })
      }).catch(err => {
        res.json({
          message: `can't get all the orders,error :: ${err}`
        })
      })
  }
}
// show by id
const show = (req, res, next) => {
  let orderId = req.body.orderId
  Order.findById(orderId).then(response => {
    res.json({
      response
    })
  }).catch(err => {
    res.json({
      message: 'An Error with Order Controller to get By id'
    })
  })
}

const getOrdersByUserId = (req, res, next) => {
  const userId = req.query.userId;

  // Find the user by _id
  User.findById(userId)
    .then(user => {
      if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
      }

      // Find all the orders where user_Id matches the user's _id
      Order.find({ user_Id: user._id })
        .then(orders => {
          res.json({ orders });
        })
        .catch(err => {
          res.status(500).json({ message: 'Error getting orders', error: err });
        });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting user', error: err });
    });
};

// add or send the order
const store = (req, res, next) => {
  let order = new Order({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
    user_Id: req.body.user_Id
  })
  order.save().then(response => {
    res.json({
      message: 'order has beed sent!'
    })
  }).catch(err => {
    res.json({
      message: 'error with send a message/order'
    })
  })
}


module.exports = {
  index,
  show,
  store,
  getOrdersByUserId
}