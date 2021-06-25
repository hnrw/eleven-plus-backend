const { PrismaClient } = require("@prisma/client")
const _ = require("lodash")
const dayjs = require("dayjs")
const isProblemCorrect = require("../helpers/isProblemCorrect")
const isFirstAttemptAtTest = require("../helpers/isFirstAttemptAtTest")
const logger = require("../utils/logger")

const prisma = new PrismaClient()

const submitTest = async (user, testId, answers) => {
  // fetch the Test the user just completed
  logger.info("Fetching test")
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
  logger.info("Reconcilling users selections with test problems")
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

  logger.info("Fetching user's gradedTests")
  logger.info("Checking if first attempt")
  const usersGradedTests = await prisma.gradedTest.findMany({
    where: {
      userId: user.id,
    },
  })

  const firstAttempt = await isFirstAttemptAtTest(usersGradedTests, testId)

  // grade the users GradedCategories
  if (firstAttempt) {
    logger.info("It is first attempt, marking gradedCategories")
    gradedProblems.forEach(async (gp) => {
      gp.categories.connect.forEach(async (c) => {
        await prisma.gradedCategory.update({
          where: {
            userId_categoryName: {
              userId: user.id,
              categoryName: c.name,
            },
          },
          data: {
            attempts: {
              increment: 1,
            },
            correct: {
              increment: isProblemCorrect(gp) ? 1 : 0,
            },
          },
        })
      })
    })
    logger.info("Grading categories done")
  }

  const marks = gradedProblems.filter((p) => isProblemCorrect(p)).length

  const totalMarks = gradedProblems.length
  const percent = Math.round((100 / totalMarks) * marks)

  logger.info("Deleting test session")
  const testSession = await prisma.testSession.delete({
    where: { userId: user.id },
  })

  const time = Math.round((dayjs() - dayjs(testSession.start)) / 1000)

  logger.info("Saving gradedTest")
  const savedGradedTest = await prisma.gradedTest.create({
    data: {
      testId: test.id,
      userId: user.id,
      marks,
      total: test.problems.length,
      num: test.num,
      percent,
      firstAttempt,
      time,
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

  logger.info("Updating user")
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      score: _.meanBy(onlyFirstAttempt, (gt) => gt.percent),
    },
  })

  return { data: savedGradedTest, status: 200 }
}

module.exports = {
  submitTest,
}
