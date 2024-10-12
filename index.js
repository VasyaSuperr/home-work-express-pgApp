const { Pool } = require('pg');

// TODO: move to config.js /process.evv
const connectionOptions = {
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'phones_sales',
};

const pool = new Pool(connectionOptions);

// Завершити з'єднання з БД при завершенні роботи застосунку
process.on('beforeExit', () => pool.end());

// test
(async function () {
  try {
    const id = 1;
    const result = await pool.query(`
        SELECT *
        FROM users
        WHERE id = ${id};
    `);
    console.log(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
})();
