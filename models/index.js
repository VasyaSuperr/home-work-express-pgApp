const { Pool } = require('pg');

const connectionOptions = {
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'phones_sales',
};

const pool = new Pool(connectionOptions);

process.on('beforeExit', () => pool.end());

module.exports = pool;
