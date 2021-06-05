/* eslint-disable no-param-reassign */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const test = new mongoose.Schema({
  num: {
    type: Number,
    unique: true,
  },
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
})

test.plugin(uniqueValidator)

test.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const Test = mongoose.model("Test", test)

module.exports = Test
