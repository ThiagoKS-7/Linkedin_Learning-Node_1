let fs = require("fs");

/* Retorna o obj */
let data = require("../data.json");
console.log(data.name);

/* Retorna string */
fs.readFile("./data.json","utf-8", (err, data) => {
    data = JSON.parse(data);
    console.log(data.name);
});