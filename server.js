const express = require('express')
const path = require('path')
const app = express()
const config = require('./server/config')

app.set('port', process.env.PORT || 3030)
app.set('views', path.join(__dirname, 'views'))

config(app)

app.listen(app.get('port'), () => {
  console.log(`Server is listening to: http://localhost:${app.get('port')}`)
})
