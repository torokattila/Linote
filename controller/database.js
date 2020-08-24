const passport = require('passport');

require('dotenv').config();

const hostname = 'ec2-54-247-118-139.eu-west-1.compute.amazonaws.com:5432/d28ll9q8qtq9i5';
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const user_table = process.env.USER_TABLE;
const note_table = process.env.NOTE_TABLE;

module.exports = {
    'connection': {
        'host': hostname,
        'user': user,
        'password': password
    },
    'database': database,
    'user_table': user_table,
    'note_table': note_table
}