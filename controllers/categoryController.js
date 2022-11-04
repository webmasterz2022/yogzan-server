const { default: mongoose } = require('mongoose');
const Category = require('../models/category')

class CategoryController {
  static create(req, res) {     
    const {name, displayOnGallery, displayOnHomepage} = req.body
    Category.create({
      name, 
      image: req.file.path, 
      displayOnGallery,
      displayOnHomepage
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
    Category.find()
      .then(categories => {
        res.status(200).json(categories)
      })
      .catch(err => {
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static findHomepage(req, res) {
    Category.find({displayOnHomepage: true})
      .then(categories => {
        res.status(200).json(categories)
      })
      .catch(err => {
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static findGallery(req, res) {
    Category.find({displayOnGallery: true})
      .then(categories => {
        res.status(200).json(categories)
      })
      .catch(err => {
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static delete(req, res) {
    Category
      .findOneAndRemove({_id: mongoose.Types.ObjectId(req.params.id)})
      .then(category => {
        cloudinary.deleteCloudPicture(category.image)
        res.status(200).json(category)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ msg:err })
      })
  }

  static update(req, res) {
    const data = {
      name: req.body.name,
      image: req.body.image || req.file.path,
      displayOnGallery: req.body.displayOnGallery,
      displayOnHomepage: req.body.displayOnHomepage
    }
    Category
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

module.exports = CategoryController