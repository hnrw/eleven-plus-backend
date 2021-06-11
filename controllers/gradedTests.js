const gradedTestsRouter = require("express").Router()
const _ = require("lodash")
const GradedTest = require("../models/gradedTest")
const Test = require("../models/test")
const Problem = require("../models/problem")
const verifyUser = require("../helpers/verifyUser")
const answerService = require("../services/answerService")

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

gradedTestsRouter.post("/submit", async (request, response) => {
  const user = await verifyUser(request, response)
  const { testId, answers } = request.body

  const test = await Test.findById(testId).populate("problems")
  const problems = await Problem.find({ test: test._id })

  const gradedProblems = problems.map((p) => {
    const submitted = answers.find((a) => p.equals(a.problemId))
    const gp = {
      question: p.question,
      correct: p.correct,
      selected: submitted.selected,
    }
    return gp
  })

  const marks = gradedProblems.filter((p) => p.selected === p.correct).length
  const totalMarks = gradedProblems.length
  const percent = Math.round((100 / totalMarks) * marks)

  const gradedTest = new GradedTest({
    test: test._id,
    user: user._id,
    marks,
    total: test.problems.length,
    num: test.num,
    percent,
    gradedProblems,
    date: Date.now(),
  })

  const savedGradedTest = await gradedTest.save()

  user.gradedTests = user.gradedTests.concat(savedGradedTest)

  const usersGrades = await GradedTest.find({ user }).populate("gradedProblems")
  user.score = _.meanBy(usersGrades, (gt) => gt.percent)

  await user.save()

  answers.forEach((a) => {
    answerService.createAnswer({
      user,
      problemId: a.problemId,
      selected: a.selected,
    })
  })

  response.send(savedGradedTest)
})

module.exports = gradedTestsRouter
