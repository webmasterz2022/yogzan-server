const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name : String,
    layanan : String,
    city : String,
    date: String,
    phone: String,
    knowFrom: String
}, { timestamps : true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order