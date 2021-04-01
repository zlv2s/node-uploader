const mongoose = require('../db'),
  Schema = mongoose.Schema,
  path = require('path')

const ImageSchema = new Schema({
  title: String,
  description: String,
  filename: String,
  views: {
    type: Number,
    default: 0
  },

  likes: {
    type: Number,
    default: 0
  },

  ts: {
    type: Date,
    default: Date.now
  }
})

// define a  virtual property that removes the file extname
ImageSchema.virtual('uniqueId').get(function () {
  return this.filename.replace(path.extname(this.filename), '')
})

module.exports = mongoose.model('Image', ImageSchema)
