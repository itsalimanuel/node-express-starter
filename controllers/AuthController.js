const User = require('../modules/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// index
const index = (req, res, next) => {
  User.find()
    .then(response => {
      res.json({
        response
      })
    }).catch(err => {
      res.json({
        message: `can't get all() of users list with error ${err}`
      })
    })
}
// register
const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err
      })
    }
    let user = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: hashedPass
    })
    user.save().then(user => {
      res.json({
        message: 'user has beed added succssefully!'
      })
    }).catch(err => {
      res.json({
        message: 'error with add user'
      })
    })
  })
}
// login
const login = (req, res, next) => {
  let username = req.body.username
  let password = req.body.password

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(user => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err
          })
        }
        if (result) {
          let token = jwt.sign({ name: user.fName }, 'AzQ,PI)0(', { expiresIn: '1d' })
          res.json({
            message: 'Login Successful!',
            token: token
          })
        } else {
          res.json({
            message: 'Password not matched!'
          })
        }
      })
    } else {
      res.json({
        message: 'User not found!'
      })
    }
  })
}

module.exports = {
  register,
  login,
  index
}