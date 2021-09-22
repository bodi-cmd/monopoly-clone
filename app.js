const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3000;


app.set('view engine', 'ejs');
require("./app/routes/room.routes.js")(app);
require("./app/sockets/game.sockets.js")(io);



server.listen(port, function() {
  console.log("\x1b[41m",`Server is listening on ${port}!`,'\x1b[0m',)
})