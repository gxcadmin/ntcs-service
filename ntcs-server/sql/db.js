const mysql = require('mysql');

exports.base = (sql, data, callback) => {
  const connection = mysql.createConnection({
    host: '192.168.1.110',
    user: 'root',
    password: '123456',
    database: 'ntc_sql',
    port: 5506,
    // dialectOptions: {
    //   socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    // },

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  connection.connect();

  connection.query(sql, data, function(error, results, fields) {
    if (error) throw error;
    callback(results);
    console.log('数据库连接成功');
  })
  connection.end();
}
