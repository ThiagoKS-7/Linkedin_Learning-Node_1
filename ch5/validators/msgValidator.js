const yup = require("yup");
const msgSchema = yup.object({
    name: yup.string().min(0).max(50),
    message: yup.string().min(0).max(10000),
})

module.exports = msgSchema;