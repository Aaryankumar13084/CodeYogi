const mongoose = require('mongoose')
const Schema = mongoose.Schema({
  first_name: String,
  last_name: String,
  id:Number,
  username:String,
})

module.exports = mongoose.model('tguser', Schema)