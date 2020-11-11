const database = require('../config/database')

const db = database.getDb()
const docRef = db.collection('cards')

exports.createCard = async function (req, res, next) {
  const docName = req.body.cardName
  await docRef.doc(docName).set({
    first: req.body.first,
    last: req.body.last,
    profession: req.body.job,
  })
  res.status(200).send(`${docName} successfully added to Database`)
}
