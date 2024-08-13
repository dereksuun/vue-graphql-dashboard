const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participationSchema = new Schema({
  firstName: String,
  lastName: String,
  participation: Number
})

module.exports = mongoose.model('Participation', participationSchema)
