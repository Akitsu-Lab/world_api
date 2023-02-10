// 要のモジュールのロード
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// ルート用モジュールのロード
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var countryRouter = require("./routes/country");
// cors対策
var cors = require("cors");

// Expressオブジェクトの作成と基本設定
var app = express();

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
app.use("/country", countryRouter);

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

// cors対策
app.use(cors());
/* 公式サイト */
/* https://www.npmjs.com/package/cors */
//app.use(cors({
//    origin: 'http://localhost:3000', //アクセス許可するオリジン
//    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
//    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
//}))

// module.expressの設定
module.exports = app;
