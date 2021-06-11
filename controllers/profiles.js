const profilesRouter = require("express").Router()
const User = require("../models/user")
const verifyUser = require("../helpers/verifyUser")
const userService = require("../services/userService")

const getProfile = (user) => {
  const profile = {
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    gender: user.gender,
    profilePicture: user.profilePicture,
    score: user.score,
  }
  return profile
}

profilesRouter.get("/", async (request, response) => {
  const users = await User.find({})
  const profiles = users.map((user) => getProfile(user))
  response.send(profiles)
})

profilesRouter.get("/:id", async (request, response) => {
  const { id } = request.params
  const user = await User.findById(id)
  const profile = getProfile(user)
  response.send(profile)
})

module.exports = profilesRouter
