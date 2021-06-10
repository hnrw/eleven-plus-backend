const bouncedUsersRouter = require("express").Router()
const User = require("../models/user")
const BouncedUser = require("../models/bouncedUser")
const verifyUser = require("../helpers/verifyUser")
const userService = require("../services/userService")

bouncedUsersRouter.get("/", async (req, res) => {
  // const user = await verifyUser(request, response)
  // const service = await userService.getUsers(user)
  const bouncedUsers = await BouncedUser.find({})
  res.send(bouncedUsers)
})

bouncedUsersRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  const bouncedUser = BouncedUser.findById(id)

  res.send(bouncedUser)
})

bouncedUsersRouter.post("/", async (req, res) => {
  const { parentName, email } = req.body

  const bouncedUser = new BouncedUser({
    parentName,
    email,
  })

  const savedUser = await bouncedUser.save()
  res.send(savedUser)
})

module.exports = bouncedUsersRouter
