const User = require("../models/user")
const Test = require("../models/test")
const Problem = require("../models/problem")
const Answer = require("../models/answer")
const verifyUser = require("../helpers/verifyUser")

const createAnswer = async (data) => {
  const { selected, problemId, user } = data

  const answer = new Answer({
    selected,
    problem: problemId,
    user,
    date: Date.now(),
  })
  const savedAnswer = await answer.save()

  await user.updateOne({ $push: { answers: savedAnswer } })

  await Problem.updateOne(
    { _id: problemId },
    { $push: { answers: savedAnswer } }
  )

  return { status: 200, data: savedAnswer }
}

module.exports = { createAnswer }
