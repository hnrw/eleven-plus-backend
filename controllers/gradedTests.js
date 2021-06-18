const gradedTestsRouter = require("express").Router()
const _ = require("lodash")
const { PrismaClient } = require("@prisma/client")
const GradedTest = require("../models/gradedTest")
const Test = require("../models/test")
const Problem = require("../models/problem")
const TestSession = require("../models/testSession")
const verifyUser = require("../helpers/verifyUser")
const answerService = require("../services/answerService")

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

gradedTestsRouter.get("/all", async (request, response) => {
  const gradedTests = await prisma.gradedTest.findMany()
  response.send(gradedTests)
})

gradedTestsRouter.post("/submit", async (request, response) => {
  const user = await verifyUser(request, response)
  const { testId, answers } = request.body

  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: { problems: 1 },
  })

  const gradedProblems = test.problems.map((p) => {
    const submitted = answers.find((a) => p.id === a.problemId)
    const gp = {
      question: p.question,
      correct: p.correct.toString(),
      multi: p.multi,
      num: p.num,
      img: p.img,
      options: p.options,
      unit: p.unit,
      selected: submitted.selected?.toString() || null,
    }

    return gp
  })

  const marks = gradedProblems.filter((p) => {
    if (p.multi) {
      return p.selected === p.correct
    }
    return Number(p.selected) === Number(p.correct)
  }).length

  const totalMarks = gradedProblems.length
  const percent = Math.round((100 / totalMarks) * marks)

  const savedGradedTest = await prisma.gradedTest.create({
    data: {
      testId: test.id,
      userId: user.id,
      marks,
      total: test.problems.length,
      num: test.num,
      percent,
      gradedProblems: {
        create: gradedProblems,
      },
    },
    include: {
      gradedProblems: true,
    },
  })

  const usersGradedTests = await prisma.gradedTest.findMany({
    where: {
      userId: user.id,
    },
  })

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      score: _.meanBy(usersGradedTests, (gt) => gt.percent),
    },
  })

  await prisma.testSession.delete({ where: { userId: user.id } })

  response.send(savedGradedTest)
})

module.exports = gradedTestsRouter
