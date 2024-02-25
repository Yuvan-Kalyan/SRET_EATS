import React, { useEffect, useState } from 'react';
import './Order.css'; // Import your CSS file

const Order = ({userId}) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // Make a GET request to retrieve order items from the backend
    fetch(`http://localhost:3000/get-order-items/${userId}`) // Replace with your backend endpoint
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch order items');
        }
      })
      .then((data) => {
        // Set the retrieved order items in the state
        setOrderItems(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs once on component mount
  let oid = 1;

  return (
    <div className="order-container">
      <h2>Your Orders</h2>
      {orderItems.map((order) => (
        <div className="order" key={order._id}>
          <h3>Order {oid++}</h3>
          <div className="order-list">
            {order.items.map((item, index) => (
              <div className="order-item" key={index}>
                <img src={item.img} alt={item.name} className="item-image" />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  {/* Include other item details as needed */}
                </div>
              </div>
            ))}
          </div>
          <div className="total-cost">Total Cost: ₹{order.totalCost.toFixed(2)}</div>
        </div>
      ))}
      <button className="review-button">Review</button>
    </div>
  );
};

export default Order;
