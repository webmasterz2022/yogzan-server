const User = require('../models/user')
const Helper = require('../helpers')

class UserController {
  static register(req, res) {        
    const {username, email, password} = req.body

    User.create({
      username, email, password
    })
    .then(user=> {
      res.status(201).json(user)
    })
    .catch(err => {
      if (err.errors.email) {
          res.status(409).json({ err: err.errors.email.reason });
      } else if(err.errors.password) {
          res.status(409).json({ err: err.errors.password.message });
      } else {
          res.status(500).json(err);
      }
    })
  }

  static login(req, res) {
    const {email, password} = req.body

    User.findOne({
      email
    })
    .then(user => {
      if(!user) {
        res.status(400).json({ err: "Email atau Password tidak ditemukan" });
      } else {
        if(Helper.comparePassword(password, user.password)) {
          let access_token = Helper.generateJWT({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
          res.status(200).json({access_token, userId: user._id, username : user.username})
        } else {
          res.status(400).json({ err: "Email atau Password tidak ditemukan" });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }

  static findAll(req, res) {
    User.find({})
      .then(user=> {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(400).json({msg:err})
      })
  }

  static findOne(req, res) {
    const id = req.params.id 

    User
      .findById(id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = UserController