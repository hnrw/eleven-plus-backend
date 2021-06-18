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
      user: true,
    },
  })

  if (!gradedTest.user.id === user.id) {
    return response.status(400).send({ error: "unauthorized" })
  }

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
      correct: p.correct,
      multi: p.multi,
      num: p.num,
      img: p.img,
      options: p.options,
      unit: p.unit,
      selected: submitted.selected,
    }
    return gp
  })

  // const marks = gradedProblems.filter((p) => p.selected === p.correct).length
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
      // gradedProblems,
    },
  })

  // const usersGrades = await GradedTest.find({ user }).populate("gradedProblems")
  // user.score = _.meanBy(usersGrades, (gt) => gt.percent)

  // await user.save()

  await prisma.testSession.delete({ where: { userId: user.id } })

  // answers.forEach((a) => {
  //   answerService.createAnswer({
  //     user,
  //     problemId: a.problemId,
  //     selected: a.selected,
  //   })
  // })

  response.send(savedGradedTest)
})

module.exports = gradedTestsRouter
