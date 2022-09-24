const router = require('express').Router()
const HiringController = require('../controllers/hiringController')

router.post('/submit', HiringController.submit)

router.get('/', HiringController.findAll)

module.exports = router