// const admin = require('firebase-admin')
const database = require('../config/database')

const db = database.getDb()
const docRef = db.collection('themes')

exports.readThemes = async function (req, res, next) {
  const snapshot = await docRef.get()
  const data = snapshot.docs.map((doc) => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  })

  res.status(200).json(data)
}

/*
const admin = require('firebase-admin')
const database = require('../config/database')

const db = database.getDb()
const docRef = db.collection('themes')

exports.readThemes = async function (req, res, next) {
  const idToken = req.headers.authorization

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      const uid = decodedToken.uid;
      console.log(uid)
      const snapshot = await docRef.get()
      const data = snapshot.docs.map((doc) => {
        const id = doc.id
        const data = doc.data()
        return { id, ...data }
      })
    
      res.status(200).json(data)
    })
    .catch((error) => {
      // Handle error
    });

}
*/