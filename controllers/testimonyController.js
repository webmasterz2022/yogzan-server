const { default: mongoose } = require('mongoose');
const Testimony = require('../models/testimony')

class TestimonyController {
  static create(req, res) {     
    const {name, link, desc} = req.body
    Testimony.create({
      name, 
      image: req.file?.path || '', 
      link,
      desc
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
    Testimony.find()
      .then(testimonies => {
        res.status(200).json(testimonies)
      })
      .catch(err => {
        console.error(err)
        res.status(400).json({ msg:err })
      })
  }

  static delete(req, res) {
    Testimony
      .findOneAndRemove({_id: mongoose.Types.ObjectId(req.params.id)})
      .then(testimony => {
        res.status(200).json(testimony)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ msg:err })
      })
  }

  static update(req, res) {
    const data = {
      name: req.body.name,
      image: req.body.image || req.file?.path || '',
      link: req.body.link,
      desc: req.body.desc
    }
    Testimony
      .findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, data)
      .then(testimony => {
        res.status(200).json(testimony)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ msg:err })
      })
  }
}

module.exports = TestimonyController