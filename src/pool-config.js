require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  host: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  port: process.env.SQL_PORT,
});

module.exports = { pool };
