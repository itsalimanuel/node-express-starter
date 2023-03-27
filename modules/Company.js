const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongoosePaginate = require('mongoose-paginate-v2')
const companySchema = new Schema({
  name: {
    type: String
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  phone: {
    type: Number
  },
  logo: {
    type: String
  },
  email: {
    type: String
  }
}, { timestamps: true })

companySchema.plugin(mongoosePaginate)
const Company = mongoose.model('Company', companySchema)
module.exports = Company