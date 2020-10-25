var createError = require('http-errors');
var route = require('./routes/index.js')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const port = 1337;
const hostname = '192.168.1.105';

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
app.use(function (req, res, next) {
  next(createError(404));
});
function onRequest (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, { "Content-Type": "application/json" })
  // res.setHeader("Access-Control-Allow-Headers", "content-type,x-requested-with,Authorization, x-ui-request,lang");
  route(req, res)
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
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
