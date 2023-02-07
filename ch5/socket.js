const { Server } = require("socket.io");
const http = require("http");
const io = new Server(http, { /* options */ })
module.exports = io;