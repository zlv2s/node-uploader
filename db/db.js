const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: process.env.DB_NAME,
    connectTimeoutMS: 3000,
    useFindAndModify: false
  })
  .catch(err => {
    console.log(err)
  })

mongoose.connection.on('connected', () =>
  console.log('mongodb successfully connected')
)

mongoose.connection.on('error', err => {
  console.log(err.message)
})

mongoose.connection.on('disconnected', err => {
  console.log('mongodb is disconnected')
})

module.exports = mongoose
