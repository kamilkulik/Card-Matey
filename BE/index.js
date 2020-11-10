const express = require('express')
require('dotenv').config()
const app = express()
const port = 3700

const admin = require('firebase-admin')
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://card-matey.firebaseio.com',
})

const db = admin.database()
if (db) console.log('Firebase connected')
else console.log('connection error')
const cardRef = db.ref('cards')

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})

module.exports = app
