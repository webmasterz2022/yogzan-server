const router = require('express').Router()
const userRoutes = require('./userRoutes')
const galleryRoutes = require('./galleryRoutes')
const hiringRoutes = require('./hiringRoutes')
const bookRoutes = require('./bookRoutes')
const orderRoutes = require('./orderRoutes')
const categoryRoutes = require('./categoryRoutes')

router.use('/users', userRoutes)
router.use('/gallery', galleryRoutes)
router.use('/hiring', hiringRoutes)
router.use('/book', bookRoutes)
router.use('/order', orderRoutes)
router.use('/category', categoryRoutes)


module.exports = router