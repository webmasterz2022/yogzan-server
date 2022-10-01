const Book = require('../models/book')
const transport = require('../services/nodemailer')

class BookController {
  static submit(req, res) {  
    Book.create(req.body)
    .then(book => {
      transport.sendMail({
        from: process.env.SENDER_EMAIL,
        to: 'helpdesk@yogzan.com',
        subject: `New Order - ${book.name} - ${book.city}`,
        html: `
          <h1>Hi Yogzan, you have new book !</h1>
          <hr/>
          <p><b>Nama Pemesan :</b> ${book.name}</p>
          <p><b>Layanan :</b> ${book.layanan}</p>
          <p><b>Kota :</b> ${book.city}</p>
          <p><b>Tanggal Pemotretan :</b> ${book.date}</p>
          <p><b>Kontak yang dapat dihubungi :</b> ${book.phone}</p>
          <p><b>Mengetahui Yogzan dari :</b> ${book.knowFrom}</p>
        `
      }, (err, info) => {
        if(err) {
          console.error(err)
          res.status(500).json({msg: 'mailer error'})
        } else {
          res.status(201).json(book)
        }
      })
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