const mongoose = require("mongoose")
require("dotenv").config()
const Test = require("../models/test")
const User = require("../models/user")
const Problem = require("../models/problem")
const Answer = require("../models/answer")

mongoose.connect(
  "mongodb+srv://mongodb:mongodb@cluster0.nef7l.mongodb.net/eleven-plus-test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)

const deleteAnswers = async () => {
  const answers = await Answer.find({})

  answers.forEach((a) => {
    a.remove(a)
  })

  await User.updateMany({}, { answers: [] })
  await Problem.updateMany({}, { answers: [] })
  // await Problem.updateOne({ _id: "60be277af070d06169c243db" }, { answers: [] })
}

deleteAnswers()
mongoose.disconnect()
