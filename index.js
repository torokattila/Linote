'use strict';

const express = require('express');

const app = express();
app.use(express.static('static'));
app.use(express.static('controller'));
app.set('view engine', 'ejs');
const PORT = (process.env.PORT || 3000);

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/main', (req, res) => {
    res.render('main');
});