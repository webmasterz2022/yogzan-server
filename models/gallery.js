const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
    name : String,
    url : String,
    category : String,
    city: String,
    horizontal: Boolean,
    vertical: Boolean,
    description: String,
    isHomepage: Boolean
}, { timestamps : true})

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery