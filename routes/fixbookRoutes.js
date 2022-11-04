const router = require('express').Router()
const FixBookController = require('../controllers/fixbookController')
const { authentication } = require('../middlewares')

router.post('/submit', FixBookController.submit)
router.put('/:id', authentication, FixBookController.update)

router.get('/', FixBookController.findAll)


module.exports = router