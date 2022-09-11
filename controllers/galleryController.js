const { count } = require('../models/gallery');
const Gallery = require('../models/gallery')

class GalleryController {
  static upload(req, res) {     
    const {name, category, city, horizontal, vertical, description} = req.body
    Gallery.create({
      name, 
      url: req.file.path, 
      category,
      city,
      horizontal,
      vertical,
      description
    })
    .then(pic => {
      res.status(201).json(pic)
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static findAll(req, res) {
    const requestedPage = req.query.page ? parseInt(req.query.page) : 1
    const page = Math.max(0, requestedPage)
    const perPage = 10
    let totalData = 0
    Gallery.count()
      .then(num => {
        totalData = num
        return Gallery.find()
          .sort({createdAt: 'asc'})
          .limit(perPage)
          .skip(perPage * (page-1))
      })
      .then(pics => {
        const meta = {
          page: requestedPage,
          totalData,
          totalDataOnPage: totalData < perPage ? totalData : perPage,
          totalPage: Math.ceil(totalData / perPage)
        }
        res.status(200).json({images: pics, meta})
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ msg:err })
      })
  }

  static findCategory(req, res) {
    const category = req.params.category
    const requestedPage = req.query.page ? parseInt(req.query.page) : 1
    const page = Math.max(0, requestedPage)
    const perPage = 10
    let totalData = 0
    Gallery.count({ category })
      .then(num => {
        totalData = num
        return Gallery.find({ category })
          .sort({createdAt: 'asc'})
          .limit(perPage)
          .skip(perPage * (page-1))
      })
      .then(pics => {
        const meta = {
          page: requestedPage,
          totalData,
          totalDataOnPage: totalData < perPage ? totalData : perPage,
          totalPage: Math.ceil(totalData / perPage)
        }
        res.status(200).json({images: pics, meta})
      })
      .catch(err => {
        res.status(400).json({ msg:err })
      })
  }
}

module.exports = GalleryController