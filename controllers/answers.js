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
  const { selected, test, problem, user } = request.body

  const answer = new Answer({
    selected,
    test,
    problem,
    user,
  })

  const savedAnswer = await answer.save()

  response.send(savedAnswer)
})
module.exports = answersRouter
