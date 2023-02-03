const express = require('express');
const app = express();
const routes = require("./routes/index.js");

require('dotenv').config();
app.use("/api/v1", routes);

app.listen(process.env.API_PORT, () => {
    console.log(`serving on http://localhost:${process.env.API_PORT}/api/v1`)
})