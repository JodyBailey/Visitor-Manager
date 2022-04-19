require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.SQL_USER || "user",
  password: process.env.SQL_PASS,
  host: process.env.SQL_HOST || "localhost",
  database: process.env.SQL_DATABASE || "db",
  port: process.env.SQL_PORT || "5432",
});

module.exports = { pool };
