const { PrismaClient } = require("@prisma/client")
const dayjs = require("dayjs")
const webhooksRouter = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const bodyParser = require("body-parser")
const userService = require("../services/userService")
const logger = require("../utils/logger")

const prisma = new PrismaClient()

const endpointSecret = process.env.ENDPOINT_SECRET

const updateSubscription = async (invoice) => {
  logger.info("Invoice paid", invoice)

  const subscriptionId = invoice.subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const customer = await stripe.customers.retrieve(invoice.customer)

  logger.info("Subscription: ", subscription)
  logger.info("Customer: ", customer)

  const subEnds = dayjs(subscription.current_period_end * 1000)
    .add(1, "day")
    .toDate()

  const updatedUser = await prisma.user.update({
    where: { email: customer.email },
    data: {
      subEnds,
      stripeId: customer.id,
      stripeSubId: subscription.id,
      active: true,
    },
  })

  await stripe.customers.update(customer.id, {
    metadata: {
      id: updatedUser.id,
      parentName: updatedUser.parentName,
      email: updatedUser.email,
    },
  })
}

const onPaymentFailed = async (session) => {
  logger.info("Payemnt failed", session)
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
      case "checkout.session.completed": {
        const paymentIntent = event.data.object
        // await fufillOrder(paymentIntent)
        logger.info(`PaymentIntent for ${paymentIntent.amount} was successful!`)
        break
      }
      case "invoice.paid": {
        const invoice = event.data.object
        await updateSubscription(invoice)
        break
      }
      case "invoice.payment_failed": {
        await onPaymentFailed(event.type)
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
