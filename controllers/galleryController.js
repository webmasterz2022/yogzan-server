const { default: mongoose } = require('mongoose');
const { count, $where } = require('../models/gallery');
const Gallery = require('../models/gallery')
const cloudinary = require('../services/cloudinary')

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
    const requestedCity = req.query.city
    const page = Math.max(0, requestedPage)
    const perPage = 10
    let totalData = 0
    const params = { isHomepage: false }
    if(requestedCity){
      params.city = requestedCity
    }
    Gallery.count(params)
      .then(num => {
        totalData = num
        return Gallery.find(params)
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
    const requestedCity = req.query.city
    const category = req.params.category
    const requestedPage = req.query.page ? parseInt(req.query.page) : 1
    const page = Math.max(0, requestedPage)
    const perPage = 10
    let totalData = 0
    const params = { category }
    if(requestedCity){
      params.city = requestedCity
    }
    Gallery.count(params)
      .then(num => {
        totalData = num
        return Gallery.find(params)
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

  static delete(req, res) {
    Gallery
    .findOneAndRemove({_id: mongoose.Types.ObjectId(req.params.id)})
    .then(images => {
        cloudinary.deleteCloudPicture(images.url)
        res.status(200).json(images)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ msg:err })
      })
  }

  static update(req, res) {
    const {name, category, city, horizontal, vertical, description} = req.body
    const data = {
      url: req.body.image || req.file?.path,
      name, 
      category,
      city,
      horizontal,
      vertical,
      description,
      isHomepage: false
    }
    Gallery
      .findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, data)
      .then(category => {
        if(req.file?.path && req.body.image){
          cloudinary.deleteCloudPicture(req.body.image)
        }
        res.status(200).json(category)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ msg:err })
      })
  }
}

module.exports = GalleryController