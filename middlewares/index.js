const Helper = require('../helpers')
const User = require('../models/user')
const Gallery = require('../models/gallery')

module.exports = {
  authentication :    async (req, res, next) => {
    try {
      console.log(req.headers.access_token, 'ini token di middleware')
      const decoded = Helper.verifyJWT(req.headers.access_token);

      let user = await User.findById(decoded._id)
      if(user){
        req.loggedUser = user
        console.log(req.loggedUser)
        next()
      } else {
        next({code : 401, msg : 'unauthorized'})
      }
    } catch (err) {
      res.status(500).json(err)
    }
  },
  authorization : {
    gallery : async (req, res, next) => {
      try {
        let gallery = await Gallery.findById(req.params.id)
        if(gallery.userId === req.loggedUser._id) next()
        else next({code : 401, msg : "unauthorized, you're not admin"})
      } catch (error) {
        next(error)
      }
    }
  }
}