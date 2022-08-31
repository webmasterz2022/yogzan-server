const router = require('express').Router()
const UserController = require('../controllers/userController')
const { authentication } = require('../middlewares')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/', authentication, UserController.findAll)
router.get('/:id', authentication, UserController.findOne)

module.exports = router