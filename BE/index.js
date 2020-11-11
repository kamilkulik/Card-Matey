const config = require('./config/config')
const { initDb } = require('./config/database')
initDb(config.firebase_creds)

const express = require('express')
const app = express()
const router = require('./routes/router')

app.use('/', router)

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`)
})

module.exports = app
