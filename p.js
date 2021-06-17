const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
  await prisma.problem.deleteMany({})
  await prisma.test.deleteMany({})
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
