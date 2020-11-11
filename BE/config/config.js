require('dotenv').config()

module.exports = {
  firebase_creds: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  port: process.env.PORT,
}
