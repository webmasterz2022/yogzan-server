const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name : String,
    image : String,
    displayOnHomepage: Boolean,
    displayOnGallery: Boolean,
    image: String
}, { timestamps : true})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category