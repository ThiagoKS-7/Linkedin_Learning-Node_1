let express = require('express');
let app = express();

let server = app.listen(3000, () => {
    console.log("serving on http://localhost:" + server.address().port)
})