const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(express.urlencoded({ extended: true }));
//server.use(bodyParser);
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use('/api', router);
server.use(router)




module.exports = server;