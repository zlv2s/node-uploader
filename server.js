const express = require('express')
require('dotenv').config()
const app = express()
const config = require('./server/config')

app.set('port', process.env.PORT || 3030)

config(app)

app.listen(app.get('port'), () => {
  console.log(`Server is listening to: http://localhost:${app.get('port')}`)
})
