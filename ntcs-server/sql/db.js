const mysql = require('mysql');

exports.base = (sql, data, callback) => {
  const connection = mysql.createConnection({
    host: '192.168.1.105',
    user: 'root',
    password: '123456',
    database: 'ntcstest'
  });
  connection.connect();

  connection.query(sql, data, function(error, results, fields) {
    if (error) throw error;
    callback(results);
    console.log('数据库连接成功');
  })
  connection.end();
}
