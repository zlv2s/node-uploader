const models = require('../db/models'),
  sidebar = require('../helpers/sidebar'),
  md5 = require('md5')

module.exports = {
  // 获取图片信息
  async index(req, res) {
    const { imageId } = req.params
    const viewModel = {
      image: {},
      comments: []
    }

    try {
      const image = await models.ImageModel.findOne({
        filename: { $regex: imageId }
      })

      if (image) {
        image.views += 1
        viewModel.image = image
        image.save()

        const comments = await models.CommentModel.find(
          { imageId: image._id },
          {},
          { sort: { ts: 1 } }
        )
        viewModel.comments = comments
        await sidebar(viewModel)

        res.render('image', viewModel)
      } else {
        res.redirect('/')
      }
    } catch (error) {
      throw error
    }
  },
  // 保存图片
  async create(req, res) {
    const filename = req.file.filename

    try {
      const newImage = new models.ImageModel({
        title: req.body.title,
        filename: filename,
        description: req.body.description
      })
      const image = await newImage.save()
      res.json({
        status: 0,
        message: 'success',
        data: {
          url: `/images/${image.uniqueId}`
        }
      })
    } catch (error) {
      throw error
    }
  },
  // 点赞
  async like(req, res) {
    try {
      const image = await models.ImageModel.findOneAndUpdate(
        {
          filename: { $regex: req.params.imageId }
        },
        { $inc: { likes: 1 } },
        { new: true }
      )
      res.json({ status: 0, message: 'success', data: { likes: image.likes } })
    } catch (error) {
      throw err
    }
  },
  // 评论
  async comment(req, res) {
    const { username, email, content } = req.body
    const { imageId } = req.params
    console.log(2222, username)
    try {
      const image = await models.ImageModel.findOne({
        filename: { $regex: imageId }
      })
      if (image) {
        const comment = await new models.CommentModel({
          username,
          email,
          comment: content,
          imageId: image._id,
          avatar: md5(email)
        }).save()

        res.json({
          status: 0,
          message: '评论成功',
          data: { comment: comment._id }
        })
      } else {
        res.json({
          status: 1,
          message: '图片id错误！',
          data: null
        })
      }
    } catch (error) {
      throw error
    }
  }
}
