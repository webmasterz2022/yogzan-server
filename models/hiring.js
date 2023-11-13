const mongoose = require('mongoose')

const hiringSchema = mongoose.Schema({
    fullname: String,
    nickname: String,
    birthDate: String,
    email: String,
    phone: String,
    address: String,
    photoshoot: String,
    experience: String,
    camera: String,
    lens: String,
    accessories: String,
    workingHour: String,
    fee: String,
    cv: String,
    portfolio: String,
    status: String,
    note: String,
    knowFrom: String,
    city: String,
    jobRole: String
}, { timestamps: true })

const Hiring = mongoose.model('Hiring', hiringSchema)

module.exports = Hiring