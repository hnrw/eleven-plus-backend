const { PrismaClient } = require("@prisma/client")
const bouncedUsersRouter = require("express").Router()

const prisma = new PrismaClient()

bouncedUsersRouter.get("/", async (req, res) => {
  const bouncedUsers = await prisma.bouncedUser.findMany()
  res.send(bouncedUsers)
})

bouncedUsersRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  const bouncedUser = prisma.bouncedUser.findUnique({ where: { id } })

  res.send(bouncedUser)
})

// eslint-disable-next-line consistent-return
bouncedUsersRouter.post("/", async (req, res) => {
  const { parentName, email } = req.body

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return res.status(400).send({ error: "email already in use" })
  }

  const existingBounced = await prisma.bouncedUser.findUnique({
    where: { email },
  })

  if (existingBounced) {
    const date = new Date()
    const updatedBouncedUser = await prisma.bouncedUser.update({
      where: {
        email,
      },
      data: {
        parentName,
        // date,
      },
    })
    return res.send(updatedBouncedUser)
  }

  const savedBouncedUser = prisma.bouncedUser.create({
    data: {
      parentName,
      email,
    },
  })

  res.send(savedBouncedUser)
})

module.exports = bouncedUsersRouter
