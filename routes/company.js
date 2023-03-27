const express = require('express')
const router = express.Router()

const CompanyController = require('../controllers/CompanyController')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate, CompanyController.index)
router.get('/show', CompanyController.show)
router.post('/store', upload.single('logo'), CompanyController.store)
router.put('/update', CompanyController.update)
router.delete('/delete', CompanyController.distroy)


module.exports = router