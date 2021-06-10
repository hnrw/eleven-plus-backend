const gradedTestsRouter = require("express").Router()
const GradedTest = require("../models/gradedTest")
const verifyUser = require("../helpers/verifyUser")

gradedTestsRouter.get("/", async (request, response) => {
  const user = await verifyUser(request, response)
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
