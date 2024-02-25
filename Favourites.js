import React, { useEffect, useState } from 'react';


const Favourites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);

  // Fetch user's favorite items from the backend when the component mounts
  useEffect(() => {
    // Make a GET request to retrieve user's favorite items
    fetch(`http://localhost:3000/user-favorites/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch favorite items');
        }
      })
      .then((data) => {
        // Set the retrieved favorite items in the state
        setFavorites(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [userId]);

  const removeFromFavorites = (itemId) => {
    console.log(itemId)
    // Make a POST request to remove the item from favorites
    fetch('http://localhost:3000/remove-from-favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, itemId }), // Pass itemId directly
    })
      .then((response) => {
        if (response.ok) {
          // Remove the item from the local state (favorites) on success
          const updatedFavorites = favorites.filter((item) => item._id !== itemId);
          setFavorites(updatedFavorites);
        } else {
          throw new Error('Failed to remove item from favorites');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  
  const addToCart = async (snack) => {
    try {
      const response = await fetch('http://localhost:3000/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, // Replace with the actual user ID
          foodId: snack.id,
          name: snack.name,
          type: snack.type,
          img: snack.img,
          price: snack.price,
          TypeImage: snack.TypeImage,
        }),
      });
  
      if (response.ok) {
        console.log('Added to cart successfully');
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  return (
    <div className="snacks-container">
      {favorites.map((favorite) => (
        <div key={favorite._id} className="snack-card">
          <img src={favorite.img} alt={`Snack ${favorite.id}`} className="snack-image" />
          <img
            src={favorite.TypeImage}
            alt={`Type ${favorite.type}`}
            className={`snack-type-image ${favorite.type}`}
          />
          <h2 className="snack-name">{favorite.name}</h2>
          <div className="snack-details">
            <div className="snack-price"><h2 className="PriceName">${favorite.price.toFixed(2)}</h2></div>
            <div className={`snack-type ${favorite.type}`}>{favorite.type.toUpperCase()}</div>
          </div>
          <div className="cart-button-container">
            <button className="cart-button" onClick={()=> addToCart(favorite)}>
              Add to Cart
            </button>
          </div>
          <div className="cart-button-container">
            <button className="remove1" onClick={()=> removeFromFavorites(favorite._id)}>Remove from Favorites</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favourites;
