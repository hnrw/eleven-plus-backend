const { PrismaClient } = require("@prisma/client")
const _ = require("lodash")
const allCategoriesValid = require("../helpers/isValidCategory")

const prisma = new PrismaClient()

const createTest = async (newProblems) => {
  allCategoriesValid(newProblems)

  const tests = await prisma.test.findMany()
  const lastTest = _.maxBy(tests, (test) => test.num)
  const lastNum = (lastTest && lastTest.num) || 0

  const numberedProblems = newProblems.map((p, i) => ({
    ...p,
    num: i + 1,
    correct: p.correct.toString(),
    categories: p.categories && {
      connect: p.categories.map((c) => ({ name: c })),
    },
  }))

  const savedTest = await prisma.test.create({
    data: {
      num: lastNum + 1,
      problems: {
        create: numberedProblems,
      },
    },
  })

  return { status: 200, data: savedTest }
}

module.exports = {
  createTest,
}
