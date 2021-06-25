require("dotenv").config()
const stripeRouter = require("express").Router()

const { PrismaClient } = require("@prisma/client")
const stripe = require("stripe")(process.env.STRIPE_SECRET)

const prisma = new PrismaClient()

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

  const user = await prisma.user.findUnique({ where: { email } })
  const previouslySubscribed = user?.stripeId

  const sessionData = {
    payment_method_types: ["card"],
    line_items: [
      {
        price,
        quantity: 1,
      },
    ],
    mode: "subscription",
    metadata: {},
    success_url: successUrl,
    cancel_url: cancelUrl,
  }

  if (previouslySubscribed) {
    sessionData.customer = user.stripeId
  } else {
    const subscriptionData = { trial_period_days: 14 }
    sessionData.customer_email = email
    sessionData.subscription_data = subscriptionData
  }

  const session = await stripe.checkout.sessions.create(sessionData)

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
