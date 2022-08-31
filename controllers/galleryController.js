const Gallery = require('../models/gallery')

class GalleryController {
  static upload(req, res) {        
    const {name, type} = req.body

    Gallery.create({
      name, 
      url: req.file.path, 
      type
    })
    .then(user=> {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }

  static findAll(req, res) {
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