const express = require('express')
const morgan = require('morgan')
const path = require('path')
const routes = require('./routes')

module.exports = app => {
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.engine('art', require('express-art-template'))
  app.set('view', {
    debug: process.env.NODE_ENV !== 'production'
  })

  app.set('view engine', 'art')

  routes.initialize(app, new express.Router())

  app.use('/public/', express.static(path.join(__dirname, '../public')))

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  return app
}
