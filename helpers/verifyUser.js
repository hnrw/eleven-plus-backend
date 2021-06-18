const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const User = require("../models/user")

const prisma = new PrismaClient()

// eslint-disable-next-line consistent-return
const verifyUser = async (request, response, secret = process.env.SECRET) => {
  const authorization = request.get("authorization")

  if (!authorization) {
    return response.status(400).send({ error: "no token" })
  }

  const token = authorization.substring(7)

  try {
    const decodedToken = jwt.verify(token, secret)
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    })
    return user
  } catch (err) {
    response.status(400).send({ error: "invalid token" })
  }
}

module.exports = verifyUser
