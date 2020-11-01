var express = require('express');
var router = express.Router();
var url = require('url')
var model = require('../models/user_model.js')

function route_user (req, res) {
  var path = url.parse(req.url).pathname;
  var flag = path.match(/[a-zA-Z]+$/)[0];
  model[flag](req, res);
  console.log(path)
}
/* GET users listing. */
router.get('/', function (req, res, next) {

  res.send('respond with a resource');
});

module.exports = route_user;
