/* eslint-disable no-param-reassign */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const testSession = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    unique: true,
  },
  start: {
    type: Number,
  },
})

testSession.plugin(uniqueValidator)

testSession.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const TestSession = mongoose.model("TestSession", testSession)

module.exports = TestSession
