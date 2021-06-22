const isFirstAttemptAtTest = async (usersGradedTests, testId) => {
  let firstAttempt = true
  if (usersGradedTests.filter((gt) => gt.testId === testId).length > 0) {
    firstAttempt = false
  }
  return firstAttempt
}

module.exports = isFirstAttemptAtTest
