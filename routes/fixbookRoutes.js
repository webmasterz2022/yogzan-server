const router = require('express').Router()
const FixBookController = require('../controllers/fixbookController')

router.post('/submit', FixBookController.submit)

router.get('/', FixBookController.findAll)

module.exports = router