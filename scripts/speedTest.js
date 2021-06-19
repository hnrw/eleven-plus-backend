const { PrismaClient } = require("@prisma/client")
const logger = require("../utils/logger")

const prisma = new PrismaClient()

const main = async () => {
  const start = Date.now()
  const users = await prisma.user.findMany()
  logger.info(Date.now() - start)
  logger.info(users)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
