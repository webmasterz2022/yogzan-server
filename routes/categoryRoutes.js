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
  console.log(req.body, 'custom middleware')
  if(req.body.images) {
    upload('Category', 'images')
  } else {
    next()
  }
}

router.post('/update/:id', customMiddleware, CategoryController.update)
router.post('/', authentication, upload('Category', 'images'), CategoryController.create)

router.get('/homepage', CategoryController.findHomepage)
router.get('/gallery', CategoryController.findGallery)
router.get('/', CategoryController.findAll)

router.delete('/:id', CategoryController.delete)

module.exports = router