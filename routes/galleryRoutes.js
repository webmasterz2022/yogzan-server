const router = require('express').Router()
const GalleryController = require('../controllers/galleryController')
const { authorization } = require('../middlewares')

router.post('/upload', GalleryController.upload)

router.get('/', GalleryController.findAll)
router.get('/:type', GalleryController.findType)

module.exports = router