const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)
const routes = require("./routes/index.js");

require('dotenv').config();
app.use(bodyParser.json());
app.use("/api/v1", routes);

app.listen(process.env.API_PORT, () => {
    console.log(`serving on http://localhost:${process.env.API_PORT}/api/v1`)
})