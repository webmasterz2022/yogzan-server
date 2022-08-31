const Gallery = require('../models/gallery')

class GalleryController {
  static upload(req, res) {        
    const {name, url, type} = req.body

    Gallery.create({
      name, url, type
    })
    .then(user=> {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static findAll(req, res) {
    console.log('-------')
    Gallery.find({})
      .then(pics => {
        res.status(200).json(pics)
      })
      .catch(err => {
        res.status(400).json({ msg:err })
      })
  }

  static findType(req, res) {
    const type = req.params.type
    console.log('-------', type)

    Gallery
      .find(type)
      .then(pics => {
        res.status(200).json(pics)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = GalleryController