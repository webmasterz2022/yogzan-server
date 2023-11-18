const router = require('express').Router()
const multer = require('multer');
const TestimonyController = require('../controllers/testimonyController')
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

router.get('/', TestimonyController.findAll)

router.post('/', authentication, upload('Category', 'images'), TestimonyController.create)
router.put('/:id', authentication, upload('Category', 'images'), TestimonyController.update)
router.delete('/:id', authentication, TestimonyController.delete)

module.exports = router