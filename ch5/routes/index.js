const express = require("express");
const yup = require("yup");
const {resolve} = require('path');
const router = express.Router();


const messages = [
  {
    name: "Tim",
    message: "Hi"
  },
  {
    name: "Jane",
    message: "Hello"
  }
]

const msgSchema = yup.object({
  name: yup.string().required().min(0).max(50),
  message: yup.string().required().min(0).max(10000),
})

// function handleValidation(req, res, conf) {
//   try {
//     console.log(req.body)
//     const data = msgSchema.validate(req, conf);
//     message.push(data);
//     return res.status(200).json({
//      message: "Success"
//     })
//   } 
//   catch (e) {
//     return res.status(422).json({
//       errors: e.errors
//     })
//   }
// }

// Home page route.
router.get("/", function (req, res) {
    res.sendFile(resolve("index.html"));
  });
router.get("/messages", function (req, res) {
  res.send(messages);
});
io.on('connection', (socket) => {
  console.log("user connected");
})
router.post("/messages", function (req, res) {
  try {
    messages.push(req.body);
    res.sendStatus(200);
  } catch(e) {
    res.sendStatus(400);
  }
});

module.exports = router;