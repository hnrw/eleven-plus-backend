const answersRouter = require("express").Router()
const _ = require("lodash")
const Test = require("../models/test")
const Problem = require("../models/problem")
const Answer = require("../models/answer")
const verifyUser = require("../helpers/verifyUser")

answersRouter.get("/", async (request, response) => {
  const answers = await Answer.find({})
  response.send(answers)
})

answersRouter.get("/:id", async (request, response) => {
  const { id } = request.params
  const answer = await Answer.findById(id)
  response.send(answer)
})

answersRouter.post("/", async (request, response) => {
  const user = await verifyUser(request, response)
  const { selected, problemId } = request.body

  const answer = new Answer({
    selected,
    problem: problemId,
    user,
  })

  const savedAnswer = await answer.save()

  user.answers = user.answers.concat(savedAnswer)
  user.save()

  const problem = await Problem.findById(problemId)
  problem.answers = problem.answers.concat(savedAnswer)
  problem.save()

  response.send(savedAnswer)
})

module.exports = answersRouter
