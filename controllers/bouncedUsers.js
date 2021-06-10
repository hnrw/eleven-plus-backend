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

  const existingBounced = await BouncedUser.findOne({ email })

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).send({ error: "email already in use" })
  }

  if (existingBounced) {
    existingBounced.date = Date.now()
    await existingBounced.save()
    return res.status(200).end()
  }

  const bouncedUser = new BouncedUser({
    parentName,
    email,
    date: Date.now(),
  })

  const savedUser = await bouncedUser.save()
  res.send(savedUser)
})

module.exports = bouncedUsersRouter
