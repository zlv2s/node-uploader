const models = require('../db/models')

module.exports = {
  async getNewest() {
    try {
      const comments = await models.CommentModel.find(
        {},
        {},
        { limit: 8, sort: { ts: -1 } }
      )

      const attachImage = async comment => {
        const image = await models.ImageModel.findOne({ _id: comment.imageId })
        comment.image = image
      }

      await Promise.all(comments.map(attachImage))

      return comments
    } catch (error) {
      throw error
    }
  }
}
