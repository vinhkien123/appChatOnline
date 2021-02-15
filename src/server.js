const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000
const router = require('express').Router()
var path = require('path');
const socketModule = require('./sockets/socket');
const realtimeModule = require('./realtimes/realtime');
const notification = require('./notification/notification');
const data = require('./database/database')
//Support json encoded bodies
global.arrayUser = []
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public/build')))
// app.use(express.static(path.join(__dirname, 'public/build1')))
// app.get('/admin', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public/build1', 'index.html'));
// });
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
// });

init = function () {
  realtimeModule.realtime(io);
  socketModule.socket(io)
  server.listen(port);
  console.log(`running on port: ${port}`);
}

init();