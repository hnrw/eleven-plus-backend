const mongoose = require("mongoose")
require("dotenv").config()
const Test = require("../models/test")
const Problem = require("../models/problem")
const Answer = require("../models/answer")
const GradedTest = require("../models/gradedTest")
const User = require("../models/user")
const logger = require("../utils/logger")

mongoose.connect(
  "mongodb+srv://mongodb:mongodb@cluster0.nef7l.mongodb.net/eleven-plus-test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const deleteUser = async (email) => {
  const user = await User.findOne({ email })
}

const deleteTests = async () => {
  const tests = await Test.find({})
  tests.map(async (t) => {
    await t.remove(t)
    logger.info(`deleted test  ${t.question}`)
  })

  const problems = await Problem.find({})
  problems.map(async (p) => {
    await p.remove(p)
  })

  const answers = await Answer.find({})
  answers.map(async (a) => {
    a.remove(a)
  })
}

deleteUser()
mongoose.disconnect()
