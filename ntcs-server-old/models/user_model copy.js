var db = require('../db.js')


var url = require('url');
var querystring = require('querystring');
// var MongoClient = require('mongodb').MongoClient;
// var username = 'gaoxiaochu';
// var DB_CONN_STR = "select * from user where name='" + username + "'";
let sql = "SELECT * FROM user"

function login (req, res) {

  var qStr = url.parse(req.url).query;
  var name = querystring.parse(qStr)["id"];
  var pwd = querystring.parse(qStr)["pwd"];
  db.connect((err) => {
    if (err) throw errr;
    console.log('link at success')
  })
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.end('查询成功')
      return

    }

  })
}

function add () { }
function del () { }
function update () { }
function get () { }
module.exports = {
  login: login,
  add: add,
  del: del,
  update: update,
  get: get
};



// var username = 'gaoxiaochu';
// var sql = "select * from user where name='" + username + "'";
// connection.query(sql, function (err, rows, fields) {
//   if (err)
//     console.log(err);
//   else {
//     console.log('111', rows);
//   }
//   connection.end();//记得关闭连接
// });           