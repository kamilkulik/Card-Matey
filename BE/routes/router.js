const express = require('express')
const router = express.Router()
const businessCard = require('../controllers/businessCard')

router.post('/api/createcard', (req, res, next) => businessCard.createCard(req.params))

module.exports = router
