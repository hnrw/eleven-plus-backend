const AWS = require("aws-sdk")

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "eu-west-2",
}

const AWS_SES = new AWS.SES(SES_CONFIG)

const passwordReset = (data) => {
  const { email, resetUrl } = data
  // create js object with template data, then convert to json
  const templateData = { url: resetUrl }
  const templateJson = JSON.stringify(templateData)

  const params = {
    Source: "Waterfront  < admin@waterfrontlearn.com >",
    Template: "BackstagePasswordReset",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: templateJson /* required */,
  }
  return AWS_SES.sendTemplatedEmail(params).promise()
}

module.exports = {
  passwordReset,
}
