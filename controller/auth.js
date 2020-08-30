const passport = require('passport');

require('dotenv').config();

module.exports = {
    'facebookAuth' : {
        'clientID': process.env.FACEBOOK_APP_ID,
        'clientSecret': process.env.FACEBOOK_SECRET,
        'callbackURL': '/auth/facebook/callback',
        'profileFields': ['id', 'emails', 'name']
    },

    'googleAuth' : {
        'clientID': process.env.GOOGLE_APP_ID,
        'clientSecret': process.env.GOOGLE_SECRET,
        'callbackURL': '/auth/google/callback',
        'profileFields': ['id', 'emails', 'name']
    }
}