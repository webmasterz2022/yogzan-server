const mongoose = require('mongoose')

const fixbookSchema = mongoose.Schema({
  fullname: String,
  nickname: String,
  layanan: String,
  campus: String,
  faculty: String,
  ig: String,
  "ig-mua": String,
  "ig-attire": String,
  date: String,
  time: String,
  phone: String,
  location: String,
  photographer: String,
  package: String,
  linkphoto: String,
  stored: String,
  notes: String
}, { timestamps : true})

const FixBook = mongoose.model('FixBook', fixbookSchema)

module.exports = FixBook