const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('./database');
const configAuth = require('./auth');

// const conn = mysql.createConnection(dbconfig.connection);
var conn = mysql.createPool(dbconfig.connection);

// function handleDisconnect() {
//     conn = mysql.createConnection(dbconfig.connection);

//     conn.connect(function(err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 2000);
//         }
//     });

//     conn.on('error', function(err) {
//         console.log('db error', err);
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }

// handleDisconnect();


// conn.query('CREATE DATABASE IF NOT EXISTS `linote`');

conn.query('USE ' + dbconfig.database);

conn.query("CREATE TABLE IF NOT EXISTS `note`" + "(" +  
    "`user_id` int(6) unsigned DEFAULT NULL, " + 
    "`user_facebook_id` varchar(100) DEFAULT NULL, " +
    "`user_google_id` varchar(100) DEFAULT NULL, " + 
    "`note_id` int(6) unsigned NOT NULL AUTO_INCREMENT, " + 
    "`title` varchar(100) DEFAULT NULL, " +
    "`content` mediumtext, " + 
    " PRIMARY KEY(`note_id`) " + 
");");

conn.query("CREATE TABLE IF NOT EXISTS `user` ( " + 
    "`id` int(6) NOT NULL AUTO_INCREMENT, " + 
    "`username` varchar(100) DEFAULT NULL, " + 
    "`password` varchar(100) DEFAULT NULL, " + 
    "`facebook_id` varchar(200) DEFAULT NULL, " + 
    "`facebook_token` varchar(300) DEFAULT NULL, " + 
    "`facebook_email` varchar(100) DEFAULT NULL, " + 
    "`facebook_name` varchar(200) DEFAULT NULL, " + 
    "`google_id` varchar(200) DEFAULT NULL, " + 
    "`google_token` varchar(300) DEFAULT NULL, " + 
    "`google_email` varchar(100) DEFAULT NULL, " + 
    "`google_name` varchar(100) DEFAULT NULL, " + 
    "PRIMARY KEY (`id`), " + 
    "UNIQUE KEY `id` (`id`), " + 
    "UNIQUE KEY `google_id` (`google_id`), " + 
    "UNIQUE KEY `facebook_id` (`facebook_id`) " + 
  ")");

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((req, user, done) => {

        conn.query("SELECT * FROM user WHERE id = ? OR facebook_id = ? OR google_id", [user.id, user.facebook_id, user.google_id], (err, rows) => {
            if (err) {
                console.log(err);
                return done(null, err);
            }
            done(null, user);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField: 'signup-username',
            passwordField: 'signup-password',
            passReqToCallback: true
        },
            function (req, username, password, done) {
                conn.query("SELECT * FROM user WHERE username = ?", [username], function (err, rows) {
                    if (err)
                        return done(err);

                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'This username is already taken!'));
                    } else {
                        let userToMysql = {
                            username: username,
                            password: bcrypt.hashSync(password, null, null)
                        };

                        let insertQuery = "INSERT INTO user (username, password) values (?, ?)";

                        conn.query(insertQuery, [userToMysql.username, userToMysql.password], (err, rows) => {
                            if (err) {
                                console.log(err);
                            } else {
                                userToMysql.id = rows.insertId;

                                return done(null, userToMysql);
                            }

                        });
                    }
                });
            }
        )
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'login-username',
            passwordField: 'login-password',
            passReqToCallback: true
        },
            function (req, username, password, done) {
                conn.query("SELECT * FROM user WHERE username = ?", [username], (err, rows) => {
                    if (err)
                        return done(err);

                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No User found!'));
                    }

                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Wrong Password!'));

                    return done(null, rows[0]);
                })
            }
        )
    );

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: configAuth.facebookAuth.profileFields
    },
        function (req, accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                conn.query('SELECT * FROM user WHERE facebook_id = ?', [profile.id], (err, user) => {
                    if (err) {
                        return done(err);
                    } else if (user) {
                        let newUser = {
                            facebook_id: profile.id,
                            facebook_token: accessToken,
                            facebook_email: profile.emails[0].value,
                            facebook_name: profile.name.givenName + ' ' + profile.name.familyName
                        };

                        conn.query("INSERT INTO user (username, facebook_id, facebook_token, facebook_email, facebook_name) VALUES (?, ?, ?, ?, ?) ",
                            [profile.name.givenName, profile.id, accessToken, profile.emails[0].value, profile.name.givenName + ' ' + profile.name.familyName], (err, rows) => {
                                if (err)
                                    console.log(err)
                                return done(null, newUser);
                            });
                    } else {
                        return done(null, user);
                    }
                });
            });
        }))

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true,
        profileFields: configAuth.googleAuth.profileFields
    },
        function (req, accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                conn.query("SELECT * FROM user WHERE google_id = ?", [profile.id], (err, user) => {
                    if (err) {
                        return done(err);
                    } else if (user) {
                        let newUser = {
                            google_id: profile.id,
                            google_token: accessToken,
                            google_email: profile.emails[0].value,
                            google_name: profile.name.givenName + ' ' + profile.name.familyName
                        };

                        conn.query("INSERT INTO user (username, google_id, google_token, google_email, google_name) VALUES (?, ?, ?, ?, ?)",
                            [profile.name.givenName, profile.id, accessToken, profile.emails[0].value, profile.name.givenName + ' ' + profile.name.familyName], (err, rows) => {
                                if (err) {
                                    console.log(err);
                                }

                                return done(null, newUser);
                            });
                    } else {
                        return done(null, user);
                    }
                });
            });
        }
    ));
};
