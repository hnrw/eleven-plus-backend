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

gradedCategoriesRouter.get("/average", async (req, res) => {
  const gradedCategories = await prisma.gradedCategory.findMany({
    where: {
      attempts: {
        gt: 0,
      },
    },
  })

  const categories = await prisma.category.findMany()

  const categoriesAveraged = categories.map((c) => {
    const mgc = gradedCategories.filter((gc) => gc.categoryName === c.name)

    const totalAttempts = mgc.reduce((acc, gc) => gc.attempts + acc, 0)
    const totalCorrect = mgc.reduce((acc, gc) => gc.correct + acc, 0)
    return {
      average: (100 * totalCorrect) / totalAttempts,
      name: c.name,
    }
  })

  res.send(categoriesAveraged)
})

module.exports = gradedCategoriesRouter
