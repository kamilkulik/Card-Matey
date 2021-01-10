const { firestore } = require('firebase-admin')
const database = require('../config/database')

const db = database.getDb()
const docRef = db.collection('cards')

exports.createCard = async function (req, res, next) {
  const userId = req.uid
  const date = new Date()
  const document = await docRef.add({
    timestamp: firestore.Timestamp.fromDate(date),
    ...req.body,
    userId,
  })
  const snapshot = await document.get()
  const data = snapshot.data()
  const id = snapshot.id
  res.status(200).json({ ...data, id })
}

exports.readCards = async function (req, res, next) {
  const { uid } = req
  const snapshot = await docRef.where('userId', '==', uid).get()

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

exports.deleteCard = async function (req, res, next) {
  const { id, doc } = getId(req)
  await doc.delete()
  res.status(200).json({
    message: 'Card successfully removed',
    id,
  })
}
