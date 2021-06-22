const allCategoriesValid = (problems) => {
  problems.forEach((problem) => {
    problem.categories.forEach((category) => {
      if (
        category !== "numbers" &&
        category !== "addition and subtraction" &&
        category !== "multiplication and division" &&
        category !== "fractions" &&
        category !== "measurement" &&
        category !== "geometry" &&
        category !== "statistics" &&
        category !== "ratio and proportion" &&
        category !== "algebra"
      ) {
        throw new Error(`${problem.question} has wrong category ${category}`)
      }
    })
  })
}

module.exports = allCategoriesValid
