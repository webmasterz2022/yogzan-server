const router = require('express').Router()
const FixBookController = require('../controllers/fixbookController')
const { authentication } = require('../middlewares')

router.post('/submit', FixBookController.submit)
router.post('/check-path', FixBookController.checkClientPath)
router.post('/photo-result', FixBookController.photoLink)
router.put('/:id', FixBookController.updateData)

router.get('/', FixBookController.findAll)


module.exports = router