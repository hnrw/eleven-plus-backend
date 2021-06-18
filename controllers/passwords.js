const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const passwordsRouter = require("express").Router()
const verifyUser = require("../helpers/verifyUser")

const prisma = new PrismaClient()

passwordsRouter.put("/password", async (request, response) => {
  const { newPassword, currentPassword } = request.body

  const user = await verifyUser(request, response)

  if (newPassword.length < 0) {
    return response.status(400).json({
      error: "password length too short",
    })
  }

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(currentPassword, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid email or password",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(newPassword, saltRounds)

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash,
    },
  })

  return response.status(200).json(updatedUser)
})

passwordsRouter.put("/reset-password", async (request, response) => {
  const { id, newPassword } = request.body
  // needs to be given id before verifying jwt so can fetch current password used for jwt secret

  const user = await prisma.user.findUnique({ where: { id } })

  const verifiedUser = await verifyUser(request, response, user.passwordHash)

  if (user.id !== verifiedUser.id) {
    return response.status(401).json({ error: "token id doesn't match body" })
  }

  const saltRounds = 10
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash: newPasswordHash,
    },
  })

  return response.status(200).send(updatedUser)
})

module.exports = passwordsRouter
