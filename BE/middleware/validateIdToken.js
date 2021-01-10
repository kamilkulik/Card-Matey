const admin = require('firebase-admin')

const validateIdToken = (req, res, next) => {
  if ('authorization' in req.headers) {
    const idToken = req.headers.authorization
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid
        req.uid = uid
        next()
      })
      .catch((error) => {
        res.status(error.status || 500)
      })
  } else {
    res.status(401).send('for authorised users only')
  }
}

module.exports = validateIdToken