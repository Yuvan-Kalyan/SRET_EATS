const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb://127.0.0.1:27017'; // MongoDB URL
const dbName = 'sret_eats'; // Database name
const collectionName = 'user_data'; // Collection name

const client = new MongoClient(uri);

// Connect to MongoDB
console.log('Before MongoDB connection');

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    // Define the userCollection
    const userCollection = client.db(dbName).collection(collectionName);

    // Registration route
    app.post('/register', async (req, res) => {
        const { name, email, phone, password } = req.body;
      
        try {
          // Check if the email is already taken in the database
          const existingUser = await userCollection.findOne({ email });
      
          if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
          }
      
          // Create a new user document
          const newUser = [{
            name,
            email,
            phone,
            password, // Assuming you store the password as plain text
          }];
      
          // Insert the new user data into the MongoDB collection
          const result = await userCollection.insertMany(newUser);
      
          if (result.insertedCount === 1) {
            // Return the inserted user data
            const user = {
              _id: result.insertedIds[0],
              name,
              email,
              phone,
            };
           
      
            return res.status(201).json({ message: 'User registered successfully', user: user });
          } else {
            return res.status(500).json({ message: 'User registration failed - Insertion error' });
          }
        }  catch (err) {
            console.error('MongoDB Error:', err);
            res.status(500).json({ message: 'User registration failed - MongoDB insertion error' });
          }
          
      });
      

// Signin route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await userCollection.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // Verify the provided password against the stored password hash
      if (password === user.password) {
        // Passwords match; signin successful
        return res.status(200).json({ message: 'Signin successful', user: { _id: user._id } });
      } else {
        // Passwords do not match; signin failed
        return res.status(401).json({ message: 'Invalid password' });
      }
    } catch (err) {
      console.error('Error signing in user:', err);
      res.status(500).json({ message: 'Signin failed - Internal server error' });
    }
  });


  app.post('/add-to-cart', async (req, res) => {
    const { userId, foodId, name, type, img, price, TypeImage } = req.body;
  
    try {
      // Define the cartCollection
      const cartCollection = client.db(dbName).collection('cart_data');
  
      // Create a new cart document
      const cart =[ {
        userId,
        foodId,
        name,
        type,
        img,
        price,
        TypeImage,
      }];
  
      // Insert the cart data into the MongoDB collection
      const result = await cartCollection.insertMany(cart);
  
      if (result.insertedCount === 1) {
        return res.status(201).json({ message: 'Added to cart successfully' });
      } else {
        return res.status(500).json({ message: 'Cart data insertion failed' });
      }
    } catch (err) {
      console.error('MongoDB Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/add-to-favorites', async (req, res) => {
    const { userId, foodId, name, type, img, price, TypeImage } = req.body;
  
    try {
      // Define the favCollection
      const favCollection = client.db(dbName).collection('fav_data');
  
      // Create a new favorite object
      const favorite = [{
        userId,
        foodId,
        name,
        type,
        img,
        price,
        TypeImage,
      }];
  
      // Insert the favorite data into the MongoDB collection
      const result = await favCollection.insertMany(favorite);
  
      if (result.insertedCount === 1) {
        return res.status(201).json({ message: 'Added to favorites successfully' });
      } else {
        return res.status(500).json({ message: 'Favorite data insertion failed' });
      }
    } catch (err) {
      console.error('MongoDB Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.get('/user-favorites/:userId', async (req, res) => {
    const userId = (req.params.userId);
  
    try {
      // Define the favCollection
      const favCollection = client.db(dbName).collection('fav_data');
  
      // Find all favorites with the matching user ID
      
      const userFavorites = await favCollection.find({ userId }).toArray();
  
      res.json(userFavorites);
      
    } catch (err) {
      console.error('MongoDB Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  app.get('/user-cart/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Get a reference to the "cart_data" collection (assuming your collection name is "cart_data")
      const cartCollection = client.db(dbName).collection('cart_data');
  
      // Find all cart items with the matching user ID
      const userCartItems = await cartCollection.find({ userId }).toArray();
  
      res.json(userCartItems);
    } catch (err) {
      console.error('MongoDB Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // app.post('/place-order', async (req, res) => {
  //   const { userId, items } = req.body;
  
  //   try {
  //     // Get a reference to the "order_data" collection
  //     const orderCollection = client.db(dbName).collection('orders_data');
  
  //     let totalCost = 0;
  
  //     items.forEach((item) => {
  //       totalCost += item.price;
  //     });
  
  //     // Create a new order object
  //     const order = [{
  //       userId,
  //       items,
  //       totalCost,
  //     }];
  
  //     // Insert the new order data into the "order_data" collection
  //     const result = await orderCollection.insertMany(order);
  
  //     if (result.insertedCount === 1) {
  //       // Order was successfully inserted
  
  //       // Now, update the user's "no_of_orders" in the "user_data" collection
  //       const userCollection = client.db(dbName).collection('user_data');
  //       await userCollection.updateOne({ _id: new ObjectId(userId) }, { $inc: { no_of_orders: 1 } });
        
  
  //       return res.status(201).json({ message: 'Order placed successfully', orderId: result.insertedId });
  //     } else {
  //       return res.status(500).json({ message: 'Order placement failed - Insertion error' });
  //     }
  //   } catch (err) {
  //     console.error('MongoDB Error:', err);
  //     res.status(500).json({ message: 'Order placement failed - MongoDB insertion error' });
  //   }
  // });


  app.post('/place-order', async (req, res) => {
    const { userId, items } = req.body;
  
    try {
      // Get a reference to the "order_data" collection
      const orderCollection = client.db(dbName).collection('orders_data');
  
      let totalCost = 0;
  
      items.forEach((item) => {
        totalCost += item.price;
      });
  
      // Create a new order object
      const order = [{
        userId,
        items,
        totalCost,
      }];
  
      // Insert the new order data into the "order_data" collection
      const result = await orderCollection.insertMany(order);
  
      if (result.insertedCount === 1) {
        // Order was successfully inserted
  
        // Now, update the user's "no_of_orders" in the "user_data" collection
        const userCollection = client.db(dbName).collection('user_data');
        await userCollection.updateOne({ _id: new ObjectId(userId) }, { $inc: { no_of_orders: 1 } });
  
        // Delete all items from the user's cart in the "cart_data" collection
        const cartCollection = client.db(dbName).collection('cart_data');
        await cartCollection.deleteMany({ userId });
  
        return res.status(201).json({ message: 'Order placed successfully', orderId: result.insertedId });
      } else {
        return res.status(500).json({ message: 'Order placement failed - Insertion error' });
      }
    } catch (err) {
      console.error('MongoDB Error:', err);
      res.status(500).json({ message: 'Order placement failed - MongoDB insertion error' });
    }
  });



  app.get('/get-order-items/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Get a reference to the "orders_data" collection
      const orderCollection = client.db(dbName).collection('orders_data');
  
      // Find orders for the specified userId
      const orderItems = await orderCollection.find({ userId }).toArray();
  
      // Map each order item to include the full image URL
      const orderItemsWithImageUrls = orderItems.map((orderItem) => ({
        ...orderItem,
        items: orderItem.items.map((item) => ({
          ...item,
          img: `http://localhost:3001${item.img}`, // Update to your frontend server's URL
        })),
      }));
  
      // Return the order items with image URLs as JSON
      res.status(200).json(orderItemsWithImageUrls);
    } catch (err) {
      console.error('MongoDB Error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

//   app.get('/get-order-items', async (req, res) => {
//   try {
//     // Get a reference to the "orders_data" collection
//     const orderCollection = client.db(dbName).collection('orders_data');

//     // Find all orders in the collection
//     const orderItems = await orderCollection.find({}).toArray();

//     // Map each order item to include the full image URL
//     const orderItemsWithImageUrls = orderItems.map((orderItem) => ({
//       ...orderItem,
//       items: orderItem.items.map((item) => ({
//         ...item,
//         img: `http://localhost:3001${item.img}`, // Update to your frontend server's URL
//       })),
//     }));

//     // Return the order items with image URLs as JSON
//     res.status(200).json(orderItemsWithImageUrls);
//   } catch (err) {
//     console.error('MongoDB Error:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



app.post('/remove-from-favorites', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Get a reference to the "fav_data" collection
    const favCollection = client.db(dbName).collection('fav_data');

    // Convert the itemId to an ObjectId
    
   
    
    // Delete the favorite item with the specified user and item ID
    const result = await favCollection.deleteOne({_id: new ObjectId(itemId)});

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: 'Item removed from favorites successfully' });
    } else {
      return res.status(404).json({ message: 'Item not found in favorites' });
    }
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/remove-from-cart', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Get a reference to the "cart_data" collection
    const cartCollection = client.db(dbName).collection('cart_data');

    // Convert the itemId to an ObjectId
    

    // Delete the item from the user's cart based on user and item ID
    const result = await cartCollection.deleteOne({ _id: new ObjectId(itemId) });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: 'Item removed from cart successfully' });
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/user-profile/:userId', async (req, res) => {
  const userId = req.params.userId;
 

  try {
    // Check if userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Find the user's profile based on userId
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (user) {
      // If the user is found, send the user data as JSON response
      res.status(200).json(user);
    } else {
      // If the user is not found, send a 404 status code
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('MongoDB Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  
  
  
  

      

    // Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
  });
  

    // Rest of your code for favorites, carts, orders, etc.
    // ...

    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

startServer();
