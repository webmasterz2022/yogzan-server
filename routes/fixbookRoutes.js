const router = require('express').Router()
const FixBookController = require('../controllers/fixbookController')
const { authentication } = require('../middlewares')

router.post('/submit', FixBookController.submit)

router.get('/', FixBookController.findAll)

router.put('/:id', authentication, FixBookController.update)

module.exports = router