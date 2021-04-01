const stats = require('./stats'),
  images = require('./images'),
  comments = require('./comments')

module.exports = async viewModel => {
  try {
    const results = await Promise.all([
      stats.getCount(),
      images.getPopular(),
      comments.getNewest()
    ])

    const [statsData, popularData, commentData] = results
    viewModel.sidebar = { statsData, popularData, commentData }
  } catch (error) {
    throw error
  }
}
