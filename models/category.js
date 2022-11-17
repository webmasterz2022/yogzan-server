const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name : String,
    image : String,
    displayOnHomepage: Boolean,
    displayOnGallery: Boolean,
    image: String,
    redirectLink: String,
    cities: [{
      name: String,
      file: String
    }]
}, { timestamps : true})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category