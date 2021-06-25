const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const main = async () => {
  // await prisma.category.createMany({
  //   data: [
  //     { name: "arithmetic" },
  //     { name: "ratios" },
  //     { name: "graphs" },
  //     { name: "algebra" },
  //   ],
  // })
  // await prisma.gradedCategory.deleteMany()
  // await prisma.category.deleteMany()

  const foo = await prisma.gradedProblem.findMany({
    where: {
      gradedTestId: "c321af61-5383-49d2-a003-2b33cc08d386",
    },
  })

  const test = await prisma.test.findUnique({
    where: {
      id: "3f523c95-a3e4-4363-8014-9926b556ce17",
    },
    include: {
      problems: true,
    },
  })

  const 

  console.log(foo)
  console.log(test)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
