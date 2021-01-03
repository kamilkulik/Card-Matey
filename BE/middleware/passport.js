const config = require('../config/config')
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy

passport.use(new Strategy({
  clientID: config.oauth_client_id,
  clientSecret: config.oauth_client_secret,
  callbackURL: '/'
},
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
}));