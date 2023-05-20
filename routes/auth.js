const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

router.get('/', AuthController.index)
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/check', AuthController.checkUserExistsByEmail)
router.get('/userInfo', AuthController.getUserByEmail)
router.post('/logout', AuthController.logout)
router.put('/update/:id', AuthController.updateUser)

module.exports = router