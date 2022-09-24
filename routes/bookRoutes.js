const router = require('express').Router()
const BookController = require('../controllers/bookController')

router.post('/submit', BookController.submit)

router.get('/', BookController.findAll)

module.exports = router