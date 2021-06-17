const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const jwt = require("jsonwebtoken")
const Fuse = require("fuse.js")
const User = require("../models/user")
const BouncedUser = require("../models/bouncedUser")
const sendEmail = require("../helpers/sendEmail")

const prisma = new PrismaClient()

const getUsers = async () => {
  const users = await prisma.user.findMany()
  return {
    status: 200,
    data: users,
  }
}

const createUser = async (data) => {
  const { email, parentName, dob, gender, password, stripeId, subEnds } = data

  if (password && password.length < 3) {
    return { status: 400, data: { error: "password length too short" } }
  }

  const checkEmailUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (checkEmailUser) {
    return { status: 400, data: { error: "email already in use" } }
  }

  // password hash is from stripe
  // but to allow free signups, needs to also support passwords
  let passwordHash
  passwordHash = data.passwordHash

  if (password) {
    const saltRounds = 10
    passwordHash = await bcrypt.hash(password, saltRounds)
  }

  const savedUser = await prisma.user.create({
    data: {
      email,
      parentName,
      dob,
      gender,
      passwordHash,
      profilePicture:
        "https://backstage-profile-pictures.s3.eu-west-2.amazonaws.com/default.png",
      stripeId,
      subEnds,
      date: Date.now(),
    },
  })

  const userForToken = {
    email: savedUser.email,
    id: savedUser._id,
  }

  await BouncedUser.findOneAndRemove({ email: savedUser.email })

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

// const editUser = async (user, data) => {
//   const fieldToUpdate = {
//     firstName: data.firstName,
//     lastName: data.lastName,
//     dob: data.dob,
//     gender: data.gender,
//   }

//   Object.keys(fieldToUpdate).forEach((key) => {
//     const value = fieldToUpdate[key]
//     if (!value) {
//       delete fieldToUpdate[key]
//     }
//   })

//   const savedUser = await User.findByIdAndUpdate(
//     user.id,
//     { $set: { ...fieldToUpdate } },
//     {
//       runValidators: true,
//       new: true,
//     }
//   )

//   return {
//     status: 200,
//     data: savedUser,
//   }
// }

module.exports = {
  getUsers,
  createUser,
  // editUser,
  // getProfile,
  // searchUsers,
}
