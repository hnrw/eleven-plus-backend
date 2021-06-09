const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Fuse = require("fuse.js")
const User = require("../models/user")
const sendEmail = require("../helpers/sendEmail")

const getUsers = async (user) => {
  // if (user.email !== "pannicope@gmail.com") {
  //   return {
  //     status: 400,
  //     data: { error: "unauthorized" },
  //   }
  // }

  const users = await User.find({}).populate("gradedTests")
  return {
    status: 200,
    data: users,
  }
}

const getProfile = async (id) => {
  const user = await User.findById(id)
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
  user.email = undefined
  user.dob = undefined
  user.gender = undefined

  return {
    status: 200,
    data: user,
  }
}

const searchUsers = async (searchParam) => {
  const users = await User.find({})

  const options = {
    minMatchCharLength: 3,
    keys: ["name", "parentName"],
  }

  const fuse = new Fuse(users, options)

  const results = fuse.search(searchParam)
  // fuse returns an object of item and refIndex. We only need item, which contains the user obj
  const usersResult = results.map((result) => result.item)

  return {
    status: 200,
    data: usersResult,
  }
}

const createUser = async (data) => {
  const {
    email,
    name,
    parentName,
    dob,
    gender,
    password,
    stripeId,
    subEnds,
  } = data

  if (password.length < 3) {
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
    name,
    parentName,
    dob,
    gender,
    passwordHash,
    profilePicture:
      "https://backstage-profile-pictures.s3.eu-west-2.amazonaws.com/default.png",
    stripeId,
    subEnds,
    date: Date.now(),
  })

  const savedUser = await user.save()

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
      name: savedUser.name,
      id: savedUser.id,
    },
  }
}

// const editUser = async (userId, requestFromUser, data) => {
//   const user = await User.findById(userId)

//   // check user is editing their own account
//   if (
//     userId !== requestFromUser.id &&
//     requestFromUser.email !== "pannicope@gmail.com"
//   ) {
//     return {
//       status: 400,
//       data: { error: "unauthorized" },
//     }
//   }

//   // update fields if they are provided in data
//   if (data.name) {
//     user.name = data.name
//   }

//   if (data.parentName) {
//     user.parentName = data.parentName
//   }

//   if (data.paypal) {
//     user.paypal = data.paypal
//   }

//   if ("charityName" in data) {
//     user.charityName = data.charityName
//   }

//   if ("charityWebsite" in data) {
//     user.charityWebsite = data.charityWebsite
//   }

//   // only admin can edit some fields
//   if (requestFromUser.username === "henry") {
//     if (data.email) {
//       user.email = data.email
//     }

//     if (data.username) {
//       user.username = data.username
//     }
//     if (data.credits) {
//       user.credits = data.credits
//     }

//     if (data.balance) {
//       user.balance = data.balance
//     }
//   }

//   const savedUser = await user.save()

//   return {
//     status: 200,
//     data: savedUser,
//   }
// }

module.exports = {
  getUsers,
  createUser,
  // editUser,
  getProfile,
  searchUsers,
}
