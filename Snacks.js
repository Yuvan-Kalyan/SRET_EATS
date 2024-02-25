import React from 'react';
import './Snacks.css'; // Import your CSS file
import samosas from './Samosas.jpeg';
import vegIcon from './vegIcon.png';
import nonVegIcon from './NonVeg.png';
import puff from './puff.jpeg';
import PannerPuff from './PannerPuff.jpg';
import ChickenPuff from './ChickenPuff.jpg';
import omellete from './omellete.jpeg';
import BreadOmellete from './BreadOmellete.jpeg';
import GoneMad from './gonemad.jpg';
import PuffCorn from './PuffCorn.jpg';
import RedBull from '../FoodImages/redbull.jpg';
import TooYumO from '../FoodImages/tooyumorange.jpeg';
import TooYumK from '../FoodImages/TooYumK.webp';
import Smoodh from '../FoodImages/smoodh.jpg';
import Fuse from '../FoodImages/fuse.jpeg';
import DairyOreo from '../FoodImages/DairyOreo.jpg';
import CheesePopcorn from '../FoodImages/CheesePopcorn.jpg'
import cakef from '../FoodImages/cakef.jpg';


const snacks = [
  {
    id: 1,
    name: 'Samosa',
    type: 'veg',
    img: samosas,
    price: 20,
    TypeImage: vegIcon,
  },
  {
    id: 2,
    name: 'veg Puff',
    type: 'veg',
    img: puff,
    price: 25,
    TypeImage: vegIcon,
  },
  {
    id: 3,
    name: 'Panner Roll',
    type: 'veg',
    img: PannerPuff,
    price: 45,
    TypeImage: vegIcon,
  },
  {
    id: 4,
    name: 'Chicken Puff',
    type: 'non-veg',
    img: ChickenPuff,
    price: 45,
    TypeImage: nonVegIcon,
  },
  {
    id: 5,
    name: 'Omellete',
    type: 'non-veg',
    img: omellete,
    price: 20,
    TypeImage: nonVegIcon,
  },
  {
    id: 6,
    name: 'Bread Omellete',
    type: 'non-veg',
    img: BreadOmellete,
    price: 40,
    TypeImage: nonVegIcon,
  },
  {
    id: 7,
    name: 'Choco rolls',
    type: 'veg',
    img: GoneMad,
    price: 20,
    TypeImage: vegIcon,
  },
  {
    id: 8,
    name: 'PuffCorn',
    type: 'veg',
    img: PuffCorn,
    price: 20,
    TypeImage: vegIcon,
  },
  {
    id: 9,
    name: 'Red Bull',
    type: 'veg',
    img: RedBull,
    price: 120,
    TypeImage: vegIcon,
  },
  {
    id: 10,
    name: 'TooYum Orange',
    type: 'veg',
    img: TooYumO,
    price: 20,
    TypeImage: vegIcon,
  },
  {
    id: 11,
    name: 'TooYum Kurkure',
    type: 'veg',
    img: TooYumK,
    price: 20,
    TypeImage: vegIcon,
  },
  {
    id: 12,
    name: 'Smoodh',
    type: 'veg',
    img: Smoodh,
    price: 20,
    TypeImage: vegIcon,
  },
  {
    id: 13,
    name: 'Fuse',
    type: 'veg',
    img: Fuse,
    price: 20,
    TypeImage: vegIcon,
  },
  {
    id: 14,
    name: 'Dairy Milk Oreo',
    type: 'non-veg',
    img: DairyOreo,
    price: 75,
    TypeImage: vegIcon,
  },
  {
    id: 15,
    name: 'Cheese Popcorn',
    type: 'veg',
    img: CheesePopcorn,
    price: 35,
    TypeImage: vegIcon,
  },
  {
    id: 16,
    name: 'Yummy CHoco Cake',
    type: 'non-veg',
    img: cakef,
    price: 10,
    TypeImage: nonVegIcon,
  },
  // Add more snack objects as needed
];





const Snacks = ({userId}) => {

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

  const addToFavorites = async (snack) => {
    try {
      const response = await fetch('http://localhost:3000/add-to-favorites', {
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
        console.log('Added to favorites successfully');
      } else {
        console.error('Failed to add to favorites');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  
  return (
    <div className="snacks-container">
      {snacks.map((snack) => (
        <div key={snack.id} className="snack-card">
          <img src={snack.img} alt={`Snack ${snack.id}`} className="snack-image" />
          <img
            src={snack.TypeImage}
            alt={`Type ${snack.type}`}
            className={`snack-type-image ${snack.type}`}
          />
          <h2 className="snack-name">{snack.name}</h2>
          <div className="snack-details">
            <div className="snack-price"><h2 className="PriceName">₹{snack.price.toFixed(2)}</h2></div>
            <div className={`snack-type ${snack.type}`}>{snack.type.toUpperCase()}</div>
           
            
          </div>
          <div className="fav-button-container">
        <button className="fav-button" onClick={()=> addToFavorites(snack)} >
          Add to Favourites
        </button>
      </div>

      <div className="cart-button-container">
        <button className="cart-button" onClick={()=> addToCart(snack)}>
          Add to Cart
        </button>
      </div>
        
          
        </div>
      ))}
    </div>
  );
};

export default Snacks;
