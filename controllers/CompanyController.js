const Company = require('../modules/Company')


// get all
const index = (req, res, next) => {
  if (req.query.page && req.query.limit) {
    Company.paginate({}, { page: req.query.page, limit: req.query.limit })
      .then(response => {
        res.json({
          response
        })
      }).catch(err => {
        res.json({
          message: `can't get all() of company list with error ${err}`
        })
      })
  } else {
    Company.find()
      .then(response => {
        res.json({
          response
        })
      }).catch(err => {
        res.json({
          message: `can't get all() of company list with error ${err}`
        })
      })
  }

}

// getById
const show = (req, res, next) => {
  let companyId = req.body.companyId
  Company.findById(companyId).then(response => {
    res.json({
      response
    })
  }).catch(err => {
    res.json({
      message: 'An Error with  Company Controller Id not exist!'
    })
  })
}

//add company
const store = (req, res, next) => {
  let company = new Company({
    name: req.body.name,
    location: req.body.location,
    website: req.body.website,
    phone: req.body.phone,
    email: req.body.email
  })
  if (req.file) {
    company.logo = req.file.path
  }
  company.save().then(response => {
    res.json({
      message: 'company add'
    })
  }).catch(err => {
    res.json({
      message: 'faild add new company'
    })
  })
}

// update company
const update = (req, res, next) => {
  let companyId = req.body.companyId
  let updateCompanyData = {
    name: req.body.name,
    location: req.body.location,
    website: req.body.website,
    phone: req.body.phone,
    email: req.body.email
  }
  Company.findByIdAndUpdate(companyId, { $set: updateCompanyData }).then(response => {
    res.json({
      message: 'company data updated!'
    })
  }).catch(err => {
    res.json({
      message: 'faild update company data!'
    })
  })
}

// delete company
const distroy = (req, res, next) => {
  let companyId = req.body.companyId
  Company.findByIdAndRemove(companyId).then(() => {
    res.json({
      message: 'Company has been deleted!'
    })
  }).catch(err => {
    res.json({
      message: 'Error with Company Remove function'
    })
  })
}


module.exports = {
  index,
  show,
  store,
  update,
  distroy
}