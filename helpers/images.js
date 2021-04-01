const models = require('../db/models')

module.exports = {
  async getPopular() {
    try {
      return await models.ImageModel.find(
        {},
        {},
        {
          limit: 9,
          sort: {
            likes: -1
          }
        }
      )
    } catch (error) {
      throw error
    }
  }
}
