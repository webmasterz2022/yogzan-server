const mongoose = require('mongoose')

const testimonySchema = mongoose.Schema({
    name : String,
    image : String,
    link: String,
    desc: String
}, { timestamps : true})

const Testimony = mongoose.model('Testimony', testimonySchema)

module.exports = Testimony