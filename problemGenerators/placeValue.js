const rand = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const foo = () => {
  const num = 35982
  const digit = 5
  const base = 10
  const correct = 359.82

  return {
    question: `Add a decimal point somewhere in the number ${num}, so it has 5 tens.`,
    correct: 0,
    unit: "cm",
  }
}

const num = rand(100, 1000000)
const digit = rand(1, 10)
const base = rand
