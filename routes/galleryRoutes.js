const router = require('express').Router()
const multer = require('multer');
const GalleryController = require('../controllers/galleryController')
const { authentication } = require('../middlewares')
const { getStorage } = require('../services/cloudinary');

const maxSize = 2*1024*1024; //2 MB

const storage = getStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: maxSize }
});
router.post('/upload', authentication, upload.single('images'), GalleryController.upload)

router.get('/', GalleryController.findAll)
router.get('/:category', GalleryController.findCategory)

module.exports = router