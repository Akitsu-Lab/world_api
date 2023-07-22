var express = require("express");
var router = express.Router();

// MySQLモジュールのロード
var mysql = require("mysql2");

// .envモジュールのロード
var result = require("dotenv").config();

// DB接続情報
var env = process.env;
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

/********************************
 * 国の一覧情報を表示.
 * 例：curl http://localhost:3001/country
 * connection.euqry(<SQL文>, function (err, rows, fields) {});
 *********************************/

router.get("/", function (req, res, next) {
  try {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.set({ "Access-Control-Request-Private-Network": "true" });
    var query = "SELECT * FROM country";
    connection.query(query, (error, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
