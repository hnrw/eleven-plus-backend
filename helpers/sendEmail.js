const AWS = require("aws-sdk")

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-2",
}

const AWS_SES = new AWS.SES(SES_CONFIG)

const passwordReset = (email, resetUrl) => {
  // create js object with template data, then convert to json
  const templateData = { url: resetUrl }
  const templateJson = JSON.stringify(templateData)

  const params = {
    Source: "Backstage  < hey@askbackstage.co.uk >",
    Template: "BackstagePasswordReset",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: templateJson /* required */,
  }
  return AWS_SES.sendTemplatedEmail(params).promise()
}

const newAnswer = (email, answerer, url) => {
  const templateData = {
    answerer,
    url,
  }

  const templateJson = JSON.stringify(templateData)
  const params = {
    Source: "Backstage  < hey@askbackstage.co.uk >",
    Template: "AnswerRecieved",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: templateJson,
  }
  return AWS_SES.sendTemplatedEmail(params).promise()
}

const userRequest = (username, socialUrl, question = "none") => {
  const templateData = {
    username,
    socialUrl,
    question,
  }

  const templateJson = JSON.stringify(templateData)
  const params = {
    Source: "Backstage <hey@askbackstage.co.uk >",
    Template: "UserRequest",
    Destination: {
      ToAddresses: ["pannicope@gmail.com"],
    },
    TemplateData: templateJson,
  }
  return AWS_SES.sendTemplatedEmail(params).promise()
}

const newUser = (username, name, email) => {
  const templateData = {
    username,
    name,
    email,
  }

  const templateJson = JSON.stringify(templateData)
  const params = {
    Source: "Backstage <hey@askbackstage.co.uk >",
    Template: "NewUser",
    Destination: {
      ToAddresses: ["pannicope@gmail.com"],
    },
    TemplateData: templateJson,
  }
  return AWS_SES.sendTemplatedEmail(params).promise()
}

const newQuestion = (name, question, username, email) => {
  const templateData = { name, question, username, email }

  const templateJson = JSON.stringify(templateData)

  const params = {
    Source: "Backstage < hey@askbackstage.co.uk >",
    Template: "NewQuestion",
    Destination: {
      ToAddresses: [email],
    },
    TemplateData: templateJson,
  }
  return AWS_SES.sendTemplatedEmail(params).promise()
}

module.exports = { passwordReset, newAnswer, userRequest, newUser, newQuestion }
