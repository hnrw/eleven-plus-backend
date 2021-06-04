/* eslint-disable no-param-reassign */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    maxLength: 254,
  },
  name: {
    type: String,
    required: false,
    maxLength: 50,
  },
  parentName: {
    type: String,
    required: false,
    maxLength: 50,
  },
  dob: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  getQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  sentQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  likedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: Date,
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
