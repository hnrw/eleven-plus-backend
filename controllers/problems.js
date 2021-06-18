const { PrismaClient } = require("@prisma/client")
const problemsRouter = require("express").Router()
const Problem = require("../models/problem")
const verifyUser = require("../helpers/verifyUser")
const prisma = new PrismaClient()

problemsRouter.get("/", async (request, response) => {
  const problems = await prisma.problem.findMany()
  response.send(problems)
})

problemsRouter.delete("/:id", async (request, response) => {
  const admin = await verifyUser(request, response)

  if (admin.email !== "pannicope@gmail.com") {
    return response.status(400).json({ error: "unauthorized" })
  }

  const { id } = request.params

  const deletedProblem = await prisma.problem.delete({ where: { id } })
  return response.send(deletedProblem)
})

module.exports = problemsRouter
