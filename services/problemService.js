const Problem = require("../models/problem")
const Test = require("../models/test")
const verifyUser = require("../helpers/verifyUser")

const createProblem = async (problemData, testId) => {
  const { question, correct, options, multi, unit, num } = problemData

  const problem = new Problem({
    question,
    correct,
    options,
    multi: multi || false,
    test: testId,
    unit,
    num,
    date: Date.now(),
  })

  const savedProblem = await problem.save()

  const test = await Test.findById(testId)
  await test.updateOne({ $push: { problems: savedProblem } })
  // wait test.update({ $push: { problems: savedProblem } })

  return {
    status: 200,
    data: savedProblem,
  }
}

module.exports = { createProblem }
