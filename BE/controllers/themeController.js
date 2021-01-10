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