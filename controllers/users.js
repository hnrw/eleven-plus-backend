const usersRouter = require("express").Router()
const User = require("../models/user")
const verifyUser = require("../helpers/verifyUser")
const userService = require("../services/userService")

usersRouter.get("/", async (request, response) => {
  const user = await verifyUser(request, response)
  const service = await userService.getUsers(user)

  response.status(service.status).send(service.data)
})

usersRouter.get("/data", async (request, response) => {
  const user = await verifyUser(request, response)
  return response.status(200).send(user)
})

usersRouter.get("/:username", async (request, response) => {
  const { username } = request.params
  const service = await userService.getProfile(username)

  return response.status(service.status).send(service.data)
})

usersRouter.get("/search/:searchParam", async (request, response) => {
  const { searchParam } = request.params
  const service = await userService.searchUsers(searchParam)

  response.status(service.status).send(service.data)
})

usersRouter.post("/", async (request, response) => {
  const { email, username, name, password, admin, requestUser } = request.body

  const service = await userService.createUser(
    email,
    username,
    name,
    password,
    admin,
    requestUser
  )

  response.status(service.status).send(service.data)
})

usersRouter.put("/", async (request, response) => {
  const requestFromUser = await verifyUser(request, response)
  const { userId, data } = request.body

  const service = await userService.editUser(userId, requestFromUser, data)

  return response.status(service.status).send(service.data)
})

usersRouter.delete("/:id", async (request, response) => {
  const admin = await verifyUser(request, response)

  if (admin.username !== "henry") {
    return response.status(400).json({ error: "unauthorized" })
  }
  const { id } = request.params
  await User.findByIdAndRemove(id)
  return response.status(204).end()
})

module.exports = usersRouter
