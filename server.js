const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


app.get("/", (req, res) => {
  res.send("Hello there");
});

//----------1. Be Nice Greet the Customer--------------//

app.get("/greeting/:name", (req, res) => {
  const { name } = req.params;
  const greetings = [
    `Hello there, ${name}.`,
    `What a delight it is to see you once more, ${name}!`,
  ];
  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

  res.send(randomGreeting);
});

//----------2. Rolling the Dice----------------------//

app.get("/roll/:number", (req, res) => {
  const maxNumber = parseInt(req.params.number);
  if (isNaN(maxNumber)) return res.send("You must give me a number.");
  const randomRoll = Math.floor(Math.random() * (maxNumber + 1));
  res.send(`You rolled a ${randomRoll}`);
});

//----------3. I want that one----------------------//

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);

    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

//----------4. Filter Shoes Query----------------------//

app.get('/shoes', (req, res) => {
    let { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;

    minPrice = minPrice ? parseFloat(minPrice) : null;
    maxPrice = maxPrice ? parseFloat(maxPrice) : null;

    let filteredShoes = shoes.filter(shoe => {
        const isAboveMinPrice = minPrice === null || shoe.price >= minPrice;
        const isBelowMaxPrice = maxPrice === null || shoe.price <= maxPrice;
        const isMatchingType = !type || shoe.type === type;
        return isAboveMinPrice && isBelowMaxPrice && isMatchingType;
    });

    res.send(filteredShoes);
})

//----------------------------------------//

app.get("/*", (req, res) => {
  res.send("404 file not found");
});
