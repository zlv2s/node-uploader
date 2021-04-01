const models = require('../db/models'),
  imgCount = models.ImageModel.count({}),
  commentCount = models.CommentModel.count({}),
  totalViews = models.ImageModel.aggregate([
    {
      $group: {
        _id: '1',
        viewsTotal: { $sum: '$views' }
      }
    }
  ]),
  totalLikes = models.ImageModel.aggregate([
    {
      $group: {
        _id: '1',
        likesTotal: { $sum: '$likes' }
      }
    }
  ])

module.exports = {
  getCount() {
    return Promise.all([imgCount, commentCount, totalViews, totalLikes])
  }
}
