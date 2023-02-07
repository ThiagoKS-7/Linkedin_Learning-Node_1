const express = require("express");
const {resolve} = require('path');
const router = express.Router();
const msgSchema = require('../validators/msgValidator.js')
const io  = require('../socket.js');
const mongoose = require('mongoose');

// const messages = []
const Message = mongoose.model('Message', {
  name: String,
  message: String,
})

function handleValidation(req, res, conf) {
  try {
    const data = msgSchema.validate(req.body, conf);
    if (data) {
      const message = new Message(data);
      messages.save((err) => {
        if (err) res.status(500);
        io.emit('message', data);
        messages.push(data);
        return res.status(200).json({
         message: "Success"
        })
      })
    }

  } 
  catch (e) {
    return res.status(422).json({
      message: e
     })
  }
}
router.get("/", function (req, res) {
    res.sendFile(resolve("index.html"));
  });
router.get("/messages", function (req, res) {
  Message.find({}, (err,messages) => {
    res.send(messages);  
  })
});
router.post("/messages", function (req, res) {
  const conf = {
    abortEarly: false,
    stripUnknown: true,
  }
  handleValidation(req, res, conf);
});

module.exports = router;