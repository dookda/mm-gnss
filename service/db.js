const Pool = require('pg').Pool

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gnss',
    password: '1234',
    port: 5432,
});

exports.db = db;