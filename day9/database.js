const { createPool } = require("mysql");
require("dotenv").config({ path: "./.env" });
const util = require("util");

// console.log("process.env.MYSQL_DB ", process.env.MYSQL_DB);
const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  user: process.env.DB_USER,
  connectionLimit: 100,
  acquireTimeout: 1000000,
});

const poolPromotion = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST_promotion,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB_promotion,
  user: process.env.DB_USER,
  connectionLimit: 100,
  acquireTimeout: 1000000,
});

let performQuery = util.promisify(poolPromotion.query).bind(poolPromotion);

module.exports = { pool, poolPromotion, performQuery };
