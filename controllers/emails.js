const emailsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const sendEmail = require("../helpers/sendEmail")

// reset password email
emailsRouter.post("/password", async (request, response) => {
  const { email } = request.body

  const user = await User.findOne({ email })

  if (!user) {
    return response.status(401).json({
      error: "email does not exist",
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  }
  const token = jwt.sign(userForToken, user.passwordHash)

  const resetUrl = `${process.env.DOMAIN}/reset-password/${token}/${user._id}`

  // doesn't await because this takes a long time
  // makes it slow to show success message on front end
  // just validate that the email exists in db, and send success
  sendEmail.passwordReset(email, resetUrl)

  return response.status(200).end()
})

module.exports = emailsRouter
