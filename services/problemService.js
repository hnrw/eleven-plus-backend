const Problem = require("../models/problem")
const verifyUser = require("../helpers/verifyUser")

const createProblem = async (data) => {
  const { question, correct, options } = data

  const problem = new Problem({
    question,
    correct,
    options,
  })

  const savedProblem = await problem.save()
  return {
    status: 200,
    data: savedProblem,
  }
}

module.exports = { createProblem }
