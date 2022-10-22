const router = require('express').Router()
const multer = require('multer');
const TestimonyController = require('../controllers/testimonyController')
const { authentication } = require('../middlewares')
const { getStorage } = require('../services/cloudinary');

const maxSize = 2*1024*1024; //2 MB

const storage = type => getStorage(type);
const upload = (type, fieldName) => multer({ 
  storage: storage(type),
  limits: { fileSize: maxSize }
}).single(fieldName)

router.get('/', TestimonyController.findAll)

router.post('/', authentication, upload('Category', 'images'), TestimonyController.create)
router.put('/:id', authentication, upload('Category', 'images'), TestimonyController.update)
router.delete('/:id', authentication, TestimonyController.delete)

module.exports = router