const testsRouter = require("express").Router()
const _ = require("lodash")
const Test = require("../models/test")
const Problem = require("../models/problem")
const GradedTest = require("../models/gradedTest")
const verifyUser = require("../helpers/verifyUser")
const { createProblem } = require("../services/problemService")
const answerService = require("../services/answerService")

testsRouter.get("/", async (request, response) => {
  const tests = await Test.find({}).populate("problems")
  response.send(tests)
})

testsRouter.get("/next", async (req, res) => {
  const user = await verifyUser(req, res)
  const gradedTests = await GradedTest.find({ user })
  const lastDone = _.maxBy(gradedTests, (gt) => gt.num)
  const lastDoneNum = (lastDone && lastDone.num) || 0

  const nextTest = await Test.findOne({ num: lastDoneNum + 1 }).populate(
    "problems"
  )

  if (nextTest) {
    res.send(nextTest)
  } else {
    res.send("no more tests")
  }
})

testsRouter.get("/:id", async (request, response) => {
  const { id } = request.params
  const test = await Test.findById(id).populate("problems")
  response.send(test)
})

testsRouter.post("/", async (request, response) => {
  const { problems } = request.body

  const tests = await Test.find({})
  const lastTest = _.maxBy(tests, (test) => test.num)
  // const lastTest = tests[tests.length - 1]
  const lastNum = (lastTest && lastTest.num) || 0

  const test = new Test({
    num: lastNum + 1,
    date: Date.now(),
  })

  const savedTest = await test.save()

  problems.map(async (p) => {
    await createProblem(p, savedTest.id)
  })

  response.send(savedTest)
})

testsRouter.delete("/:id", async (request, response) => {
  const admin = await verifyUser(request, response)

  if (admin.email !== "pannicope@gmail.com") {
    return response.status(400).json({ error: "unauthorized" })
  }

  const { id } = request.params
  await Test.findByIdAndRemove(id)

  const problems = await Problem.find({})
  problems.forEach(async (p) => {
    if (p.test.equals(id)) {
      await p.remove(p)
    }
  })
  return response.status(204).end()
})

module.exports = testsRouter

// const randInt = (max) => Math.floor(Math.random() * max)

// const generateOptions = (max) => {
//   const array = Array.from(Array(max), (_, i) => i + 1)
//   const shuffledArray = _.shuffle(array)
//   return shuffledArray.slice(0, 3)
// }

// let questions = [
//   // {
//   //   question: "What is 2 + 3?",
//   //   correct: 5,
//   // },
//   {
//     question: "What is 2 + 3?",
//     multi: true,
//     correct: 5,
//     options: [5, 12, 6, 1],
//   },
// ]

// for (let i = 0; i < 5; i++) {
//   const num1 = randInt(10)
//   const num2 = randInt(10)
//   const ans = num1 + num2

//   const wrongAnswers = generateOptions(20)
//   const options = wrongAnswers.concat(ans)

//   const q = {
//     question: `What is ${num1} + ${num2}?`,
//     multi: true,
//     correct: ans,
//     options,
//   }

//   questions = questions.concat(q)
// }

// const test = [
//   {
//     question: "What is 2 + 3?",
//     multi: true,
//     correct: 5,
//     options: [5, 12, 6, 1],
//   },
//   {
//     question: "What is 1 + 3?",
//     multi: true,
//     correct: 4,
//     options: [19, 2, 18, 4],
//   },
//   {
//     question: "What is 5 + 3?",
//     multi: true,
//     correct: 8,
//     options: [20, 15, 7, 8],
//   },
//   // {
//   //   question: "What is 6 + 3?",
//   //   multi: true,
//   //   correct: 9,
//   //   options: [11, 3, 4, 9],
//   // },
//   // {
//   //   question: "What is 6 + 9?",
//   //   multi: true,
//   //   correct: 15,
//   //   options: [5, 14, 7, 15],
//   // },
//   // {
//   //   question: "What is 6 + 5?",
//   //   multi: true,
//   //   correct: 11,
//   //   options: [16, 4, 2, 11],
//   // },
// ]
