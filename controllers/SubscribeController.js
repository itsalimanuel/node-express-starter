const Subscribe = require("../modules/Subscribe");
const { subscribe } = require("../routes/order");

const index = (req, res, next) => {
  if (req.query.page && req.query.limit) {
    Subscribe.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((err) => {
        res.json({
          message: `can't get the list, error :: ${err}`,
        });
      });
  } else {
    Subscribe.find()
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((err) => {
        res.json({
          message: `can't get all ${err}`,
        });
      });
  }
};
const store = (req, res, next) => {
  let subscribe = new Subscribe({
    email: req.body.email,
  })
  subscribe.save().then(response => {
    res.json({
      message: 'email has beed sent!'
    })
  }).catch(err => {
    res.json({
      message: 'error with send a message/order'
    })
  })
}

module.exports = {
  index,
  store,
};
