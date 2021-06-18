const usersRouter = require("express").Router()
const verifyUser = require("../helpers/verifyUser")
const userService = require("../services/userService")

usersRouter.get("/", async (request, response) => {
  // const user = await verifyUser(request, response)
  // const service = await userService.getUsers(user)
  const service = await userService.getUsers()

  response.status(service.status).send(service.data)
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
  await User.findByIdAndRemove(id)
  return response.status(204).end()
})

module.exports = usersRouter
