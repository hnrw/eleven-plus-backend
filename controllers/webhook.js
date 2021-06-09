const webhooksRouter = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const bodyParser = require("body-parser")
const User = require("../models/user")
const userService = require("../services/userService")
const logger = require("../utils/logger")

const endpointSecret = process.env.ENDPOINT_SECRET
const time32days = 3600 * 1000 * 24 * 32
const subEnds = Date.now() + time32days

const fufillOrder = async (session) => {
  // eslint-disable-next-line no-console
  logger.info("Fulfilling order", session)

  const customer = await stripe.customers.retrieve(session.customer)
  const user = await User.findById(customer.metadata.id)

  if (user) {
    user.subEnds = subEnds
    await user.save()
    return
  }

  const response = await userService.createUser({
    email: customer.email,
    password: "123",
    stripeId: customer.id,
    subEnds,
  })
  const savedUser = response.data

  stripe.customers.update(session.customer, {
    metadata: { id: savedUser.id, email: savedUser.id },
  })
}

webhooksRouter.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  // eslint-disable-next-line consistent-return
  async (request, response) => {
    const payload = request.body
    const sig = request.headers["stripe-signature"]
    let event
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
      // eslint-disable-next-line no-console
      logger.error(err.message)
      return response.status(400).send(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object
        console.log(event.data.object)
        fufillOrder(paymentIntent)
        logger.info(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break
      }
      case "payment_method.attached": {
        const paymentMethod = event.data.object
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break
      }
      default:
        // Unexpected event type
        logger.error(`Unhandled event type ${event.type}.`)
    }

    response.status(204).end()
  }
)

module.exports = webhooksRouter
