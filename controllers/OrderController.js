const Order = require('../modules/Order')

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

// add or send the order
const store = (req, res, next) => {
  let order = new Order({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  })
  order.svae().then(response => {
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
  store
}