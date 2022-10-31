const router = require('express').Router()
const userRoutes = require('./userRoutes')
const galleryRoutes = require('./galleryRoutes')
const hiringRoutes = require('./hiringRoutes')
const bookRoutes = require('./bookRoutes')
const fixbookRoutes = require('./fixbookRoutes')
const orderRoutes = require('./orderRoutes')
const categoryRoutes = require('./categoryRoutes')
const testimonyRoutes = require('./testimonyRoutes')

router.use('/users', userRoutes)
router.use('/gallery', galleryRoutes)
router.use('/hiring', hiringRoutes)
router.use('/book', bookRoutes)
router.use('/fixbook', fixbookRoutes)
router.use('/order', orderRoutes)
router.use('/category', categoryRoutes)
router.use('/testimony', testimonyRoutes)


module.exports = router