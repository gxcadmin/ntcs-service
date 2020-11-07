var express = require('express');
var router = express.Router();
var url = require('url')
var model = require('../models/user_model.js')

function route_user(req, res) {
  console.log(3333333)
  //登录
  router.post('/api/user', function(req, res) {
    console.log('ddd')
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    select('SELECT * FROM name WHERE name = "' + name + '" AND password = "' + password + '";').then(function(data) {
      //session存user name和userid
      req.session.user = name;
      data.status > 50 ? data.url = '/html/index.html' : null;
      res.json(data);
      res.end();
      req.redirect("/");
    }).catch(function(err) { })

  })

  //注册
  router.post('/register', function(req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;
    console.log(name + "  " + password)
    select('SELECT * FROM name WHERE name = "' + name + '";')
      .then(function(data) {
        if (data.status == 99999) {
          console.log("已有此用户名")
          res.json({ status: 00000 });
          res.end();
        } else {
          select('INSERT INTO name(name,password) VALUES ("' + name + '", "' + password + '");')
            .then(function(data) {
              res.json({ status: 99999 });
              res.end();
            }).catch(function(err) { })
        }
      }).catch(function(err) {

      })

  });

  //退出
  router.get("/logout", function(req, res) {
    delete req.session.user;
    res.end();
  })

  //获取session
  router.get("/session", function(req, res) {
    console.log("user in session");
    console.log(req.session.user);
    res.json({ user: req.session.user });
    res.end();
  })
}
module.exports = router;

// function route_user(req, res) {
//   console.log(req)
//   var path = url.parse(req.url).pathname;
//   console.log(path, 'path1')
//   var flag = path.match(/[a-zA-Z]+$/)[0];
//   console.log('aaaa', flag)
//   model[flag](req, res);
//   console.log(path)
// }
// /* GET users listing. */
// console.log(router)
// router.get('/user', function(req, res, next) {
//   console.log('rrr', 55)
//   res.send('respond with a resource');
// });

module.exports = route_user;
