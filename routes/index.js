var express = require('express');
var router = express.Router();
var url = require('url');
var route_user = require('./users');
/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

function route(req, res) {
  //req.setEncode("utf-8");
  var path = url.parse(req.url).pathname;
  console.log('index.js', path)
  var flag = path.match(/(\/)([a-zA-Z]+)(\/)/)[5];
  console.log('flag', flag)
  switch (flag) {
    case 'api': route_user(req, res); break;
    case 'person': route_person(req, res); break;
    default: res.end(); break;
  }
  console.log('flag1', flag)
}

module.exports = route;
