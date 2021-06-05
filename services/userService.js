const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const sendEmail = require("../helpers/sendEmail")

const getUsers = async (user) => {
  if (user.email !== "pannicope@gmail.com") {
    return {
      status: 400,
      data: { error: "unauthorized" },
    }
  }

  const users = await User.find({})
  // .populate({
  //   path: "getQuestions",
  //   select: { content: 1, date: 1, answer: 1 },
  //   populate: {
  //     path: "answer",
  //     select: { content: 1, date: 1 },
  //   },
  // })
  // .populate("sentQuestions", {
  //   content: 1,
  //   date: 1,
  // })

  return {
    status: 200,
    data: users,
  }
}

const getProfile = async (username) => {
  const user = await User.findOne({ username })
  // .populate({
  //   path: "getQuestions",
  //   select: { content: 1, date: 1, answer: 1, fromUser: 1, likedBy: 1 },
  //   populate: [
  //     {
  //       path: "answer",
  //       select: { content: 1, date: 1 },
  //     },
  //     {
  //       path: "fromUser",
  //       select: { name: 1, username: 1, profilePicture: 1 },
  //     },
  //     {
  //       path: "toUser",
  //       select: { name: 1, username: 1, profilePicture: 1 },
  //     },
  //   ],
  // })
  // .populate("sentQuestions", {
  //   content: 1,
  //   date: 1,
  // })
  // .populate("answers", {
  //   content: 1,
  //   date: 1,
  // })

  // don't return private info
  // dunno how to remove id
  user.email = undefined
  user.admin = undefined
  user.credits = undefined
  user.balance = undefined
  user.paypal = undefined

  return {
    status: 200,
    data: user,
  }
}

const createUser = async (
  email,
  username,
  name,
  password,
  admin,
  requestUser
) => {
  if (password.length < 0) {
    return { status: 400, data: { error: "password length too short" } }
  }

  const checkEmailUser = await User.findOne({ email })
  if (checkEmailUser) {
    return { status: 400, data: { error: "email already in use" } }
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    username,
    name,
    passwordHash,
    admin: admin || false,
    credits: 0,
    profilePicture:
      "https://backstage-profile-pictures.s3.eu-west-2.amazonaws.com/default.png",
    balance: 0,
    paypal: "",
    dateCreated: new Date(),
  })

  const savedUser = await user.save()

  sendEmail.newUser(username, name, email)

  const userForToken = {
    email: savedUser.email,
    id: savedUser._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return {
    status: 200,
    data: {
      token,
      email: savedUser.email,
      username: savedUser.username,
      name: savedUser.name,
      id: savedUser.id,
    },
  }
}

const editUser = async (userId, requestFromUser, data) => {
  const user = await User.findById(userId)

  // check user is editing their own account
  if (userId !== requestFromUser.id && requestFromUser.username !== "henry") {
    return {
      status: 400,
      data: { error: "unauthorized" },
    }
  }

  // update fields if they are provided in data
  if (data.name) {
    user.name = data.name
  }

  if (data.bio) {
    user.bio = data.bio
  }

  if (data.paypal) {
    user.paypal = data.paypal
  }

  if ("charityName" in data) {
    user.charityName = data.charityName
  }

  if ("charityWebsite" in data) {
    user.charityWebsite = data.charityWebsite
  }

  // only admin can edit some fields
  if (requestFromUser.username === "henry") {
    if (data.email) {
      user.email = data.email
    }

    if (data.username) {
      user.username = data.username
    }
    if (data.credits) {
      user.credits = data.credits
    }

    if (data.balance) {
      user.balance = data.balance
    }
  }

  const savedUser = await user.save()

  return {
    status: 200,
    data: savedUser,
  }
}

module.exports = {
  getUsers,
  createUser,
  editUser,
  getProfile,
}
