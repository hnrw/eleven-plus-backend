require("dotenv").config()

const checkoutRouter = require("express").Router()

console.log(process.env.STRIPE_SECRET)
const stripe = require("stripe")(process.env.STRIPE_SECRET)

checkoutRouter.post("/", async (req, res) => {
  const { item, email, username, returnToUser } = req.body

  let price
  if (item === "27") {
    price = process.env.STRIPE_PRICE_27
  } else if (item === "37") {
    price = process.env.STRIPE_PRICE_37
  } else if (item === "270") {
    price = process.env.STRIPE_PRICE_270
  }

  let successUrl = `${process.env.FRONTEND}`
  let cancelUrl = `${process.env.FRONTEND}`

  // if (returnToUser) {
  //   successUrl = `${process.env.DOMAIN}/${returnToUser}`
  //   cancelUrl = `${process.env.DOMAIN}/${returnToUser}`
  // }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: "subscription",
    // customer_email: email,
    // metadata: {
    // username,
    // credits: item,
    // },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  res.json({ id: session.id })
})

module.exports = checkoutRouter
