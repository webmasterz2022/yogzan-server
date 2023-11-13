const router = require('express').Router()
const BookController = require('../controllers/bookController')

router.post('/submit', BookController.submit)
router.put('/:id', BookController.updateData)

router.get('/', BookController.findAll)

module.exports = router