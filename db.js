var mysql = require('mysql');
// var db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'ntcstest'
// });
// connection.connect();


exports.base = (sql, data, callback) => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
  });
  db.connect();

  db.query(sql, data, function(error, results, fields) {
    if (error) throw error;
    callback(results);
    console.log('数据库连接成功');
  })
  db.end();
}
// module.exports = db;