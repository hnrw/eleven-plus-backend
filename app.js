const express = require("express")
const cors = require("cors")

const usersRouter = require("./controllers/users")
const testsRouter = require("./controllers/tests")
const problemsRouter = require("./controllers/problems")
const gradedTestsRouter = require("./controllers/gradedTests")
const profileUsersRouter = require("./controllers/profiles")
const emailsRouter = require("./controllers/emails")
const testSessionsRouter = require("./controllers/testSessions")

const loginRouter = require("./controllers/login")
const stripeRouter = require("./controllers/stripe")
const webhooksRouter = require("./controllers/webhook")
const passwordsRouter = require("./controllers/passwords")

const middleware = require("./utils/middleware")

const app = express()

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
app.use("/graded-tests", gradedTestsRouter)
app.use("/profiles", profileUsersRouter)
app.use("/emails", emailsRouter)
app.use("/passwords", passwordsRouter)
app.use("/test-sessions", testSessionsRouter)

app.use("/login", loginRouter)
app.use("/stripe", stripeRouter)
app.use("/webhook", webhooksRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
