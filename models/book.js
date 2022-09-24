const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name : String,
    layanan : String,
    city : String,
    date: String,
    phone: String,
    knowFrom: String
}, { timestamps : true})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book