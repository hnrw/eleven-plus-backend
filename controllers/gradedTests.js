const gradedTestsRouter = require("express").Router()
const _ = require("lodash")
const { PrismaClient } = require("@prisma/client")
const verifyUser = require("../helpers/verifyUser")
const isProblemCorrect = require("../helpers/isProblemCorrect")

const prisma = new PrismaClient()

gradedTestsRouter.get("/", async (request, response) => {
  const user = await verifyUser(request, response)
  const gradedTests = await prisma.gradedTest.findMany({
    where: {
      userId: user.id,
    },
    include: {
      gradedProblems: true,
    },
  })
  response.send(gradedTests)
})

gradedTestsRouter.get("/test-sorted", async (request, response) => {
  const user = await verifyUser(request, response)

  const gradedTests = await prisma.gradedTest.findMany({
    where: { userId: user.id },
  })
  const tests = await prisma.test.findMany()

  let testSorted = []

  tests.forEach((t) => {
    const usersAttempts = gradedTests.filter((gt) => gt.testId === t.id)
    const testEntry = {
      testId: t.id,
      num: t.num,
      attempts: usersAttempts,
    }
    if (usersAttempts.length > 0) {
      testSorted = testSorted.concat(testEntry)
    }
  })

  response.send(testSorted)
})

gradedTestsRouter.get("/all", async (request, response) => {
  const gradedTests = await prisma.gradedTest.findMany()
  response.send(gradedTests)
})

gradedTestsRouter.get("/:id", async (request, response) => {
  const user = await verifyUser(request, response)
  const { id } = request.params
  const gradedTest = await prisma.gradedTest.findUnique({
    where: {
      id,
    },
    include: {
      gradedProblems: true,
      user: true,
    },
  })

  if (!gradedTest.user.id === user.id) {
    return response.status(400).send({ error: "unauthorized" })
  }

  // don't send to client, just used to validate request
  delete gradedTest.user
  delete gradedTest.userId

  return response.send(gradedTest)
})

gradedTestsRouter.post("/submit", async (request, response) => {
  const user = await verifyUser(request, response)
  const { testId, answers } = request.body

  // fetch the Test the user just completed
  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: {
      problems: {
        include: {
          categories: true,
        },
      },
    },
  })

  // reconcile the Test's problems with the user's submissions
  const gradedProblems = test.problems.map((p) => {
    const submitted = answers.find((a) => p.id === a.problemId)
    const gp = {
      question: p.question,
      correct: p.correct.toString(),
      multi: p.multi,
      num: p.num,
      img: p.img,
      options: p.options,
      unit: p.unit,
      categories: {
        connect: p.categories,
      },
      selected: submitted.selected?.toString() || null,
    }

    return gp
  })

  // grade the users GradedCategories
  gradedProblems.forEach(async (gp) => {
    gp.categories.connect.forEach(async (c) => {
      await prisma.gradedCategory.upsert({
        where: {
          userId_categoryName: {
            userId: user.id,
            categoryName: c.name,
          },
        },
        update: {
          attempts: {
            increment: 1,
          },
          correct: {
            increment: isProblemCorrect(gp) ? 1 : 0,
          },
        },
        create: {
          userId: user.id,
          categoryName: c.name,
        },
      })
    })
  })

  const marks = gradedProblems.filter((p) => isProblemCorrect(p)).length

  const totalMarks = gradedProblems.length
  const percent = Math.round((100 / totalMarks) * marks)

  const usersGradedTests = await prisma.gradedTest.findMany({
    where: {
      userId: user.id,
    },
  })

  let firstAttempt = true
  if (usersGradedTests.filter((gt) => gt.testId === testId).length > 0) {
    firstAttempt = false
  }

  const savedGradedTest = await prisma.gradedTest.create({
    data: {
      testId: test.id,
      userId: user.id,
      marks,
      total: test.problems.length,
      num: test.num,
      percent,
      firstAttempt,
      gradedProblems: {
        create: gradedProblems,
      },
    },
    include: {
      gradedProblems: true,
    },
  })

  const withNewTest = usersGradedTests.concat(savedGradedTest)
  const onlyFirstAttempt = withNewTest.filter((gt) => gt.firstAttempt)

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      score: _.meanBy(onlyFirstAttempt, (gt) => gt.percent),
    },
  })

  await prisma.testSession.delete({ where: { userId: user.id } })

  response.send(savedGradedTest)
})

module.exports = gradedTestsRouter
