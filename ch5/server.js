const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const app = express();
const http = createServer(app);
const routes = require("./routes/index.js");
const io = new Server(http, { /* options */ });

require('dotenv').config();
app.use(bodyParser.json());
app.use("/api/v1", routes);
io.on('connection', (socket) => {
    console.info("[SOCKET] - A new user connected!");
})
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_STR, (err) => {
    if (err != null) {
        console.error("connection - ", err)
    }
    else {
        console.info("[INFO] DB connection established!")
    }
});
http.listen(process.env.API_PORT, () => {
    console.log(`\n- Hosting on http://localhost:${process.env.API_PORT}/api/v1\n`)
})