const { default: mongoose } = require('mongoose');
const Book = require('../models/book')
const transport = require('../services/nodemailer')

class BookController {
  static submit(req, res) {  
    Book.create(req.body)
    .then(book => {
      res.status(201).json(book)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err);
    })
  }

  static findAll(req, res) {
    const requestedPage = req.query.page ? parseInt(req.query.page) : 1
    const page = Math.max(0, requestedPage)
    const perPage = req.query.limit || 10
    let totalData = 0
    Book.count()
      .then(num => {
        totalData = num
        return Book.find()
          .nin('date', ['', undefined, null])
          .sort({createdAt: 'desc'})
          .limit(perPage)
          .skip(perPage * (page-1))
      })
      .then(books => {
        const meta = {
          page: requestedPage,
          totalData,
          totalDataOnPage: totalData < perPage ? totalData : perPage,
          totalPage: Math.ceil(totalData / perPage)
        }
        res.status(200).json({data: books, meta})
      })
      .catch(err => {
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static updateData(req, res) {
    Book.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, req.body)
    .then(book => {
      res.status(200).json(book)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err);
    })
  }

}

module.exports = BookController