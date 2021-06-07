const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const gradedTest = new mongoose.Schema({
  marks: {
    type: Number,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
  gradedProblems: {
    type: mongoose.Mixed,
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  ],
})

gradedTest.plugin(uniqueValidator)

gradedTest.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const GradedTest = mongoose.model("GradedTest", gradedTest)

module.exports = GradedTest
