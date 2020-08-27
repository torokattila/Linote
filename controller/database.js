const passport = require('passport');

require('dotenv').config();

const hostname = 'eu-cdbr-west-03.cleardb.net';
const user = 'b314217d377070';
const password = 'e44978254bef266';
const database = 'heroku_d92ce9cc8707b45';
const user_table = process.env.USER_TABLE;
const note_table = process.env.NOTE_TABLE;

module.exports = {
    'connection': {
        'connectionLimit': 50,
        'host': hostname,
        'user': user,
        'password': password
    },
    'database': database,
    'user_table': 'user',
    'note_table': 'note',
    'port': 3306
}