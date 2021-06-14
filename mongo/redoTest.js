const mongoose = require("mongoose")
require("dotenv").config()
const Test = require("../models/test")
const Problem = require("../models/problem")
const Answer = require("../models/answer")
const GradedTest = require("../models/gradedTest")
const logger = require("../utils/logger")

mongoose.connect(
  "mongodb+srv://mongodb:mongodb@cluster0.nef7l.mongodb.net/eleven-plus-test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const redo = async () => {
  const answers = await Answer.find({})
  answers.map(async (a) => {
    a.remove(a)
  })

  const gradedTests = await GradedTest.find({})
  gradedTests.map(async (t) => {
    t.remove(t)
  })
}

redo()
