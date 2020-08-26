const passport = require('passport');

require('dotenv').config();

module.exports = {
    'facebookAuth' : {
        'clientID': '352936062401441',
        'clientSecret': 'fd64c28011b7222295f97835b4d29b6b',
        'callbackURL': '/auth/facebook/callback',
        'profileFields': ['id', 'emails', 'name']
    },

    'googleAuth' : {
        'clientID': '441246304601-2ri6qhkg6gkfidvklq8qavkehpeis665.apps.googleusercontent.com',
        'clientSecret': '_8kEosXq3tyLwjRCm7VV83vk',
        'callbackURL': '/auth/google/callback',
        'profileFields': ['id', 'emails', 'name']
    }
}