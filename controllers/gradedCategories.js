const gradedCategoriesRouter = require("express").Router()
const { PrismaClient } = require("@prisma/client")
const verifyUser = require("../helpers/verifyUser")

const prisma = new PrismaClient()

gradedCategoriesRouter.get("/", async (req, res) => {
  const user = await verifyUser(req, res)

  const gradedCategories = await prisma.gradedCategory.findMany({
    where: {
      userId: user.id,
    },
  })

  res.send(gradedCategories)
})

module.exports = gradedCategoriesRouter
