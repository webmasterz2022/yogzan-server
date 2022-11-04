const router = require('express').Router()
const FixBookController = require('../controllers/fixbookController')

router.post('/submit', FixBookController.submit)

router.get('/', FixBookController.findAll)

router.put('/:id', FixBookController.update)

module.exports = router