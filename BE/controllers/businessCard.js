const database = require('../config/database')

const db = database.getDb()
const docRef = db.collection('cards').doc('default_card')

exports.createCard = async function () {
  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    profession: 'freelance web architect',
  })
}
