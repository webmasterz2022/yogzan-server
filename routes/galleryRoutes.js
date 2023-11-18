const router = require('express').Router()
const multer = require('multer');
const GalleryController = require('../controllers/galleryController')
const { authentication } = require('../middlewares')
const { getStorage } = require('../services/cloudinary');
const { s3 } = require('../services/bucket');
const multerS3 = require('multer-s3');
const maxSize = 2*1024*1024; //2 MB

const storage = type => getStorage(type);
const upload_old = (type, fieldName) => multer({ 
  storage: storage(type),
  limits: { fileSize: maxSize }
}).single(fieldName)

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

router.post('/upload', authentication, upload('Gallery', 'images'), GalleryController.upload)
router.post('/upload-homepage', authentication, upload('Homepage', 'images'), GalleryController.uploadHomepage)

router.get('/homepage', GalleryController.findHomepage)
router.get('/', GalleryController.findAll)
router.get('/category/:category', GalleryController.findCategory)
router.get('/list-city', GalleryController.findCities)

router.delete('/:id', authentication, GalleryController.delete)
router.put('/:id', authentication, upload('Gallery', 'images'), GalleryController.update)

module.exports = router