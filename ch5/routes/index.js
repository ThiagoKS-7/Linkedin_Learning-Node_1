const express = require("express");
const yup = require("yup");
const {resolve} = require('path');
const router = express.Router();
const io  = require('../socket.js');


const messages = []

const msgSchema = yup.object({
  name: yup.string().min(0).max(50),
  message: yup.string().min(0).max(10000),
})

function handleValidation(req, res, conf) {
  try {
    const data = msgSchema.validate(req.body, conf);
    io.emit('message', data);
    messages.push(data);
    return res.status(200).json({
     message: "Success"
    })
  } 
  catch (e) {
    console.log(e)
  }
}
io.on('connection', (socket) => {
  console.log("user connected");
})

// Home page route.
router.get("/", function (req, res) {
    res.sendFile(resolve("index.html"));
  });
router.get("/messages", function (req, res) {
  res.send(messages);
});
router.post("/messages", function (req, res) {
  const conf = {
    abortEarly: false,
    stripUnknown: true,
  }
  handleValidation(req, res, conf);
});

module.exports = router;