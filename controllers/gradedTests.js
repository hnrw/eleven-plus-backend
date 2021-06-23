const gradedTestsRouter = require("express").Router()
const _ = require("lodash")
const { PrismaClient } = require("@prisma/client")
const verifyUser = require("../helpers/verifyUser")
const isProblemCorrect = require("../helpers/isProblemCorrect")
const isFirstAttemptAtTest = require("../helpers/isFirstAttemptAtTest")
const gradedTestService = require("../services/gradedTestService")

const prisma = new PrismaClient()

gradedTestsRouter.get("/", async (request, response) => {
  const user = await verifyUser(request, response)
  const gradedTests = await prisma.gradedTest.findMany({
    where: {
      userId: user.id,
    },
    include: {
      gradedProblems: true,
    },
  })
  response.send(gradedTests)
})

gradedTestsRouter.get("/test-sorted", async (request, response) => {
  const user = await verifyUser(request, response)

  const gradedTests = await prisma.gradedTest.findMany({
    where: { userId: user.id },
  })
  const tests = await prisma.test.findMany()

  let testSorted = []

  tests.forEach((t) => {
    const usersAttempts = gradedTests.filter((gt) => gt.testId === t.id)
    const testEntry = {
      testId: t.id,
      num: t.num,
      attempts: usersAttempts,
    }
    if (usersAttempts.length > 0) {
      testSorted = testSorted.concat(testEntry)
    }
  })

  response.send(testSorted)
})

gradedTestsRouter.get("/all", async (request, response) => {
  const gradedTests = await prisma.gradedTest.findMany()
  response.send(gradedTests)
})

gradedTestsRouter.get("/:id", async (request, response) => {
  const user = await verifyUser(request, response)
  const { id } = request.params
  const gradedTest = await prisma.gradedTest.findUnique({
    where: {
      id,
    },
    include: {
      gradedProblems: true,
      user: true,
    },
  })

  if (!gradedTest.user.id === user.id) {
    return response.status(400).send({ error: "unauthorized" })
  }

  // don't send to client, just used to validate request
  delete gradedTest.user
  delete gradedTest.userId

  return response.send(gradedTest)
})

gradedTestsRouter.post("/submit", async (request, response) => {
  const user = await verifyUser(request, response)
  const { testId, answers } = request.body

  const { data, status } = await gradedTestService.submitTest(
    user,
    testId,
    answers
  )
  response.status(status).send(data)
})

module.exports = gradedTestsRouter
