const testSessionsRouter = require("express").Router()
const _ = require("lodash")
const { PrismaClient } = require("@prisma/client")
const Test = require("../models/test")
const Problem = require("../models/problem")
const GradedTest = require("../models/gradedTest")
const TestSession = require("../models/testSession")
const verifyUser = require("../helpers/verifyUser")
const { createProblem } = require("../services/problemService")
const answerService = require("../services/answerService")

const prisma = new PrismaClient()

testSessionsRouter.get("/", async (req, res) => {
  const user = await verifyUser(req, res)

  const testSession = await prisma.testSession.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!testSession) {
    return res.send("no session exists")
  }
  res.send(testSession)
})

testSessionsRouter.get("/all", async (req, res) => {
  const testSessions = await prisma.testSession.findMany()
  res.send(testSessions)
})

testSessionsRouter.post("/", async (req, res) => {
  const user = await verifyUser(req, res)
  const { testId } = req.body

  // Uses try/catch because frontend sometimes tries to make a new session
  // even when one already exists.
  // I tried to debug on frontend, but I couldn't figure out what was causing it

  try {
    const savedTestSession = await prisma.testSession.create({
      data: {
        userId: user.id,
        testId,
      },
    })
    res.send(savedTestSession)
  } catch (err) {
    const testSession = await prisma.testSession.findUnique({
      where: {
        userId: user.id,
      },
    })
    res.send(testSession)
  }
})

module.exports = testSessionsRouter
