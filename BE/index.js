const config = require('./config/config')
const { initDb } = require('./config/database')
initDb(config.firebase_creds)

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes/router')

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`)
})

module.exports = app
