const { Pool } = require('pg');
const Phone = require('./phone');

const connectionOptions = {
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'phones_sales',
};

const pool = new Pool(connectionOptions);

process.on('beforeExit', () => pool.end());

const db = {};
db.pool = pool;

db.Phone = Phone;
Phone.pool = pool;

module.exports = db;
