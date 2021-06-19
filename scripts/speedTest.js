const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
  const start = Date.now()
  const users = await prisma.user.findMany()
  console.log(Date.now() - start)
  console.log(users)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
