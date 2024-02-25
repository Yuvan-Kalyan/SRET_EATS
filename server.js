const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectID } = require('mongodb');

app.use(bodyParser.json());
app.use(cors());

let nextUserId = 1; // Initialize the user ID counter

// In-memory user store (for demonstration purposes)
const users = {
  'user1@example.com': { userId: nextUserId++, email: 'user1@example.com', password: 'password1' },
  'user2@example.com': { userId: nextUserId++, email: 'user2@example.com', password: 'password2' },
  'user3@example.com': { userId: nextUserId++, email: 'user3@example.com', password: 'password3' },
};

// In-memory favorites store (for demonstration purposes)
const favorites = [];
const carts = [];

// Registration route
app.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if the email is already taken
  if (users[email]) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Increment the user ID and store user data in memory (for demonstration purposes)
  const userId = nextUserId++;
  users[email] = { userId, email, password };

  return res.status(201).json({ message: 'User registered successfully', userId });
});

// Sign-in route
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists and the password matches
  if (users[email] && users[email].password === password) {
    // Authentication successful
    const userId = users[email].userId;
    res.json({ success: true, message: 'Authentication successful', userId });
  } else {
    // Authentication failed
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});

app.post('/add-to-cart',(req,res)=>{
  const { userId, foodId, name, type, img, price, TypeImage } = req.body;

  

  const cart = {
    userId,
    foodId,
    name,
    type,
    img,
    price,
    TypeImage

  };
  carts.push(cart);

  return res.status(201).json({message : 'Added to cart successfully'});
})

// Add to favorites route
app.post('/add-to-favorites', (req, res) => {
  const { userId, foodId, name, type, img, price, TypeImage } = req.body;

  // Create a new favorite object
  const favorite = {
    userId,
    foodId,
    name,
    type,
    img,
    price,
    TypeImage,
  };

  // Add the favorite to the favorites array
  favorites.push(favorite);
  

  return res.status(201).json({ message: 'Added to favorites successfully' });
});

// Get user's favorites route
app.get('/user-favorites/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);

  // Filter favorites based on the user ID
  const userFavorites = favorites.filter((favorite) => favorite.userId === userId);

  res.json(userFavorites);
});

// Retrieve favorites for a user by userId
app.get('/favorites/:userId', (req, res) => {
  const userId = parseInt(req.params.userId); // Parse userId from URL parameter

  // Filter the favorites array to get items for the specified user
  const userFavorites = favorites.filter((favorite) => favorite.userId === userId);

  res.status(200).json(userFavorites);
});


app.get('/user-cart/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);

  // Find the user's cart based on userId
  const userCart = carts.filter((cart) => cart.userId === userId);

  if (userCart) {
    // If the user has a cart, return the entire cart object
    res.status(200).json(userCart);
  } else {
    // If the user doesn't have a cart yet, return an empty cart object
    res.status(200).json({ userId, items: [] });
  }
});


const orders = [];

// Place order route
app.post('/place-order', (req, res) => {
  const { userId, items } = req.body;

  let totalCost = 0;

  items.forEach((i)=>{
    totalCost  = totalCost + i.price
 })

  // Create a new order object
  const order = {
    orderId: orders.length + 1, // Assign a unique order ID
    userId,
    items,
    totalCost,
  };

  // Add the order to the orders array
  orders.push(order);
  console.log(order.items)
  

  return res.status(201).json({ message: 'Order placed successfully', orderId: order.orderId });
});

app.get('/get-order-items', (req, res) => {
  // Return the order items as JSON
  res.status(200).json(orders);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});