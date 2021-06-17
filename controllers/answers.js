const { PrismaClient } = require("@prisma/client")
const answersRouter = require("express").Router()
const Problem = require("../models/problem")
const Answer = require("../models/answer")
const verifyUser = require("../helpers/verifyUser")
const prisma = new PrismaClient()

// don't think this is actually used in the current code
// this should be something like graded problems instead
answersRouter.get("/", async (request, response) => {
  const answers = await prisma.answer.findMany()
  response.send(answers)
})

answersRouter.get("/:id", async (request, response) => {
  const { id } = request.params
  const answer = await prisma.answer.findUnique({
    where: {
      id,
    },
  })
  response.send(answer)
})

answersRouter.post("/", async (request, response) => {
  const user = await verifyUser(request, response)
  const { selected, problemId } = request.body

  const answer = new Answer({
    selected,
    problem: problemId,
    user,
    date: Date.now(),
  })

  const savedAnswer = await answer.save()

  await user.updateOne({ $push: { answers: savedAnswer } })
  await Problem.updateOne(
    { _id: problemId },
    { $push: { answers: savedAnswer } }
  )

  response.send(savedAnswer)
})

module.exports = answersRouter
