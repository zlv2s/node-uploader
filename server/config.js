const express = require('express')
const morgan = require('morgan')
const path = require('path')
const template = require('art-template')
const routes = require('./routes')
const { getDate, getDateDiff } = require('../utils')

module.exports = app => {
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  template.defaults.imports.getDate = getDate
  template.defaults.imports.getDateDiff = getDateDiff

  app.engine('art', require('express-art-template'))
  app.set('views', {
    debug: process.env.NODE_ENV !== 'production'
  })
  app.set('views', path.join(__dirname, '../views'))
  app.set('view engine', 'art')

  routes.initialize(app, new express.Router())

  app.use('/public', express.static(path.join(__dirname, '../public')))

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.json({
      status: 1,
      message: err.message,
      data: null
    })
  })
  return app
}
