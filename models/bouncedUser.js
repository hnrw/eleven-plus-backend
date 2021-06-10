/* eslint-disable no-param-reassign */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const bouncedUserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    maxLength: 254,
  },
  parentName: {
    type: String,
    required: false,
    maxLength: 50,
  },
  date: {
    type: Number,
    required: true,
  },
})

bouncedUserSchema.plugin(uniqueValidator)

bouncedUserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const BouncedUser = mongoose.model("BouncedUser", bouncedUserSchema)

module.exports = BouncedUser
