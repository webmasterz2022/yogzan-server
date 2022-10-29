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
    const perPage = 10
    let totalData = 0
    Book.count()
      .then(num => {
        totalData = num
        return Book.find()
          .sort({createdAt: 'asc'})
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
}

module.exports = BookController