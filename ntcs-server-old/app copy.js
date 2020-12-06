var express = require('express');
var createError = require('http-errors');
// 注册解析 表单数据的 body-parser
const bodyParser = require('body-parser')
// 将请求响应设置content-type设置为application/json
const users = require('./routes/users.js')
var route = require('./routes/index.js')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const port = 1337;
const hostname = '192.168.1.107';

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express()
// var app = a;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use('/api/*', function(req, res, next) {
//   // 设置请求头为允许跨域
//   res.header("Access-Control-Allow-Origin", "http://192.168.1.107:8080");
//   // 设置服务器支持的所有头信息字段
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   // 设置服务器支持的所有跨域请求的方法
//   res.header("Access-Control-Allow-Methods", "POST,GET");
//   // next()方法表示进入下一个路由

//   next();
// });



function onRequest(req, res, next) {
  // 设置请求头为允许跨域
  res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.107:8080");
  // 设置服务器支持的所有头信息字段
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // 设置服务器支持的所有跨域请求的方法
  res.setHeader("Access-Control-Allow-Methods", "POST,GET");
  res.writeHead(200, { "Content-Type": "application/json" })
  // res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.107:8080");

  // // res.setHeader("Access-Control-Allow-Headers", "content-type,x-requested-with,Authorization, x-ui-request,lang");
  route(req, res, next)
  // next()方法表示进入下一个路由
  // next();
}
var server = http.createServer(onRequest);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// console.log(server.listen)
// console.log('Server is running...');
// http.createServer((req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.writeHead(200, { "Content-Type": "application/json" });
//   var otherArray = ["item1", "item2"];
//   var otherObject = { item1: "item1val", item2: "item2val" };
//   var json = JSON.stringify({
//     anObject: otherObject,
//     anArray: otherArray
//   });
//   res.end(json)//！！一定要加配置的回调方法名  
//   // res.writeHead(200, { 'Content-Type': 'text/plain' });  
//   // res.end(addon.hello()); 

// }).listen(port, hostname, () => {

//   console.log(`Server running at http://${hostname}:${port}/test/`);
// });
// error handler


// 使用路由
app.use('/api/users', users);
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
