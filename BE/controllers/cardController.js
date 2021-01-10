const { firestore } = require('firebase-admin')
const database = require('../config/database')

const db = database.getDb()
const docRef = db.collection('cards')

/**
snapshot.doc.data() - accesses the document object
**/

exports.createCard = async function (req, res, next) {
  const userId = req.user.uid
  // const docName = req.body.cardName // name of the document that will be put in collection
  // const cardAttributes = Object.entries(req.body).filter((el) => el[0] !== 'cardName')
  // const cardAttributesObject = Object.fromEntries(cardAttributes)

  // allow setting empty documents
  const date = new Date()
  const document = await docRef.add({
    // .add() method adds to collection a document whose name is a unique ID
    timestamp: firestore.Timestamp.fromDate(date),
    ...req.body,
    userId,
  })
  const snapshot = await document.get()
  const data = snapshot.data()
  const id = snapshot.id
  // AUTH res.status(200).json({ ...data, id, userId })
  res.status(200).json({ ...data, id })
}

exports.readCards = async function (req, res, next) {
  // console.log(req.user.uid)
  // const { user: { uid: userId } } = req
  const snapshot = await docRef.get()

  const data = snapshot.docs.map((doc) => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  })

  res.status(200).json(data)
}

exports.readCard = async function (req, res, next) {
  const snapshot = await docRef.doc(req.params.cardId).get()
  const data = snapshot.data()

  res.status(200).json(data)
}

getId = (req) => {
  const id = req.params.cardId
  const doc = docRef.doc(id)
  return {
    id,
    doc,
  }
}

exports.updateCard = async function (req, res, next) {
  const { id, doc } = getId(req)
  const updates = Object.entries(req.body).filter((el) => el[0] !== 'id') // remove id field from updates
  const mappedForDeletion = updates.map((field) => {
    // every field with empty string gets a deletion method
    return field[1] === '' ? [field[0], firestore.FieldValue.delete()] : field
  })
  const updatesObject = Object.fromEntries(mappedForDeletion) // back to an object
  await doc.update({ ...updatesObject })
  res.status(200).json({
    message: 'Card successfully updated',
    id,
  })
}

// add ability to delete a field on the document or just use update endpoint to update all fields on the document

exports.deleteCard = async function (req, res, next) {
  const { id, doc } = getId(req)
  await doc.delete()
  res.status(200).json({
    message: 'Card successfully removed',
    id,
  })
}
