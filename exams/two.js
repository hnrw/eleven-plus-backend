const problems = [
  {
    question:
      "Each of the small squares in the shape on the right has an area of 1 cm². What is the total shape of the shape?",
    correct: "correctcorrectcorrect",
    unit: "cm²",
  },
  {
    question: "How many lines of symmetry does the hexagon on the right have? ",
    correct: "correctcorrectcorrect",
    options: ["1", "2", "3", "4", "6"],
    multi: true,
  },
  {
    question:
      "Which unit is most suitable for measuring the length of a football pitch?",
    correct: "correctcorrectcorrect",
    options: ["centimetres", "metres", "litres", "millimetres", "kilometres"],
    multi: true,
  },
  {
    question:
      "Elsa counts the vehicles that pass her school during her lunchtime. THe pictogram shows her results. How many buses did she see?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "The Venn diagram on the right shows how many children in a class have bikes, skateboards and scooters. How many children have a skateboard an a scooter, but not a bike?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "Maddy buts a tomato salad, some cloewslaw and a jacket potato. How much chane will she recieve from a £5 note?",
    correct: "correctcorrectcorrect",
    options: ["£1.64", "£2.16", "£3.36", "£33.60", "£3.63"],
    multi: true,
  },
  {
    question: "Which of the follwing times is the same as 13:45?",
    correct: "correctcorrectcorrect",
    options: ["1:45 pm", "2:45 am", "1:45 am", "3:45 pm", "2:45 pm"],
    multi: true,
  },
  {
    question:
      "Sasha stars her homework at 4:20 pm. She can stop and go to visit her friend when she has done 1¾ of homework. What time can she visit her friend?",
    correct: "correctcorrectcorrect",
  },
  {
    question: "What is 9.45 ÷ 12.5?",
    correct: "correctcorrectcorrect",
    options: ["3.6", "14.175", "630", "6.3", "63"],
    multi: true,
  },
  {
    question: "Which is the most likely mass of a tin of soup?",
    correct: "correctcorrectcorrect",
    options: ["0.4 g", "400 g", "40 kg", "4 kg", "4g"],
    multi: true,
  },
  {
    question:
      "The chart shows the number of boys and girls in each year group in a school. How many children are in the biggest year group?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "What is the sum of the numbers of faces, edges and vertices of a cube?",
    correct: "correctcorrectcorrect",
  },
  {
    question: "If 90 x 80 = 7200. What is 90 x 0.08?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "1.75 pints = 1 litre. How many pint bottles would you need to hold 6 litres of water?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "Which of the shapes on the right has exactly one pair of parallel sides?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "Ben makes this pattern by repeating three shapes over and over again. How many hearts will ther be in the first 20 shapes?",
    correct: "correctcorrectcorrect",
    options: ["6", "7", "3", "8", "4"],
    multi: true,
  },
  {
    question:
      "A group of children have a competition to see who is fastest at running from one end of the playground to the other. The results are shown in the table on the right. Who came second?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "Ian buys 6 sandwiches costing £1.99 each and 3 drinkgs costing 49p each. He does this calculation to estimate the cost: 6 x £2 + 3 x £0.50. How dose his estimate differ from the exact cost?",
    correct: "correctcorrectcorrect",
    options: [
      "£12 too much",
      "9p too much",
      "12p too little",
      "9p too little",
      "6p too much",
    ],
    multi: true,
  },
  {
    question: "If 349 x 84 = 29 316. What is 349 x 42?",
    correct: "correctcorrectcorrect",
    options: ["7329", "146 580", "17 264", "58 632", "14 568"],
    multi: true,
  },
  {
    question:
      "What fractino of the faces on a fair, six-sided dice show prime numbers?",
    correct: "correctcorrectcorrect",
    options: ["½", "⅚", "⁴⁄₆", "⅓", "⅔"],
    multi: true,
  },
  {
    question: "questionquestionquestion",
    correct: "correctcorrectcorrect",
    options: [
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
    ],
    multi: true,
  },
  {
    question:
      "The temperature of a patient at 9am each day was recorded and plotted on a graph. What is the difference between the highest and lowest temperatures?",
    correct: "correctcorrectcorrect",
    unit: "°C",
  },
  {
    question:
      "Sue's car usees 5 full tanks of petrol to travel 2985. How many miles can she travel on one full tank of petrol?",
    correct: "correctcorrectcorrect",
    unit: "miles",
  },
  {
    question:
      "Jenny is standing facing north at the point marked X on the grid. She moves 3 units forward, then makes an anticlockwise turn through 135°. Which letter is she now facing?",
    correct: "correctcorrectcorrect",
    options: ["A", "B", "C", "D", "X", "E"],
    multi: true,
  },
  {
    question:
      "Which number should go in the circle to make this equation correct?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "Which diagram on the right show show this 3-dimensional shape would look when viewed from directly above?",
    correct: "ans",
    options: ["A", "B", "C", "D", "E"],
    multi: true,
  },
  {
    question:
      "Jon thinks of a number. He multiplies it by 11 and subtracts 9. The answer he gets is 112. What number did he start with?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "The table show sthe number of awards each class were given. What is the mean number of awards?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "The diagram shows a garden with a flower bed. What is teh area of the lawn?",
    correct: "correctcorrectcorrect",
    unit: "m²",
  },
  {
    question:
      "Luke started at -5 and counted up in steps of 1.5. Which of the following numbers did he count?qj",
    correct: "correctcorrectcorrect",
    options: ["-1", "0", "2", "3", "4"],
    multi: true,
  },
  {
    question:
      "The chart on the right shows the proportions of boys and girls in the chess club and the cimpute club. There are 30 children in each club. How many more boys than girls are there in the computer club?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "Sarah has run aa total distance of 168 km over a 12 week period. How far does she run each day if she runs the same distance each day?",
    correct: "correctcorrectcorrect",
    unit: "km",
  },
  {
    question:
      "On Saturday April 23rd, Claire's father tells her that it is 6 weeks unitl they go on holiday. They are going on holiday on a Saturday. What date will this be?",
    correct: "correctcorrectcorrect",
    options: ["1st June", "2nd June", "3rd June", "4th June", "5th June"],
    multi: true,
  },
  {
    question:
      "On the right is a hopscotch grid. The sum of the numbers on the grid is 55. The grid is extended so that the greatest number at the top of the grid is 20. What is the sum of all the numbers on the grid?",
    correct: "correctcorrectcorrect",
    options: [
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
    ],
    multi: true,
  },
  {
    question:
      "Popp is investigating a pattern made of squares. How many squares will be in the shape 11 of the pattern?",
    correct: "correctcorrectcorrect",
  },
  {
    question: "questionquestionquestion",
    correct: "correctcorrectcorrect",
    options: [
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
    ],
    multi: true,
  },
  {
    question:
      "Caleb pours ⅖ of a litre of water out of a full 10 litres bucket. How many millilitres are left in the bucket?",
    correct: "correctcorrectcorrect",
    options: ["960 ml", "9600 ml", "96 ml", "6000 ml", "4000 ml"],
    multi: true,
  },
  {
    question:
      "The rectangle on the right is enlarged by a scale factor of 2. What is the area of the enlarged rectangle?",
    correct: "correct",
    unit: "cm²",
  },
  {
    question:
      "A school holds a concert. There are 42 rows of 48 seats. How many seats are there?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "The volume of a triangular prism is = area of trianglular side x length. What is the volume of this triangular prism?",
    correct: "correctcorrectcorrect",
    unit: "cm3",
  },
  {
    question: "What number is exactly half-way between 4.19 and 3.81?",
    correct: "correctcorrectcorrect",
    options: ["4.1", "4", "3.9", "3.09", "4.09"],
    multi: true,
  },
  {
    question:
      "The perimeter of a rectangular floor tile is 128 cm. The tile is three times as long as it is wide. What is its length?",
    correct: "correctcorrectcorrect",
    unit: "cm",
  },
  {
    question:
      "Sleeping bags are given a rating to show the minimum temperature they can be used at: Adam needs to buy a sleeping bad that he can use at 25 °F. The graph on the right can be used to change a temperature in °F to a temperature in °C. What is the lowest rating of sleeping bag Adam can buy?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "The ages in months of four out of the six babies at a clinic are given below. The mean age of the siz babies is 5 months. Which of the folliwng could be the ages in months of the firth and sizth babies?",
    correct: "correctcorrectcorrect",
    options: ["8 and 12", "1 and 2", "2 and 8", "6 and 5", "3 and 4"],
    multi: true,
  },
  {
    question:
      "How many degress does the minute hand on a clock turn through between 12 noon and 10:30pm?",
    correct: "correctcorrectcorrect",
    options: ["3160°", "3780°", "2300°", "2430°", "3600°"],
    multi: true,
  },
  {
    question: "questionquestionquestion",
    correct: "correctcorrectcorrect",
    options: [
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
      "optionoptionoption",
    ],
    multi: true,
  },
  {
    question:
      "A printer uses the following formula to work out the cost, C, in pounds, of prining m leaflets: C = 15(𝑛 ÷ 100) + 5. How much will it cost to have 300 leaflets printed?",
    correct: "correctcorrectcorrect",
  },
  {
    question:
      "James records the weather for 20 days. He draws a pie chart of his results. It was foggy for 3 days. What size angle should he draw to represent this?",
    correct: "correctcorrectcorrect",
    options: ["90°", "54°", "36°", "45°", "180°"],
    multi: true,
  },
  {
    question:
      "Rashid gets £2.50 pocket money each week. He is given an extra 30% pocket money if he cleans the family car. How much money will he receive over 3 weeks if he cleans the car each week?",
    correct: "correctcorrectcorrect",
    unit: "£",
  },
  {
    question:
      "Russell wins £500 in a prize draw. He spends £260 on a new computer, and decides to buy some games that cost £39.99 each. Which expression gives the amount of money Russell will have left if he buys 𝑛 games?",
    correct: "correctcorrectcorrect",
    options: [
      "240𝑛",
      "500 - 260𝑛",
      "240 + 39.99𝑛",
      "240 - 39.99𝑛",
      "500 - 39.99𝑛",
    ],
    multi: true,
  },
]

console.log(problems.length)
module.exports = problems
