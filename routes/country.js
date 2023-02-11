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

/* 国の一覧情報を表示. */
/* 例：curl http://localhost:3001/country */
/* connection.euqry(<SQL文>, function (err, rows, fields) {}); */
router.get("/", function (req, res, next) {
  if (!res.hasHeader) {
    // ここでヘッダーにアクセス許可の情報を追加
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    });
  } else {
    var query = "SELECT * FROM country";
    connection.query(query, (error, result) => {
      res.send(result);
    });
  }
});

module.exports = router;
