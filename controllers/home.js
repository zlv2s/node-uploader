const { ImageModel } = require('../db/models'),
  sidebar = require('../helpers/sidebar')

module.exports = {
  async index(req, res) {
    const viewModel = {
      images: []
    }
    try {
      const images = await ImageModel.find({}, {}, { sort: { ts: -1 } })
      viewModel.images = images
      await sidebar(viewModel)
    } catch (error) {
      throw error
    }

    res.render('index.art', viewModel)
  }
}
