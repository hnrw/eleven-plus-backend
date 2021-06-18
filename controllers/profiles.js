const { PrismaClient } = require("@prisma/client")
const profilesRouter = require("express").Router()

const prisma = new PrismaClient()

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
  const users = await prisma.user.findMany()
  const profiles = users.map((user) => getProfile(user))
  response.send(profiles)
})

profilesRouter.get("/:id", async (request, response) => {
  const { id } = request.params
  const user = await prisma.user.findUnique({ where: { id } })
  const profile = getProfile(user)
  response.send(profile)
})

module.exports = profilesRouter
