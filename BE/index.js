const config = require('./config/config')
const { initDb } = require('./config/database')
initDb(config.firebase_creds)
const express = require('express')
const passport = require('passport')
const app = express()
const bodyParser = require('body-parser')
const router = require('./routes/router')
const validateIdToken = require('./middleware/validateIdToken')

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())

// CORS HANDLING
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // * allows all origins to send request
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept, Authorization'
  ) // kinds of headers allowed
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE') // setting allowed http methods
    return res.status(200).json({}) // empty success response just for the browser
  }
  next()
})

app.use(validateIdToken)

app.use('/', router)

app.listen(config.port, () => {
  console.log(`App is running on port ${config.port}`)
})

module.exports = app
