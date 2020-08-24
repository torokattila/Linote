const passport = require('passport');

require('dotenv').config();

const hostname = 'ec2-54-247-118-139.eu-west-1.compute.amazonaws.com';
const user = 'cfblthoxcnxaqd';
const password = '7b1dc6c614e676d194ad51ed67fdf5cd9049378f9f9a8b088a1823c65b5a9642';
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
    'note_table': note_table,
    'port': 5432
}