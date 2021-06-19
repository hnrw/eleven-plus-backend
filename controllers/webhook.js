const { PrismaClient } = require("@prisma/client")
const dayjs = require("dayjs")
const webhooksRouter = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const bodyParser = require("body-parser")
const userService = require("../services/userService")
const logger = require("../utils/logger")

const prisma = new PrismaClient()

const endpointSecret = process.env.ENDPOINT_SECRET

const fufillOrder = async (session) => {
  // eslint-disable-next-line no-console
  logger.info("Fulfilling order", session)

  const customer = await stripe.customers.retrieve(session.customer)

  const subEnds = dayjs().add(7, "days").toDate()

  const response = await userService.createUser({
    email: customer.email,
    stripeId: customer.id,
    subEnds,
    passwordHash: session.metadata.passwordHash,
    parentName: session.metadata.parentName,
  })

  const savedUser = response.data

  stripe.customers.update(session.customer, {
    metadata: { id: savedUser.id },
  })
}

const updateSubscription = async (invoice) => {
  logger.info("Invoice paid", invoice)

  const subscriptionId = invoice.subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  logger.info("Subscription: ", subscription)

  const subEnds = dayjs(subscription.current_period_end * 1000)
    .add(1, "day")
    .toDate()
  const customer = await stripe.customers.retrieve(invoice.customer)

  await prisma.user.update({
    where: { id: customer.metadata.id },
    data: {
      subEnds,
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
        await fufillOrder(paymentIntent)
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
