const Order = require('../models/order')
const transport = require('../services/nodemailer')

class BookController {
  static booking(req, res) {  
    Order.create(req.body)
    .then(order => {
      transport.sendMail({
        from: process.env.SENDER_EMAIL,
        to: ['fadlulazmi17@gmail.com', 'hikmawanmie@gmail.com'],
        subject: `New Order - ${order.name} - ${order.city}`,
        html: `
          <h1>Hi Yogzan, you have new order !</h1>
          <hr/>
          <p><b>Nama Pemesan :</b> ${order.name}</p>
          <p><b>Layanan :</b> ${order.layanan}</p>
          <p><b>Kota :</b> ${order.city}</p>
          <p><b>Tanggal Pemotretan :</b> ${order.date}</p>
          <p><b>Kontak yang dapat dihubungi :</b> ${order.phone}</p>
          <p><b>Mengetahui Yogzan dari :</b> ${order.knowFrom}</p>
        `
      }, (err, info) => {
        if(err) {
          console.error(err)
          res.status(500).json({msg: 'mailer error'})
        } else {
          res.status(201).json(order)
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
    Order.count()
      .then(num => {
        totalData = num
        return Order.find()
          .sort({createdAt: 'asc'})
          .limit(perPage)
          .skip(perPage * (page-1))
      })
      .then(orders => {
        const meta = {
          page: requestedPage,
          totalData,
          totalDataOnPage: totalData < perPage ? totalData : perPage,
          totalPage: Math.ceil(totalData / perPage)
        }
        res.status(200).json({data: orders, meta})
      })
      .catch(err => {
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }
}

module.exports = BookController