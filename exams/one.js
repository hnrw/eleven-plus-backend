const problems = [
  {
    question: "What is the value of the 7 in 7 230 000",
    correct: "seven million",
    options: [
      "seven hundred million",
      "seven hundred thousand",
      "seventy thousand",
      "seventy million",
      "seven million",
    ],
    multi: true,
  },
  {
    question:
      "Which of the following is most likely to be the height of a fully grown tree?",
    correct: "12 metres",
    options: [
      "12 metres",
      "12 millimetres",
      "1.2 centimetres",
      "0.12 centimetres",
      "0.12 metres",
    ],
    multi: true,
  },
  {
    question:
      "Tallulah has drawn part of a shape.\nShe reflects her drawing in the dotted mirror line shown to make a shape. What type of shape does she form?",
    correct: "hexagon",
    options: ["pentagon", "octagon", "heptagon", "hexagon", "quadrilateral"],
    multi: true,
    img: "https://i.imgur.com/F1UwIt0.png",
  },
  // {
  //   question:
  //     "Courtney records the temperature each day for five days.\nOn which day does she record the lowest temperature?",
  //   correct: "answer",
  //   img: "https://i.imgur.com/eXYrYO4.png",
  // },
  {
    question:
      "Ted's favourite TV programmer is shown in the evening. It starts and finishes at the times shown on the clocks.\nHow long does the programme last for?",
    correct: "80",
    unit: "minutes",
    img: "https://i.imgur.com/xlEOK2L.png",
  },
  {
    question: "What is the area of this shape?",
    correct: "17.5",
    unit: "cm²s",
    img: "https://i.imgur.com/UPuM2sq.png",
  },
  {
    question: "What is 46 x 29?",
    correct: "1334",
  },
  {
    question: "Which of these numbers is the smallest?",
    correct: "0.18",
    options: ["0.81", "1.92", "12.4", "21.42", "0.18"],
    multi: true,
  },
  // {
  //   question:
  //     "Jane and Sue are playing a game. Jane starts at point (4,3). She moves 1 unit east and 2 units south on the grid. Which point (A,B,C,D or E) does she end up at?",
  //   correct: "E",
  //   img: "https://i.imgur.com/JO9o1bB.png",
  // },
  // {
  //   question:
  //     "Lucas lives in Kneesall. He needs to be at his school in Rippen by 8.40am to go on a trip.\nThe timetable shows the bus times.\nWhat is the latest time he can catch a bus?",
  //   correct: "8.30",
  //   img: "https://i.imgur.com/HxlFUli.png",
  // },
  {
    question:
      "The frequency chart shows the results of throwing a dice. How many times was the dice thrown altogether?",
    correct: "41",
    img: "https://i.imgur.com/uOAdejZ.png",
  },
  {
    question:
      "Macy buys four bunches of flowers. One of the bunches costs £1.99. The other three bunches cost £1.49.\nWhat is the total cost of the flowers?",
    correct: "£6.46",
    options: ["£6.59", "£6.46", "£5.56", "£5.64", "64.60"],
    multi: true,
  },
  {
    question: "Estimate the size of angle x",
    correct: "45°",
    options: ["10°", "95°", "80°", "15°", "45°"],
    img: "https://i.imgur.com/RJ5y4p1.png",
    multi: true,
  },
  {
    question: "How much does the kitten weight?",
    correct: "2.25 kg",
    options: ["2.05 kg", "2.05 g", "2.25 kg", "0.5 kg", "2.25 g"],
    multi: true,
    img: "https://i.imgur.com/lBpb8ck.png",
  },
  {
    question:
      "A regular heptagon has a perimeter of 56 cm. How long is each side?",
    correct: "8",
    unit: "cm",
  },
  {
    question:
      "The chart shows the masses of some bags of fruit on sale in a supermarket. Mr Smith buys 1 bag of oranges, 2 bags of bananas, 3 bags of apples and 1 bag of pears. How many kilograms of fruit has he bought?",
    correct: "3.75",
    unit: "kg",
    img: "https://i.imgur.com/yYnW1ul.png",
  },
  {
    question:
      "Joe eats three loaves of bread on a seven day holiday. He eats the same amount of bread each day.\nWhat fraction of a loaf does he eat each day of the holiday?",
    correct: "3/7",
    options: ["1/7", "3/7", "1/4", "4/7", "1/3"],
    multi: true,
  },
  {
    question:
      "The pie chart shows the pets belonging to the children in Sue's class. The total number of pets in the survey is 32.\nWhich of the following is the best estimate for the number of dogs owned by the class?",
    correct: "9",
    options: ["8", "15", "18", "6", "9"],
    multi: true,
    img: "https://i.imgur.com/TpZCE0i.png",
  },
  {
    question:
      "Li estimates the answer to 39 x 43 by rounding both numbers to the nearest 10 before multiplying them. What answer should he get?",
    correct: "1600",
    options: ["1500", "1600", "1200", "2000", "1677"],
    multi: true,
  },
  {
    question:
      "Harriet's class is split into groups. There are 4 boys and 3 girls in each group. There are 15 girls in the class. How many children are in her class?",
    correct: "35",
  },
  {
    question:
      "Tammy is buying some cakes for her birthday party. Which of the following is the cheapest price per cake?",
    correct: "25 for £2",
    options: [
      "15p each",
      "3 for 39p",
      "10 for £1",
      "25 for £2",
      "15 for £1.50",
    ],
    multi: true,
  },
  {
    question:
      "A caterer is making a sauce. She uses 2.25kg of apples for every 1kg of sugar. How many kilograms of apples will she need if she uses 9kg of sugar?",
    correct: "20.25 kg",
    options: ["4 kg", "202.5 kg", "2.025 kg", "2025 kg", "20.25 kg"],
    multi: true,
  },
  {
    question:
      "Look at the information on the right for a breakfast cereal. How much carbohydrate would be in a 20 gram serving of cereal?",
    correct: "14",
    unit: "grams",
    img: "https://i.imgur.com/KNRedQM.png",
  },
  {
    question:
      "A piece of ribbon is 48m long. It is cut into pieces that are each 1/3 m long. How many pieces are there?",
    correct: "144",
  },
  {
    question:
      "Rashid is thinking of a 3D shape. The shape has 4 faces, 4 vertices, and 6 edges. Which of the following could Rashid's shape be?",
    correct: "triangle-based pyramid",
    options: [
      "square-based pyramid",
      "triangle-based pyramid",
      "triangular prism",
      "cyclinder",
      "cube",
    ],
    multi: true,
  },
  {
    question:
      "Kate buys a second-hand car for £3,080. The original cost of the a car was £6,999. By how much has the car's value decreased?",
    correct: "3919",
    unit: "£",
  },
  {
    question:
      "Jonathan's family go on a journey which is shown on this graph. The family stops for a break. How long does the break last for?",
    correct: "1.5 hours",
    options: ["1.5 hours", "1 hour", "2 hours", "0.5 hour", "1.75 hours"],
    multi: true,
    img: "https://i.imgur.com/2MseXuy.png",
  },
  {
    question: "If 30 x 806 = 24 180. What is 30 x 403?",
    correct: "12 090",
    options: ["1209", "12900", "48 360", "4836", "12 090"],
    multi: true,
  },
  {
    question:
      "The diagram shows a patio made from two identical triangular slabs. What is the area of the patio?",
    correct: "19.2 m²",
    options: ["3.84 m²", "19.2 m²", "480 m²", "38.4 m²", "192 m²"],
    multi: true,
    img: "https://i.imgur.com/CTgQ3cp.png",
  },
  {
    question:
      "A school buys some badges to sell at the summer fair. The school pays 70p for each badge and sells them for £1 each.\nThe school sells all the badges, and makes a profit of £60. How many badges did the school buy?",
    correct: "200",
  },
  // {
  //   question:
  //     "Fred asked all the children in Year 6 what their favourite crisp flavour was. The bar chart shows his results.\nWhich two flavours together were as popular as Ready Salted?",
  //   correct: "answer",
  //   options: [
  //     "12 metres",
  //     "12 millimetres",
  //     "1.2 centimetres",
  //     "0.12 cenimetres",
  //     "0.12 metres",
  //   ],
  //   multi: true,
  // },
  {
    question: "Look at the volumes shown below. Find the total volume.",
    correct: "22.105",
    unit: "litres",
    img: "https://i.imgur.com/9qkMwJf.png",
  },
  {
    question:
      "Class 7 have made 250 biscuits to sell at the school fair. They pack them in bags of 12.\nHow many biscuits are left over?",
    correct: "10",
  },
  // {
  //   question:
  //     "A bag contains 5 cherry sweets and 10 lime sweets. What is the ration of cherry sweets to lime sweets in its simplest form?",
  //   correct: "",
  // },
  {
    question: "Find the sum of all the square numbers between 46 and 91.",
    correct: "194",
  },
  {
    question:
      "The pictogram shows the number of awards. Class 7 gained each day in a week.\nHow many more awards did the class get on Thursday than on Wednesday?",
    correct: "5",
    img: "https://i.imgur.com/Jz5dnpG.png",
  },
  {
    question:
      "A bag contains some striped balls and some spotted balls. The pattern on the balls is either red or yellow.\nThe table on the right show many of each ball there are.\nWhat percentage of the balls have a patter of yellow spots?",
    correct: "30",
    img: "https://i.imgur.com/UGwh4qv.png",
  },
  {
    question:
      "The table shows how much Ahmed saves each month. What is Ahmed's mean monthly saving for these 6 months?",
    correct: "1.10",
    img: "https://i.imgur.com/jlrPnny.png",
    unit: "£",
  },
  {
    question:
      "Mark takes seven 4cm cubes and places them end to end to make this shape. He then puts the shape on a piece of paper, and draws around it with a pencil.\n What is the perimeter of the shape that he draws?",
    correct: "64",
    unit: "cm",
    img: "https://i.imgur.com/XvR07IK.png",
  },
  {
    question:
      "Simon is investigating patterns made from triangles. Which expression represents the number of small triangles in the 𝑛th pattern in the series?",
    correct: "𝑛²",
    options: ["𝑛 + 1", "𝑛² + 1", "𝑛", "𝑛²", "𝑛² - 1"],
    multi: true,
    img: "https://i.imgur.com/mLSTFXZ.png",
  },
  {
    question:
      "A dog eats 245 g of dried food per meal. She has 3 meals per day.\nHow much food does the dog eat in a week?",
    correct: "5.145 kg",
    options: ["0.4725 kg", "5.145 kg", "3.375 kg", "1.575 kg", "47.25 kg"],
    multi: true,
  },
  {
    question:
      "The table shows the opening times of a cafe. The cost of running the cafe is £10 per hour.\nHow much more per week does it cost to run the cafe in the summer than in the winter?",
    correct: "280",
    unit: "£",
    img: "https://i.imgur.com/gV1PIta.png",
  },
  {
    question:
      "The net folds up to form a 3-dimensional shape. What is the volume of this shape?",
    correct: "42",
    unit: "cm³",
    img: "https://i.imgur.com/KeOUByP.png",
  },
  {
    question:
      "Katie buys six 1 litre cartons of milk each week. She drinks 350 ml of milk twice a day.\nShe uses the whole carton before she opens a new one.\nHow much milk will be left over after 7 days?",
    correct: "1100",
    unit: "ml",
  },
  {
    question:
      "Oscar faces north and then turns through 225° in a clockwise direction. Which direction is he now facing?",
    correct: "south west",
    options: ["west", "south west", "south east", "south", "east"],
    multi: true,
    img: "https://i.imgur.com/BHSkQxF.png",
  },
  // {
  //   question:
  //     "Bibal is drawing a parallelogram on a coordinate grid. Points A, B and C are three of the corners of the parrallelogram.\nWhat are the coordinates of the fourth corner of the parallelogram?",
  //   correct: "answer",
  // },
  {
    question:
      "𝑥² - 1 > 49\nIf x is a positive whole number, what is the smallest it could be?",
    correct: "8",
  },
  {
    question:
      "Look at the function machine on the right. If the number 25 comes out of the machine what number went in?",
    correct: "35",
    img: "https://i.imgur.com/uPt3FGa.png",
  },
  {
    question:
      "Which formula can be used to work out the 𝑛th term of this series?",
    correct: "2𝑛 - 3",
    options: ["3𝑛", "𝑛 - 3", "2𝑛 - 3", "2 ÷ 𝑛 - 3", "2𝑛 + 3"],
    img: "https://i.imgur.com/r7vyW58.png",
    multi: true,
  },
  {
    question:
      "Roger wants to spread grass seed on a rectangular area of soil. A tub of seed costs £5.99 and covers 12 square meters of soil.\n How much will the seed cost altogether if Roger's area of soil measure 8 metres by 6 metres?",
    correct: "23.96",
    unit: "£",
  },
  {
    question:
      "Lucy wants to buy a T-shirt in a sale. All items in the sale are reduced by 60%.\n What is the sale price of the T-shirt if the original price was £𝑛?",
    correct: "⅖(𝑛)",
    options: ["⅖(𝑛)", "⅗(𝑛)", "𝑛 - 60", "𝑛 ÷ 60", "2𝑛 - 6"],
    multi: true,
  },
]

module.exports = problems
