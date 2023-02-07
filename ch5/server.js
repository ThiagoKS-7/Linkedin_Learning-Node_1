const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const http = createServer(app);
const routes = require("./routes/index.js");
const io = new Server(http, { /* options */ });

require('dotenv').config();
app.use(bodyParser.json());
app.use("/api/v1", routes);
io.on('connection', (socket) => {
    console.log("user connected");
})
http.listen(process.env.API_PORT, () => {
    console.log(`serving on http://localhost:${process.env.API_PORT}/api/v1`)
})