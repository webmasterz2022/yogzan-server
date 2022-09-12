const { count, $where } = require('../models/gallery');
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
      description,
      isHomepage: false
    })
    .then(pic => {
      res.status(201).json(pic)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json(err);
    })
  }

  static uploadHomepage(req, res) {     
    const {name, horizontal, vertical} = req.body
    Gallery.create({
      name, 
      url: req.file.path,
      horizontal,
      vertical,
      isHomepage: true
    })
    .then(pic => {
      res.status(201).json(pic)
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
    Gallery.count({isHomepage: false})
      .then(num => {
        totalData = num
        return Gallery.find({isHomepage: false})
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
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static findHomepage(req, res) {
    Gallery.find({isHomepage: true})
      .then(pics => {
        res.status(200).json(pics)
      })
      .catch(err => {
        console.error(err)
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
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static findCities(req, res) {
    Gallery
      .find()
      .distinct('city')
      .then(cities => {
        res.status(200).json(cities.filter(e => e !== ''))
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ msg:err })
      })
  }
}

module.exports = GalleryController