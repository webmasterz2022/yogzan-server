const router = require('express').Router()
const userRoutes = require('./userRoutes')
const galleryRoutes = require('./galleryRoutes')
const hiringRoutes = require('./hiringRoutes')
const bookRoutes = require('./bookRoutes')

router.use('/users', userRoutes)
router.use('/gallery', galleryRoutes)
router.use('/hiring', hiringRoutes)
router.use('/book', bookRoutes)

module.exports = router