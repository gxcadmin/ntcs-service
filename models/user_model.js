var dbClient = require('../db.js')
var url = require('url');
var querystring = require('querystring');
// var MongoClient = require('mongodb').MongoClient;
// var username = 'gaoxiaochu';
// var DB_CONN_STR = "select * from user where name='" + username + "'";
let USER_SQL = "SELECT * FROM user"



function login (req, res) {

  var qStr = url.parse(req.url).query;
  console.log(qStr)
  var name = querystring.parse(qStr)["id"];
  var pwd = querystring.parse(qStr)["pwd"];
  dbClient.connect(USER_SQL, function (err, db) {
    var collection = db.collection('user');
    collection.findOne({ name: name }, { pwd: true }, function (err, result) {
      if (err) { console.log(err); return; }
      if (!result) res.end("用户名不存在...");
      else if (pwd == result.pwd) res.end("1");
      else res.end("密码错误...");
      console.log('验证完毕...');
    })
    db.close();
  });
  // db.query(USER_SQL, function (err, res) {
  //   console.log(name)

  // })


  db.connect((err) => {
    if (err) throw err;
    return
    console.log('11y', err)
    console.log('link at success')
  })
  db.query(USER_SQL, (err, result) => {
    if (err) {
      console.log('22y', err)
    } else {
      console.log(result)
      res.end('查询成功')
      res.end(result)
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