var express = require('express');
var app = express()
var http = require('http'); // 引入http模块
var createError = require('http-errors');
var server = http.createServer(onRequest);
// 注册解析 表单数据的 body-parser
const bodyParser = require('body-parser')
// 将请求响应设置content-type设置为application/json
// const users = require('./routes/users.js')
var route = require('./routes/index.js')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const port = 1337;
const hostname = '192.168.1.110';

// var indexRouter = require('./routes/index');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


function onRequest(req, res, next) {
  // 设置请求头为允许跨域
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  // 设置服务器支持的所有头信息字段
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  // 设置服务器支持的所有跨域请求的方法
  res.setHeader("Access-Control-Allow-Methods", "POST,GET");
  res.writeHead(200, { "Content-Type": "application/json" })
  res.write('eee')


  route(req, res, next)

  res.end()
}


// 使用路由
// app.use('/api/users', users);
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(bodyParser.urlencoded({
  extended: false
}))

//处理json格式
app.use(bodyParser.json())


server.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
});



module.exports = app;
