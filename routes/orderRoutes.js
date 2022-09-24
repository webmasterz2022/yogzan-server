const router = require('express').Router()
const OrderController = require('../controllers/orderController')

router.post('/booking', OrderController.booking)

router.get('/', OrderController.findAll)

module.exports = router