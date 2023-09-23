const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: '123!',
    database: 'jewelry_store'
});

module.exports = pool;
