const problemsRouter = require("express").Router()
const Problem = require("../models/problem")
const verifyUser = require("../helpers/verifyUser")

problemsRouter.get("/", async (request, response) => {
  const problems = await Problem.find({}).populate("problems", { id: 1 })
  response.send(problems)
})

problemsRouter.post("/", async (request, response) => {
  const { question, correct, options } = request.body
  const problem = new Problem({
    question,
    correct,
    options,
    date: Date.now(),
  })

  const savedProblem = await problem.save()
  response.send(savedProblem)
})

problemsRouter.delete("/:id", async (request, response) => {
  const admin = await verifyUser(request, response)

  if (admin.email !== "pannicope@gmail.com") {
    return response.status(400).json({ error: "unauthorized" })
  }
  const { id } = request.params
  await Problem.findByIdAndRemove(id)
  return response.status(204).end()
})

module.exports = problemsRouter
