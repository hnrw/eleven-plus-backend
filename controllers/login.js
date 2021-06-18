const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

const prisma = new PrismaClient()
loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body
  const user = await prisma.user.findUnique({ where: { email } })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid email or password",
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return response.status(200).send({
    token,
    email: user.email,
    name: user.name,
    id: user.id,
  })
})

module.exports = loginRouter
