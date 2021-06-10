/* eslint-disable no-param-reassign */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const answer = new mongoose.Schema({
  selected: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
  },
  date: {
    type: Number,
  },
})

answer.plugin(uniqueValidator)

answer.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const Answer = mongoose.model("Answer", answer)

module.exports = Answer
