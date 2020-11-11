const admin = require('firebase-admin')
const assert = require('assert').strict

let _db

function initDb(creds) {
  const serviceAccount = require(creds)

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  const db = admin.firestore()

  if (db) {
    _db = db
    console.log('Firebase connected')
  }
}

function getDb() {
  assert.ok(_db, 'Database not initialised, please call initDb first')
  return _db
}

module.exports = {
  initDb,
  getDb,
}
