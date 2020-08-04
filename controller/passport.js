const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const dbconfig = require('./database');

const conn = mysql.createConnection(dbconfig.connection);

conn.query('USE ' + dbconfig.database);

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        conn.query("SELECT * FROM user WHERE id = ? ", [id], (err, rows) => {
            done(err, rows[0]);
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
};