// MockTests.com Maths 2

const problems = [
  {
    question:
      "Which point represents 5.25 on the above number line? Write your asnwer in the space provided above.",
    correct: "B",
    options: ["A", "B", "C", "D", "E"],
    multi: true,
    img: "https://i.imgur.com/j0SGOw8.png",
  },
  {
    question: "Round the follwing number to the nearest tenth: 498.36765321",
    correct: "498.4",
  },
  {
    question:
      "Which of the following numbers is both a triangular and a prime number?",
    correct: "3",
    options: ["2", "5", "3", "13", "29"],
    multi: true,
  },
  {
    question:
      "Which of the following numbers is the lowest Common Multiple (LCM) of 5 and 30?",
    correct: "5",
    options: ["5", "10", "6", "30", "3"],
    multi: true,
  },
  {
    question:
      "Mr Edward picked 801 of the 7,965 berries on the bushes in his garden. How many are left?",
    correct: "242.69",
    unit: "£",
  },
  {
    question:
      "The Glitz Fashion shop was having a sale. Jessica bought five T-shirts for £12.89, four bracelets for £15.73, and six rings for £19.22. How much money did Jessica spend altogether on accessories?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "Which of the following numbers it her remainder when you divide 46 by 6?",
    correct: "4",
    options: ["1", "2", "3", "4", "5", "7"],
    multi: true,
  },
  {
    question: "Calculate the following sum 456 ÷ 12",
    correct: "38",
  },
  {
    question:
      "The cost for bowling at a certain bowling alley is £2.50 for shoes and £4.25 for each game bowled. Austin spent £15.25. How many games did Austin play?",
    correct: 3,
  },
  {
    question:
      "Calvin has 25 comic books and he wants to give Robbie 3/5th of them. How many will Calvin give to Robbie?",
    correct: 15,
  },
  {
    question:
      "I am thinking of a number. I multiply my number by 7 and subtract 5. My answer is 51. What is the number that I am thinking of?",
    correct: "8",
  },
  {
    question:
      "George and Tiffany each have a bag of marbles. George has 912 marbles. Tiffany has 387 marbles. How many more marbles does George have than Tiffany?",
    correct: "525",
  },
  {
    question:
      "Wrte the following number as a decimal number. 76 + 4 + ²⁄₁₀ + ⁸⁄₁₀₀",
    correct: "80.28",
  },
  {
    question: "Which of the following fractions is closest to ⅕?",
    correct: "⁶⁄₂₅",
    options: ["½", "⁵⁄₁₀", "⅗", "⁶⁄₂₅", "⅜"],
    multi: true,
  },
  {
    question:
      "At the local library, 76 books were retunred on the 1st day of the week, of which 24 were overdue. What fraction of the books returned were overdue?",
    correct: "6/19",
    options: ["6/19", "6/25", "3/8", "5/11", "6/15"],
    multi: true,
  },
  {
    question:
      "What is the new price of a bike which normally costs £75 but it is reduced by 20% in the sale?",
    correct: "93.75",
    unit: "£",
  },
  {
    question: "If 3b + 8 = 9b - 16. What is the value of b?",
    correct: "4",
  },
  {
    question:
      "Which mathematical symbol can be placed in the middle of the fractions below?",
    correct: ">",
    options: [">", "<", "="],
    multi: true,
  },
  {
    question:
      "37 out of 50 pupils in a school said they have a Nintendo Switch at home. What percentage is this?",
    correct: 64,
    unit: "%",
  },
  //   {
  //     question: "What percentage of this grid is shaded?",
  //     correct: "correctcorrectcorrect",
  //     unit: "%",
  //   },
  {
    question:
      "Bob's school sold 300 tickets for a raffle. 4% of the tickets won a prize. How many tickets did not win a prize?",
    correct: 288,
  },
  {
    question: "Which answer of the follwing is different from the others?",
    correct: "30% of £75",
    options: [
      "50% of £50",
      "53% of £100",
      "⅝ of £40",
      "30% of £75",
      "10% of £250",
    ],
    multi: true,
  },
  {
    question:
      "Mark has just building a model aeroplane with a scale of 1:72. The model is 20cm long. How long is the actual aeroplane?",
    correct: 1440,
  },
  {
    question:
      "During a TV quiz game, the quesitons are answered correctly by presenters Ant and Dec in teh ration of 5:4. If Ant answered 20 questions right, how many questions did Ant Dec answer correctly in total?",
    correct: 36,
  },
  {
    question:
      "The graph shows the number of complaint letters received by the local country council over a period of five weeks. What is the range of quantities of letters received?",
    correct: 150,
  },
  {
    question:
      "In the graph above, how many more complaint letters were received in week 1 than in week 5?",
    correct: 150,
  },
  {
    question:
      "In the graph above, what is the mean number of complain letters received in a  week?",
    correct: 150,
  },
  {
    question:
      "During the half term holidays, Tina took 7 spelling tests. Here are the results out of 20. What was her mean score?",
    correct: 15,
  },
  {
    question: "What was Tina's median scores in the spelling tests?",
    correct: 14,
  },
  //   {
  //     question:
  //       "There are 30 children in a class. 16 girls and boys. One child's name is chosen at random to become a class prefect. What is the chance the child will be a boy?",
  //     correct: "correctcorrectcorrect",
  //   },
  //   {
  //     question: "Which of these nets will fold to form a square based pyramid?",
  //     correct: "correctcorrectcorrect",
  //     options: ["A", "B", "C", "D", "E"],
  //     multi: true,
  //   },
  {
    question: "What is the perimeter of the following shape?",
    correct: 26,
    img: "https://i.imgur.com/YELCAJ2.png",
  },
  {
    question: "What is the area of the above shape?",
    correct: 35,
  },
  {
    question: "What is the size of angle 'a' in the diagram?",
    correct: 135,
    img: "https://i.imgur.com/ao043Y9.png",
    unit: "°",
  },
  {
    question: "Find the volume of this cuboid in cubic centimetres.",
    correct: "correctcorrectcorrect",
    unit: "cm³",
  },
  {
    question:
      "The diagram shows a square. Two straight lines cut the square into four rectangles. The area of one of the rectangles is shown. Work out the area of the rectangle marked A",
    correct: "correctcorrectcorrect",
    img: "https://i.imgur.com/ao043Y9.png",
    unit: "²",
  },
  {
    question: "Name the following 2D shape.",
    correct: "Pentagon",
    options: ["Pentagon", "Hexagon", "Octogon", "Paralellogram", "Trapezium"],
    img: "https://i.imgur.com/w4b6zrF.png",
    multi: true,
  },
  //   {
  //     question:
  //       "This is a map of the corridors in Newham hostel. You must try to find your way from the lounge to the dining room using a set of instructions. F = forward. R = 90° turn. L = 90° turn",
  //     correct: "correctcorrectcorrect",
  //     options: [
  //       "F 5, R, F 4, L, F 4",
  //       "BBBBBBBBBB",
  //       "CCCCCCCCCC",
  //       "DDDDDDDDDD",
  //       "EEEEEEEEE",
  //     ],
  //     multi: true,
  //   },
  {
    question: "Estimate the weight of an average orange.",
    correct: "200g",
    options: ["1kg", "2kg", "10g", "200g", "800g"],
    multi: true,
  },
  {
    question:
      "On a map a scale of 1cm to 700 metres is used. If a river is 2100 metres long in real life, what length would it be on the map?",
    correct: 3,
    unit: "cm",
  },
  {
    question:
      "A train leaves London at 9.16am and arrives in Scotland at 16.03. How long did the journey take?",
    correct: 407,
    unit: "minutes",
  },

  //   {
  //     question:
  //       "Which point represents 5.25 on the above number line? Write your asnwer in the space provided above.",
  //     correct: "correctcorrectcorrect",
  //     options: [
  //       "AAAAAAAAAAA",
  //       "BBBBBBBBBB",
  //       "CCCCCCCCCC",
  //       "DDDDDDDDDD",
  //       "EEEEEEEEE",
  //     ],
  //     multi: true,
  //   },
]

module.exports = problems
