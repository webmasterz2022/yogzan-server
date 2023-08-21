const router = require('express').Router()
const HiringController = require('../controllers/hiringController')

router.post('/submit', HiringController.submit)
router.put('/:id', HiringController.updateData)

router.get('/', HiringController.findAll)

module.exports = router