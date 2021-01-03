const express = require('express')
const passport = require('passport')
const router = express.Router()
const { catchErrors } = require('../util/errorHandlers')
const businessCard = require('../controllers/cardController')
const cardBackgrounds = require('../controllers/themeController')

// CARDS

router.post('/cards', catchErrors(businessCard.createCard))

router.get('/cards', catchErrors(businessCard.readCards))

router.get('/cards/:cardId', catchErrors(businessCard.readCard))

router.patch('/cards/:cardId', catchErrors(businessCard.updateCard))

router.delete('/cards/:cardId', catchErrors(businessCard.deleteCard))

// THEMES

router.get('/themes', catchErrors(cardBackgrounds.readThemes))

// AUTH

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router
