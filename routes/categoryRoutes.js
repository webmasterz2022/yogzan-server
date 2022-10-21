const router = require('express').Router()
const multer = require('multer');
const CategoryController = require('../controllers/categoryController')
const { authentication } = require('../middlewares')
const { getStorage } = require('../services/cloudinary');

const maxSize = 2*1024*1024; //2 MB

const storage = type => getStorage(type);
const upload = (type, fieldName) => multer({ 
  storage: storage(type),
  limits: { fileSize: maxSize }
}).single(fieldName)

const customMiddleware = (req, res, next) => {
  if(req.body.images) {
    upload('Category', 'images')
  } else {
    next()
  }
}

router.post('/', authentication, customMiddleware, CategoryController.create)
// router.post('/', authentication, upload('Category', 'images'), CategoryController.create)

router.get('/homepage', CategoryController.findHomepage)
router.get('/gallery', CategoryController.findGallery)
router.get('/', CategoryController.findAll)

router.delete('/:id', CategoryController.delete)
router.put('/:id', CategoryController.update)

module.exports = router