const Problem = require("../models/problem")
const Test = require("../models/test")
const verifyUser = require("../helpers/verifyUser")

const createProblem = async (problemData, testId) => {
  const { question, correct, options } = problemData

  const problem = new Problem({
    question,
    correct,
    options,
    test: testId,
  })

  const savedProblem = await problem.save()

  const test = await Test.findById(testId)
  await test.update({ $push: { problems: savedProblem } })

  return {
    status: 200,
    data: savedProblem,
  }
}

module.exports = { createProblem }
