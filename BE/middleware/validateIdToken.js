const admin = require('firebase-admin')

const validateIdToken = (req,res, next) => {
  const idToken = req.headers.authorization

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      const uid = decodedToken.uid
      console.log(uid)
      req.uid = uid
      next()
    })
    .catch((error) => {
      res.status(error.status || 500)
    })
}

module.exports = validateIdToken