const isProblemCorrect = (problem) => {
  if (problem.multi) {
    return problem.selected === problem.correct
  }
  return Number(problem.selected) === Number(problem.correct)
}

module.exports = isProblemCorrect
