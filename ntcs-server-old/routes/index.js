var express = require('express');
var router = express.Router();
var url = require('url');
var route_user = require('./user');


function route(res, req, next) {
  console.log(req)
  // if (res.url ==)
  let url = res.url
  var flag = url.match(/(\/)([a-zA-Z]+)(\/)/);
  // console.log('flag', flag.input)
  switch (flag.input) {
    case '/api/user/login': route_user(res, req); break;
    case 'person': route_person(req, res); break;
    default: break;
  }
}



module.exports = route;
