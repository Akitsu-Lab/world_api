var express = require("express");
var router = express.Router();

/* GET home page. */
/* router.get( アドレス , 関数 ) */
router.get("/", function (req, res, next) {
  //indexは、index.ejsのこと
  res.render("index", { title: "Express" });
});

module.exports = router;
