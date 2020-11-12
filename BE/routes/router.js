const express = require('express')
const router = express.Router()
const { catchErrors } = require('../util/errorHandlers')
const businessCard = require('../controllers/cardController')

router.post('/card/add', catchErrors(businessCard.createCard))

router.get('/cards/all', catchErrors(businessCard.readCards))

router.patch('/card/update', catchErrors(businessCard.updateCard))

module.exports = router
