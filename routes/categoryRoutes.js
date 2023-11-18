const router = require('express').Router()
const multer = require('multer');
const CategoryController = require('../controllers/categoryController')
const { authentication } = require('../middlewares')
const { getStorage } = require('../services/cloudinary');
const { s3 } = require('../services/bucket');
const multerS3 = require('multer-s3');

const maxSize = 2*1024*1024; //2 MB

const storage = type => getStorage(type);

// result req.file.path
const upload_old = (type, fieldName) => multer({ 
  storage: storage(type),
  limits: { fileSize: maxSize }
}).single(fieldName)

// result req.file.location
const upload = (type, fieldName) => multer({
  storage: multerS3({
    s3: s3,
    bucket: 'yogzan-dev',
    acl: 'public-read', // Set the ACL (Access Control List) as needed'
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      // Set the key (file name) in the S3 bucket
      cb(null, `${process.env.NODE_ENV}/${type}/${file.originalname+'_'+Date.now()}`);
    },
  }),
  limits: { fileSize: maxSize }
}).single(fieldName);

const customMiddleware = (req, res, next) => {
  console.log(req.body, 'custom middleware')
  if(req.body.images) {
    upload('Category', 'images')
  } else {
    next()
  }
}

router.put('/update/:id', upload('Category', 'images'), CategoryController.update)
router.post('/', authentication, upload('Category', 'images'), CategoryController.create)

router.get('/homepage', CategoryController.findHomepage)
router.get('/gallery', CategoryController.findGallery)
router.get('/', CategoryController.findAll)

router.delete('/:id', CategoryController.delete)

module.exports = router