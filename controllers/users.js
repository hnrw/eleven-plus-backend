const { PrismaClient } = require("@prisma/client")
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const usersRouter = require("express").Router()
const verifyUser = require("../helpers/verifyUser")
const userService = require("../services/userService")

const prisma = new PrismaClient()

usersRouter.get("/", async (request, response) => {
  // const user = await verifyUser(request, response)
  // const service = await userService.getUsers(user)
  const service = await userService.getUsers()

  response.status(service.status).send(service.data)
})

usersRouter.get("/stripe", async (req, res) => {
  const user = await verifyUser(req, res)

  const subscription =
    user.stripeSubId && (await stripe.subscriptions.retrieve(user.stripeSubId))

  const data = {
    stripeId: user.stripeId,
    subEnds: user.subEnds,
    active: user.active,
    subscription,
  }

  res.send(data)
})

usersRouter.get("/:id", async (request, response) => {
  const { id } = request.params
  const service = await userService.getProfile(id)

  return response.status(service.status).send(service.data)
})

usersRouter.get("/search/:searchParam", async (request, response) => {
  const { searchParam } = request.params
  const service = await userService.searchUsers(searchParam)

  response.status(service.status).send(service.data)
})

usersRouter.post("/", async (request, response) => {
  const service = await userService.createUser(request.body)
  response.status(service.status).send(service.data)
})

usersRouter.put("/", async (request, response) => {
  const requestFromUser = await verifyUser(request, response)
  const data = request.body

  const service = await userService.editUser(requestFromUser, data)

  return response.status(service.status).send(service.data)
})

usersRouter.delete("/:id", async (request, response) => {
  const admin = await verifyUser(request, response)

  if (admin.email !== "pannicope@gmail.com") {
    return response.status(400).json({ error: "unauthorized" })
  }
  const { id } = request.params
  const user = await prisma.user.delete({ where: { id } })
  return response.send(user)
})

module.exports = usersRouter
