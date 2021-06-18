const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
  await prisma.answer.deleteMany({})
  await prisma.gradedProblem.deleteMany({})
  await prisma.gradedTest.deleteMany({})
  await prisma.testSession.deleteMany({})
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
