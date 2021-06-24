const categoriesRouter = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

categoriesRouter.get("/", async (req, res) => {
  const categories = await prisma.category.findMany()
  res.send(categories)
})

categoriesRouter.post("/", async (req, res) => {
  const { name } = req.body
  const category = await prisma.category.create({
    data: {
      name,
    },
  })
  res.send(category)
})

categoriesRouter.delete("/:name", async (req, res) => {
  const { name } = req.params
  const category = await prisma.category.delete({
    where: {
      name,
    },
  })
  res.send(category)
})

module.exports = categoriesRouter
