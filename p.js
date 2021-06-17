const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
  const user = await prisma.user.create({
    data: {
      name: "bob",
      email: "bob@boob.com",
    },
  })
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
