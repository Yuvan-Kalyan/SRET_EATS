import React, { useEffect, useState } from 'react';
import './Cart.css'; // Import your CSS file
import itemImage1 from './Samosas.jpeg'; // Import item images
import removeIcon from './removeI.png'; // Import remove icon image

const Cart = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    // Make a GET request to retrieve user's cart items
    fetch(`http://localhost:3000/user-cart/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch cart items');
        }
      })
      .then((data) => {
        console.log('Cart data:', data); // Log the data received from the server
        
    
        setCartItems(data); // Access the 'items' property
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userId]);

  console.log('Cart items:', cartItems); // Log the cartItems state

  // Calculate total cost
  // const totalCost = cartItems.reduce((total, item) => {
  //   return total + item.price * item.quantity;
  // }, 0);

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    // Implement your logic to remove the item from the cart
    console.log(`Item with ID ${itemId} removed from the cart.`);
  };
  let t = 0;

  cartItems.forEach((i)=>{
    t  = t + i.price
 })

 const placeOrder = () => {
  // Create an order object with required data
  const order = {
    userId,
    items: cartItems,
    
  };

  // Make a POST request to store the order on the server
  fetch('http://localhost:3000/place-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to place the order');
      }
    })
    .then((data) => {
      console.log('Order placed successfully:', data);
      // Optionally, you can clear the cart or perform other actions here
    })
    .catch((error) => {
      console.error('Error placing the order:', error);
    });
};
const removeFromCart = (itemId) => {
  // Make a POST request to remove the item from the cart
  fetch('http://localhost:3000/remove-from-cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, itemId }), // Pass itemId directly
  })
    .then((response) => {
      if (response.ok) {
        // Remove the item from the local state (cartItems) on success
        const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
        setCartItems(updatedCartItems);
      } else {
        throw new Error('Failed to remove item from cart');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};


  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.img} alt={item.name} className="item-image" /> {/* Corrected */}
              <span className="item-name">{item.name}</span>
              <span className="item-price">₹{item.price.toFixed(2)}</span>
              
              <img
                src={removeIcon}
                alt={`Remove ${item.name}`}
                className="remove-icon"
                onClick={() => removeFromCart(item._id)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <h2>Summary</h2>
        <div className="total">Total: ${t}</div>
        <button className="checkout-button" onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
};


export default Cart;
