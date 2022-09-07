const Gallery = require('../models/gallery')

class GalleryController {
  static upload(req, res) {     
    const {name, category, city} = req.body

    Gallery.create({
      name, 
      url: req.file.path, 
      category,
      city
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

  static findCategory(req, res) {
    const category = req.params.category
    
    Gallery
      .find({category})
      .then(pics => {
        res.status(200).json(pics)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = GalleryController