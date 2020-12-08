const db = require('../sql/db.js');
// const jwt = require('../token.js');
exports.login = (req, res) => {
  let {
    name,
    password
  } = req.body;
  console.log(req.body)
  // 查询语句
  let sql = 'select * from prosen where name = ?'
  db.base(sql, name, (result) => {
    if (!result.length) {
      return res.json({
        status: -1,
        msg: '登录失败'
      })
    } else {
      if (result[0].password == password) {
        // let token = jwt.creatToken({
        //   login: true,
        //   name: name
        // });
        return res.json({
          status: 1,
          msg: '登录成功',
          // token: token
        })
      }
      return res.json({
        status: -2,
        msg: '密码错误'
      })
    }
  })
}
var addSql = 'INSERT INTO prosen(name,password,email) VALUES(?,?,?)';
exports.register = (req, res) => {
  let {
    name,
    password,
    email
    // token
  } = req.body;
  // console.log(req.body);
  var addSqlParams = [req.body.name, req.body.password, req.body.email]
  // 'INSERT INTO users SET  ?',{username:'jack',firstname:'lu'
  db.base(addSql, addSqlParams, function(result, err) {
    console.log('err', err)
    console.log(result.affectedRows, 'result')
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      res.end("0");//如果注册失败就给客户端返回0
      return;//如果失败了就直接return不会继续下面的代码
    }
    result.message = "OK"
    var msgs = JSON.stringify(result);
    msgs.message = "OK"
    console.log(msgs);
    res.end(msgs);
    // res.end(result);//如果注册成功就给客户端返回1
    // console.log("OK");
  });
  // console.log(response);
}