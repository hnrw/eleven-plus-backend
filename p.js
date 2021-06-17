const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
  const deleteUsers = await prisma.user.deleteMany({})
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
