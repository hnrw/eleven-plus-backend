require("dotenv").config()

const stripeRouter = require("express").Router()

const stripe = require("stripe")(process.env.STRIPE_SECRET)

stripeRouter.post("/checkout", async (req, res) => {
  const { item, email } = req.body

  let price
  if (item === "month") {
    price = process.env.STRIPE_PRICE_MONTH
  } else if (item === "year") {
    price = process.env.STRIPE_PRICE_YEAR
  }

  const successUrl = `${process.env.FRONTEND}/home`
  const cancelUrl = `${process.env.FRONTEND}/signup`

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
    metadata: {},
    subscription_data: {
      trial_period_days: 7,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  res.json({ id: session.id })
})

stripeRouter.post("/customer-portal", async (request, response) => {
  const { customerId } = request.body
  const returnUrl = process.env.FRONTEND

  const portalsession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  response.send({
    url: portalsession.url,
  })
})
module.exports = stripeRouter
