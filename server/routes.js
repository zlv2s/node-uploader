const home = require('../controllers/home')
const image = require('../controllers/image')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    const reg = /(.*)(\.[^.]+)$/
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const [full, name, ext] = reg.exec(file.originalname)
    cb(null, `${name.replace(/#/g, '-')}-${uniqueSuffix + ext}`)
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 2048000
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('只能上传图片文件！'))
  }
}

module.exports.initialize = (app, router) => {
  router.get('/', home.index)
  router.get('/images/:imageId', image.index)
  router.post('/images', upload.single('img'), image.create)
  router.post('/images/:imageId/like', image.like)
  router.post('/images/:imageId/comment', image.comment)
  app.use(router)
}
