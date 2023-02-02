let fs = require("fs");


/* Retorna string */
fs.readdir("/home/thiago/Linux/", (err, data) => {
    console.log(data);
});