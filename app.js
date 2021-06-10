const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const usersRouter = require("./controllers/users")
const testsRouter = require("./controllers/tests")
const problemsRouter = require("./controllers/problems")
const answersRouter = require("./controllers/answers")
const gradedTestsRouter = require("./controllers/gradedTests")
const bouncedUsersRouter = require("./controllers/bouncedUsers")

const loginRouter = require("./controllers/login")
const stripeRouter = require("./controllers/stripe")
const webhooksRouter = require("./controllers/webhook")

const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const config = require("./utils/config")

const app = express()

logger.info("connecting to", config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message)
  })

const unless = (path, excludedMiddleware) => {
  // allows webhook to work since it needs raw input, not processed json
  return (req, res, next) => {
    if (path === req.path) {
      return next()
    }
    return excludedMiddleware(req, res, next)
  }
}

app.use(cors())
app.use(express.static("build"))
app.use(unless("/webhook", express.json()))
app.use(middleware.requestLogger)

app.use("/users", usersRouter)
app.use("/tests", testsRouter)
app.use("/problems", problemsRouter)
app.use("/answers", answersRouter)
app.use("/graded-tests", gradedTestsRouter)
app.use("/bounced-users", bouncedUsersRouter)

app.use("/login", loginRouter)
app.use("/stripe", stripeRouter)
app.use("/webhook", webhooksRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
