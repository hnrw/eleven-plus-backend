const testSessionsRouter = require("express").Router()
const _ = require("lodash")
const Test = require("../models/test")
const Problem = require("../models/problem")
const GradedTest = require("../models/gradedTest")
const TestSession = require("../models/testSession")
const verifyUser = require("../helpers/verifyUser")
const { createProblem } = require("../services/problemService")
const answerService = require("../services/answerService")

testSessionsRouter.get("/", async (req, res) => {
  const user = await verifyUser(req, res)

  const testSession = await TestSession.findOne({ user: user.id })
  if (!testSession) {
    return res.send("no session exists")
  }
  res.send(testSession)
})

testSessionsRouter.get("/all", async (req, res) => {
  const testSessions = await TestSession.find({})
  res.send(testSessions)
})

testSessionsRouter.post("/", async (req, res) => {
  const user = await verifyUser(req, res)
  const { testId } = req.body

  const testSession = new TestSession({
    user: user.id,
    test: testId,
    start: Date.now(),
  })

  const savedTest = await testSession.save()
  res.send(savedTest)
})

module.exports = testSessionsRouter
