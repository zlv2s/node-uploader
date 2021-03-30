const home = require('../controllers/home')
const image = require('../controllers/image')

module.exports.initialize = (app, router) => {
  router.get('/', home.index)
  router.get('/images/:imageId', image.index)
  router.post('/images', image.create)
  router.post('/images/:imageId/like', image.like)
  router.post('/images/:imageId/comment', image.comment)
  app.use(router)
}
