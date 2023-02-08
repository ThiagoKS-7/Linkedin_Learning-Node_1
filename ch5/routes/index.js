const express = require("express");
const {resolve} = require('path');
const router = express.Router();
const msgSchema = require('../validators/msgValidator.js')
const io  = require('../socket.js');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const Message = mongoose.model('Message', {
  name: String,
  message: String,
})

async function handleValidation(req, res, conf) {
  try {
    const data = msgSchema.validate(req.body, conf);
    var message = new Message(req.body);
    if (data) {
        await message.save();

        const censored =  await Message.findOne({message: 'badword'})   ;
               
        if (censored) return Message.deleteOne({_id: censored.id});

        io.emit('message', data);
        return res.status(200).json({
          message: "Success"
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
router.get("/messages/:user", function (req, res) {
  const user = req.params.user;
  Message.find({name: user}, (err,messages) => {
    res.send(messages);  
  })
});
router.post("/messages", async function (req, res) {
  const conf = {
    abortEarly: false,
    stripUnknown: true,
  }
  await handleValidation(req, res, conf);
});

module.exports = router;