'use strict';

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = (process.env.PORT || 3000);

const app = express();
const passport = require('passport');
const flash = require('connect-flash');

require('./controller/passport')(passport);

app.use(express.static(__dirname + '/static'));
app.use(express.static('controller'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
// app.set('trust proxy', 1);
app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
}));
// app.use(function(req, res, next) {
//     if (!req.session) {
//         return next(new Error('Something went wrong with the session'))
//     }
//     next();
// });
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./controller/routes')(app, passport);

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})