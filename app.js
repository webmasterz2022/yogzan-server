if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}
const express = require('express')
const route = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(process.env.DB_PATH, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: '1'}, (err) => {
  if(err) console.log('mongoose connection failed', err);
  else console.log('mongoose connection success');
});

app.use('/', route)

app.use(function(err, req, res, next){
  console.log(err);
  if(err.code && err.msg){
      res.status(err.code).json(err.msg)
  } else {
      res.status(500).json(err)
  }
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})