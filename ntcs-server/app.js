// 创建服务器
const express = require('express')
const app = express()
var http = require('http'); // 引入http模块
// 注册解析表单数据的 body-parser
const bodyParser = require('body-parser')
// var server = http.createServer();
var route = require('./routes/index.js')
const port = 1337;
const hostname = '192.168.1.110';

// function onRequest(req, res, next) {
//   // 设置请求头为允许跨域
//   res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
//   // 设置服务器支持的所有头信息字段
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   // 设置服务器支持的所有跨域请求的方法
//   res.setHeader("Access-Control-Allow-Methods", "POST,GET");
//   res.writeHead(200, { "Content-Type": "application/json" })
//   res.write('eee')

//   route(req, res, next)

//   res.end()
// }

app.use('/api/*', function(req, res, next) {
  // 设置请求头为允许跨域
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // 设置服务器支持的所有头信息字段
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods", "POST,GET");
  res.header('Access-Control-Expose-Headers', 'Authorization');

  // next()方法表示进入下一个路由

  next();
});
// post
app.use(bodyParser.urlencoded({
  extended: false
}))
//处理json格式
app.use(bodyParser.json())
app.use(route)


app.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
});
