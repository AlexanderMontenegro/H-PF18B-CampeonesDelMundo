

const axios = require("axios");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = process.env.PORT|| 3001; 



//const app = express();
const httpServer = http.createServer(server);


const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});



let connectedUsers = 0;

io.on('connection', (socket) => {
  connectedUsers++;
  console.log('Usuario conectado');
  io.emit('updateUsers', connectedUsers); 

  socket.on('Hola', (msg) => {
    io.emit('hola1', msg); 
  });

  socket.on('disconnect', () => {
    connectedUsers--;
    console.log('Usuario desconectado');
    io.emit('updateUsers', connectedUsers); 
      });
});

conn.sync({ force:true }).then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
