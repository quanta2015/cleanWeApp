#!/usr/bin/env node
const http = require('http');
const https = require('https')
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const router = require('./router/index')
const app = express()

app.use(compression())
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'jade');


app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/admin'));
app.use('/', router)

// 错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


var options = {
  key: fs.readFileSync('./key/qmca.xyz.key'),
  cert:fs.readFileSync('./key/qmca.xyz.pem')
}

// var servers = https.createServer(options,app).listen(443)
// servers.on('error', onError)
// servers.on('listening', onListening)


var server = http.createServer(options,app).listen(80)



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = servers.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

