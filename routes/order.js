const express = require('express')
const router = express.Router()

const OrderController = require('../controllers/OrderController')

router.get('/', OrderController.index)
router.get('/show', OrderController.show)
router.post('/store', OrderController.store)


module.exports = router