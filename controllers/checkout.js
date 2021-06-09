require("dotenv").config()
const bcrypt = require("bcrypt")

const checkoutRouter = require("express").Router()

const stripe = require("stripe")(process.env.STRIPE_SECRET)

checkoutRouter.post("/", async (req, res) => {
  const { item, email, parentName, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  let price
  if (item === "27") {
    price = process.env.STRIPE_PRICE_27
  } else if (item === "37") {
    price = process.env.STRIPE_PRICE_37
  } else if (item === "270") {
    price = process.env.STRIPE_PRICE_270
  }

  const successUrl = `${process.env.FRONTEND}`
  const cancelUrl = `${process.env.FRONTEND}`

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: "subscription",
    customer_email: email,
    metadata: {
      parentName,
      passwordHash,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  res.json({ id: session.id })
})

module.exports = checkoutRouter
