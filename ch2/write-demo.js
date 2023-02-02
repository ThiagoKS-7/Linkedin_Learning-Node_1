let fs = require('fs');

let data = {
    name: 'Thiago'
}
fs.writeFileSync("data2.json", JSON.stringify(data), (err) => {
    console.log("write finished", err);
});