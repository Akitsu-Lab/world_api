// 要のモジュールのロード
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require('express-session'); // express-sessionのロード
// MySQLモジュールのロード
var mysql = require('mysql2');

// ルート用モジュールのロード
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var helloRouter = require("./routes/hello");

// Expressオブジェクトの作成と基本設定
var app = express();

var session_opt = {
    secret: 'keyboard cat',
    resave: 'false',
    saveUninitialized: 'false',
    cookie: { maxAge: 60 * 60 * 1000 }
}

// MySQL接続情報
var connection = mysql.createConnection({
    host: 'world_db',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'world'
})

// データベースに接続できたらコンソールにConnectedを表示
connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});

app.listen(3000);

app.use(session(session_opt));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.useによる関数組み込み
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// アクセスのためのapp.use作成
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hello", helloRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.expressの設定
module.exports = app;
