const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  var data = {
    title: `Hello!`,
    content: "これは、サンプルのコンテンツです。<br>this is sample.",
  };
  res.render("hello", data);
});

router.get("/get", (req, res, next) => {
  var data = {
    title: `Hello!`,
    content: "これは、サンプルのコンテンツです。<br>this is sample.",
  };
  res.send(data);
});

// curl -X POST -H "Content-Type: application/json" -d '{"name":"太郎", "age":"30"}' http://localhost:3001/hello/get
router.post("/get", (req, res, next) => {
  var data = {
    title: req.body.name,
    content: req.body.age,
  };
  res.send(200, data);
});

module.exports = router;
