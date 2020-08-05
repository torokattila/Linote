const dbconfig = require('./database');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const conn = mysql.createConnection(dbconfig.connection);

conn.query('USE ' + dbconfig.database);

module.exports = function (app, passport) {
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.post('/', passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/login',
        failureFlash: true
    }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/main',
        failureRedirect: '/signup',
        failureFlash: true
    }));


    app.get('/main', isLoggedIn, function (req, res) {
        let noteArray = [];
        const user = req.user;
        
        conn.query("SELECT note_id, title, content FROM note WHERE user_id = ?", [user.id], function(err, rows) {
            if (err) {
                console.log(err);
            }

            let queryRows = JSON.parse(JSON.stringify(rows));

            queryRows.forEach(row => {
                noteArray.push(row);
            })
            
            res.render('main', {
                user: req.user,
                note: req.note,
                notesArray: noteArray
            });
        });


        
    });

    app.post('/add', function (req, res) {
        let user = req.user;
        let title = req.body.newNoteTitleInput;
        let content = req.body.newNoteTextarea;

        conn.query("INSERT INTO note (user_id, title, content) VALUES (?, ?, ?)", [user.id, title, content], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                return rows;
            }
        });
        
        res.redirect('/main');
    });

    app.post('/delete/:noteId', isLoggedIn, function (req, res) {
        let user = req.user;
        let noteId = req.body.noteId;

        conn.query("SELECT user_id, note_id FROM note JOIN user ON note.user_id = user.id WHERE user_id = ?", [user.id], function (err, rows) {
            if (err) {
                console.log(err);
            }
            conn.query("DELETE FROM note WHERE note_id = ?", [noteId], (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    return rows;
                }
            });
        }); 

        res.redirect('/main');
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    })
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};