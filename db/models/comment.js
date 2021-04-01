const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

const CommentSchema = new Schema({
  imageId: { type: ObjectId },
  email: { type: String },
  username: { type: String },
  gravatar: { type: String },
  comment: { type: String },
  ts: { type: Date, default: Date.now }
})

CommentSchema.virtual('image')
  .set(function (image) {
    this._image = image
  })
  .get(function () {
    return this._image
  })

module.exports = mongoose.model('Comment', CommentSchema)
