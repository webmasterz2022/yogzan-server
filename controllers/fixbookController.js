const { default: mongoose } = require('mongoose');
const FixBook = require('../models/fixbook')

class FixBookController {
  static submit(req, res) {
    FixBook.create(req.body)
      .then(book => {
        res.status(201).json(book)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err);
      })
  }

  // static findAll(req, res) {
  //   const requestedPage = req.query.page ? parseInt(req.query.page) : 1
  //   const page = Math.max(0, requestedPage)
  //   const perPage = req.query.limit || 10
  //   let totalData = 0
  //   FixBook.count()
  //     .then(num => {
  //       totalData = num
  //       return FixBook.find()
  //         .nin('date', [undefined, null])
  //         .sort({ date: -1, time: 1 })
  //         .limit(perPage)
  //         .skip(perPage * (page - 1))
  //     })
  //     .then(books => {
  //       const meta = {
  //         page: requestedPage,
  //         totalData,
  //         totalDataOnPage: totalData < perPage ? totalData : perPage,
  //         totalPage: Math.ceil(totalData / perPage)
  //       }
  //       res.status(200).json({ data: books, meta })
  //     })
  //     .catch(err => {
  //       console.error(err)
  //       res.status(400).json({ msg: err })
  //     })
  // }

  static findAll(req, res) {
  const requestedPage = req.query.page ? parseInt(req.query.page) : 1;
  const page = Math.max(0, requestedPage);
  const perPage = req.query.limit || 10;
  let totalData = 0;

  FixBook.count()
    .then((num) => {
      totalData = num;

      return FixBook.aggregate([
        // Tambahkan field untuk mengatur nilai sort khusus
        {
          $addFields: {
            dateSort: {
              $cond: {
                if: { $ifNull: ["$date", false] }, // Jika `date` null atau undefined
                then: 1, // Beri nilai prioritas rendah
                else: 0, // Beri nilai prioritas tinggi
              },
            },
          },
        },
        // Sort berdasarkan `dateSort`, lalu `date`, dan `time`
        { $sort: { dateSort: 1, date: -1, time: 1 } },
        // Pagination menggunakan `$skip` dan `$limit`
        { $skip: perPage * (page - 1) },
        { $limit: perPage },
      ]);
    })
    .then((books) => {
      const meta = {
        page: requestedPage,
        totalData,
        totalDataOnPage: books.length,
        totalPage: Math.ceil(totalData / perPage),
      };
      res.status(200).json({ data: books, meta });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ msg: err.message });
    });
}


  static updateData(req, res) {
    FixBook.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body)
      .then(book => {
        res.status(200).json(book)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err);
      })
  }

  static checkClientPath(req, res) {
    FixBook.findOne({ linkphoto: req.body.path })
      .then(book => {
        res.status(200).json(book ? false : true)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err);
      })
  }

  static photoLink(req, res) {
    FixBook.findOne({ linkphoto: req.body.linkphoto })
      .then(book => {
        res.status(200).json(book.stored)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err);
      })
  }

  static delete(req, res) {
    FixBook.findOneAndDelete({ _id: mongoose.Types.ObjectId(req.params.id) })
      .then(book => {
        res.status(200).json(book)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err);
      })
  }
}

module.exports = FixBookController