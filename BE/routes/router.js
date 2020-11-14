const express = require('express')
const router = express.Router()
const { catchErrors } = require('../util/errorHandlers')
const businessCard = require('../controllers/cardController')

router.post('/card/add', catchErrors(businessCard.createCard))

router.get('/card', catchErrors(businessCard.readCards))

router.patch('/card/update', catchErrors(businessCard.updateCard))

router.delete('/card/delete', catchErrors(businessCard.deleteCard))

module.exports = router
