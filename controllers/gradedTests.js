const gradedTestsRouter = require("express").Router()
const _ = require("lodash")
const Test = require("../models/test")
const Problem = require("../models/problem")
const Answer = require("../models/answer")
const GradedTest = require("../models/gradedTest")
const verifyUser = require("../helpers/verifyUser")
const { createProblem } = require("../services/problemService")
const answerService = require("../services/answerService")

gradedTestsRouter.get("/", async (request, response) => {
  const user = verifyUser(request, response)
  const gradedTests = await GradedTest.find({ user })
  response.send(gradedTests)
})

gradedTestsRouter.get("/:id", async (request, response) => {
  const user = await verifyUser(request, response)
  const { id } = request.params
  const gradedTest = await GradedTest.findById(id)

  if (!gradedTest.user.equals(user._id)) {
    return response.status(400).send({ error: "unauthorized" })
  }

  return response.send(gradedTest)
})

gradedTestsRouter.get("/all", async (request, response) => {
  const gradedTests = await GradedTest.find({})
  response.send(gradedTests)
})

module.exports = gradedTestsRouter
