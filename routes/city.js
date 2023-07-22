var express = require("express");
var router = express.Router();

// MySQLモジュールのロード
var mysql = require("mysql2");

// .envモジュールのロード
var result = require("dotenv").config();

/********************************
 * DB接続情報
 *********************************/
var env = process.env;
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

/********************************
 * cityの一覧情報を表示.
 * 例：curl http://localhost:3001/city
 *********************************/

router.get("/", function (req, res, next) {
  try {
    res.set({ "Access-Control-Allow-Origin": "*" });
    res.set({ "Access-Control-Request-Private-Network": "true" });
    var query = "SELECT * FROM city";
    connection.query(query, (error, result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

/********************************
 * cityの一件(id)情報を表示.
 * 例：curl http://localhost:3001/city/1
 *********************************/

router.get("/:id", function (req, res, next) {
  const { id } = req.params;

  const sql = "SELECT * FROM city WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (err, result) => {
    res.send(result);
  });
});

/********************************
 * cityの一件(name)情報を表示.
 * 例：curl http://localhost:3001/city/name/tokyo
 *********************************/

router.get("/name/:name", function (req, res, next) {
  const name = "%" + req.params.name + "%";
  const sql = "SELECT * FROM city WHERE name LIKE ?";
  const values = [name];

  connection.query(sql, values, (err, result) => {
    res.send(result);
  });
});

/********************************
 * cityを追加する.
 * 例: curl -X POST -H "Content-Type: application/json" -d '{"id": "5000", "name": "SOTAcity", "countryCode": "JPN", "district": "SOTA", "population": "1"}' http://localhost:3001/city
 *********************************/

router.post("/", (req, res) => {
  const { id, name, countryCode, district, population } = req.body;

  const sql =
    "INSERT INTO city (id, name, countryCode, district, population) VALUES (?, ?, ?, ?, ?)";
  const values = [id, name, countryCode, district, population];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("データを挿入できませんでした：", err);
      res.status(500).send("データを挿入できませんでした");
    } else {
      console.log("データを挿入しました");
      res.status(200).send("データを挿入しました");
    }
  });
});

module.exports = router;

/********************************
 * cityを更新する.
 * 例: curl -X PUT -H "Content-Type: application/json" -d '{"name": "SOTA"}' http://localhost:3001/city/1
 *********************************/

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const sql = "UPDATE city SET name = ? WHERE id = ?";
  const values = [name, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("データを更新できませんでした：", err);
      res.status(500).send("データを更新できませんでした");
    } else {
      console.log("データを更新しました");
      res.status(200).send("データを更新しました");
    }
  });
});

/********************************
 * cityを削除する.
 * 例: curl -X DELETE http://localhost:3001/city/1
 *********************************/

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM city WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("データを削除できませんでした：", err);
      res.status(500).send("データを削除できませんでした");
    } else {
      console.log("データを削除しました");
      res.status(200).send("データを削除しました");
    }
  });
});
