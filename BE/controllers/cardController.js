const { firestore } = require('firebase-admin')
const database = require('../config/database')

const db = database.getDb()
const docRef = db.collection('cards')

/**

snapshot.doc.data() - accesses the document object

**/

exports.createCard = async function (req, res, next) {
  // const docName = req.body.cardName // name of the document that will be put in collection
  // const cardAttributes = Object.entries(req.body).filter((el) => el[0] !== 'cardName')
  // const cardAttributesObject = Object.fromEntries(cardAttributes)

  // allow setting empty documents
  const date = new Date()
  await docRef.add({
    // .add() method adds to collection a document whose name is a unique ID
    timestamp: firestore.Timestamp.fromDate(date),
    ...req.body,
  })
  res.status(200).send(`Card successfully added to Database`)
}

exports.readCards = async function (req, res, next) {
  const snapshot = await docRef.get()
  const data = snapshot.docs.map((doc) => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  })

  res.status(200).json(data)
}

exports.updateCard = async function (req, res, next) {
  const id = req.body.id
  const doc = docRef.doc(id)
  const updates = Object.entries(req.body).filter((el) => el[0] !== 'id')
  const updatesObject = Object.fromEntries(updates)
  await doc.update({ ...updatesObject })
  res.status(200).send(`Doc id: ${id} updated`)
}

exports.deleteCard = async function (req, res, next) {
  const id = req.body.id
  const doc = docRef.doc(id)
  await doc.delete()
  res.status(200).send(`Doc id: ${id} got deleted`)
}
