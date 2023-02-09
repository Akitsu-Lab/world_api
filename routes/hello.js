const express = require("express");
const router = express.Router();

// MySQLモジュールのロード
var mysql = require('mysql2');
var result = require('dotenv').config()
// curl http://localhost:3001/hello?name=sota&mail=sota@gmail.com
router.get("/", (req, res, next) => {
    var name = req.query.name;
    var mail = req.query.mail;
    var data = {
        title: 'Hello!',
        content: `あなたの名前は、` + name + '。<br>' + `メールアドレスは` + mail + 'です。'
    };
    res.render("hello", data);
});

// curl http://localhost:3001/hello/form
router.get('/form', (req, res, next) => {
    var msg = '*何か書いて送信してください。';
    if (req.session.message != undefined) {
        msg = "Last Message:" + req.session.message;
    }
    var data = {
        title: 'Hello',
        content: msg
    };
    res.send(data)
})

// curl http://localhost:3001/hello/form -X POST -H "Content-Type: application/json" -d '{"message":"Node.jsのExpressはメジャーなフレームワークである。"}'
router.post('/form', (req, res, next) => {
    var msg = req.body['message'];
    req.session.message = msg;
    var data = {
        title: 'Hello!',
        content: "Last Message: " + req.session.message
    };
    res.send(data);
})
// router.get("/get", (req, res, next) => {
//   var data = {
//     title: `Hello!`,
//     content: "これは、サンプルのコンテンツです。<br>this is sample.",
//   };
//   res.send(data);
// });

// // curl -X POST -H "Content-Type: application/json" -d '{"name":"太郎", "age":"30"}' http://localhost:3001/hello/get
// router.post("/get", (req, res, next) => {
//   var data = {
//     title: req.body.name,
//     content: req.body.age,
//   };
//   res.send(200, data);
// });

// DB接続情報
const env = process.env
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

// テーブルcityのデータを取得
// curl -v -sS http://localhost:3001/hello/list
router.get('/list', (req, res) => {
  connection.query(
    'SELECT * FROM city',
    (error, result) => {
      res.send(result);
    }
  );
});

// curl -v -sS http://localhost:3001/hello/find
router.get('/find', (req, res) => {
  connection.query(
    'SELECT * FROM city',
    (error, result) => {
      res.send(result[0].Name);
    }
  );
});

// curl -v -sS http://localhost:3001/hello/findId/1
// connection.euqry(<SQL文>, function (err, rows, fields) {});
router.get('/findId/:id', (req, res) => {
console.log(req.params.id)
  connection.query(
    'SELECT * FROM city where id=?',[req.params.id],
    (error, result) => {
      res.send(result);
    }
  );
});

// curl -v -sS http://localhost:3001/hello/findName/tokyo
// connection.euqry(<SQL文>, function (err, rows, fields) {});
router.get('/findName/:name', (req, res) => {
console.log(req.params.name)
var query = '%'+req.params.name+'%'
  connection.query(
//    'SELECT * FROM city where Name=?',[req.params.name],
    'SELECT * FROM city where Name like ?',[query],
    (error, result) => {
      res.send(result);
    }
  );
});

// curl -v -sS http://localhost:3001/hello/country/japan
// connection.euqry(<SQL文>, function (err, rows, fields) {});
router.get('/country/:name', (req, res) => {
console.log(req.params.name)
var query = '%'+req.params.name+'%'
  connection.query(
//    'SELECT * FROM city where Name=?',[req.params.name],
    'SELECT * FROM country where Name like ?',[query],
    (error, result) => {
      res.send(result);
    }
  );
});

// データベースに接続できたらコンソールにConnectedを表示
//connection.connect(function(err) {
//  if (err) throw err;
//  console.log('Connected');
//});

module.exports = router;
