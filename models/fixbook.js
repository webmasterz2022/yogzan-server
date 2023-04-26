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
  duration: String,
  linkphoto: String,
  rawphoto: String,
  stored: String,
  follow: Boolean,
  fg: String,
  post: String,
  story: String,
  feed: String,
  reel: String,
  testimony: String,
  notes: String,
  cashin: String,
  cashinNote: String,
  cashout: String,
  cashoutNote: String
}, { timestamps : true})

const FixBook = mongoose.model('FixBook', fixbookSchema)

module.exports = FixBook