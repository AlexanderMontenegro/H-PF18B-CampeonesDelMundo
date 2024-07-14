/*
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = process.env.PORT||400;

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
*/

const axios = require("axios");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = process.env.PORT||process.env.DATABASE_UR || 4000; 


const app = express();
const httpServer = http.createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    io.emit('message', msg); 
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


conn.sync({ force: true }).then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
