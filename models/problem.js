/* eslint-disable no-param-reassign */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const problem = new mongoose.Schema({
  question: {
    type: String,
    // unique: true,
  },
  multi: {
    type: Boolean,
    required: true,
  },
  correct: {
    type: String,
    unique: false,
  },
  options: [
    {
      type: String,
    },
  ],
  unit: {
    type: "String",
  },
  num: {
    type: Number,
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  date: {
    type: Number,
    required: true,
  },
})

problem.plugin(uniqueValidator)

problem.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const Problem = mongoose.model("Problem", problem)

module.exports = Problem
