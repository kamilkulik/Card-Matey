require('dotenv').config()

module.exports = {
  firebase_creds: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  oauth_client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
  oauth_client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  port: process.env.PORT,
}
