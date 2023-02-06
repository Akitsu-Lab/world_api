const express = require("express");
const router = express.Router();

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

module.exports = router;
