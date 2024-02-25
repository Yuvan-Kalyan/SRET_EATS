import './App.css';
import React, { Component } from 'react';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import SecondNavBar from './Components/SecondNavBar/SecondNavBar';
import SnacksBanner from './Components/SnacksBanner/SnacksBanner';
import Snacks from './Components/Snacks/Snacks';
import AboutBanner from './Components/AboutBanner/AboutBanner';
import FavouriteBanner from './Components/FavouriteBanner/FavouriteBanner';
import Favourites from './Components/Favourites/Favourites';
import Cart from './Components/Cart/Cart';
import Order from './Components/Order/Order';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import Profile from './Components/Profile/Profile';
import Map from './Components/Map/Map';
import CartBanner from './Components/CartBanner/CartBanner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MenuRoute: 'snacks',
      MainRoute: 'signin',
      userId: props.userId || 0, // Initialize userId as null
    };
  }

  onMenuRouteChange = (route) => {
    this.setState({ MenuRoute: route });
  };



  onMainRouteChange = (route, userId) => {
    this.setState({ MainRoute: route, userId: userId });
  };
  

  render() {
    const { MenuRoute, MainRoute, userId } = this.state;

    let mainContent = null;
    if (MainRoute === 'menu') {
      mainContent = (
        <div>
          <NavigationBar
            onMainRouteChange={this.onMainRouteChange}
            userId={userId} // Pass userId as a prop
          />
          <SecondNavBar onMenuRouteChange={this.onMenuRouteChange} userId={userId} />
          <div>
                <SnacksBanner />
                <Snacks userId={userId}/>  
                <AboutBanner />
              </div>
          
        </div>
      );
      console.log("UserId in App:", userId);

    } else if (MainRoute === 'fav') {
      mainContent = (
        <div>
          <NavigationBar
            onMainRouteChange={this.onMainRouteChange}
            userId={userId} // Pass userId as a prop
          />
          <FavouriteBanner />
          <Favourites userId={userId} /> {/* Pass userId as a prop */}
          <AboutBanner />
        </div>
        
      );
      console.log(userId)
    } else if (MainRoute === 'cart') {
      mainContent = (
        <div>
          <NavigationBar
            onMainRouteChange={this.onMainRouteChange}
            userId={userId} // Pass userId as a prop
          />
          <CartBanner />
          <Cart userId={userId} /> {/* Pass userId as a prop */}
          <AboutBanner />
        </div>
      );
    } else if (MainRoute === 'orders') {
      mainContent = (
        <div>
          <NavigationBar
            onMainRouteChange={this.onMainRouteChange}
            userId={userId} // Pass userId as a prop
          />
          <Order userId={userId} /> {/* Pass userId as a prop */}
          <AboutBanner />
        </div>
      );
    } else if (MainRoute === 'profile') {
      mainContent = (
        <div>
          <NavigationBar
            onMainRouteChange={this.onMainRouteChange}
            userId={userId} // Pass userId as a prop
          />
          <Profile onMainRouteChange = {this.onMainRouteChange} userId={userId}/>
          <Map />
          <AboutBanner />
          
        </div>
      );
    } else if (MainRoute === 'register') {
      mainContent = (
        <div>
          <Register
            onMainRouteChange={this.onMainRouteChange}
            userId={userId} // Pass userId as a prop
          />
        </div>
      );
    } else if (MainRoute === 'signin') {
      mainContent = (
        <div>
          <SignIn
            onMainRouteChange={this.onMainRouteChange}
            userId={userId} // Pass userId as a prop
          />
        </div>
      );
    }
    console.log("UserId in App last:", userId);

    return <div className='app'>{mainContent}</div>;
  }
}


export default App;


















// import './App.css';
// import React,{Component} from 'react';
// import NavigationBar from './Components/NavigationBar/NavigationBar';
// import SecondNavBar from './Components/SecondNavBar/SecondNavBar';
// import SnacksBanner from './Components/SnacksBanner/SnacksBanner';
// import Snacks from './Components/Snacks/Snacks';
// import AboutBanner from './Components/AboutBanner/AboutBanner';
// import ChipsBanner from './Components/ChipsBanner/ChipsBanner';
// import Chips from './Components/Chips/Chips';
// import Desserts from './Components/Desserts/Desserts';
// import Beverages from './Components/Beverages/Beverages';
// import Food from './Components/Food/Food';
// import Trending  from './Components/Trending/Trending';
// import FavouriteBanner from './Components/FavouriteBanner/FavouriteBanner';
// import Favourites from './Components/Favourites/Favourites';
// import Cart from './Components/Cart/Cart';
// import Order from './Components/Order/Order';
// import Register  from './Components/Register/Register';
// import SignIn  from './Components/SignIn/SignIn';


// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       MenuRoute : 'snacks',
//       MainRoute : 'signin'
//     }
//   }

//   onMenuRouteChange = (route)=>{
//     this.setState({MenuRoute : route})
//   }

//   onMainRouteChange = (route)=>{
//     this.setState({MainRoute : route})
//   }



//   render(){

//     const {MenuRoute,MainRoute} = this.state;




//     let mainContent = null;
//     if(MainRoute==='menu'){
//       mainContent = (
//         <div>
//           <NavigationBar onMainRouteChange={this.onMainRouteChange} />
//           <SecondNavBar onMenuRouteChange={this.onMenuRouteChange}/>
//           {
//             MenuRoute ==='snacks'? (
//               <div>
//                 <SnacksBanner />
//                 <Snacks />  
//                 <AboutBanner />
//               </div>
//             ) : MenuRoute === 'chips'? (
//               <div>
//                 <ChipsBanner />
//                 <Chips />
//                 <AboutBanner />
//                 <h1>chips</h1>
//               </div>
//             ): MenuRoute === 'desserts'?(
//               <div>
//                 <Desserts />
//                 <AboutBanner />
//                 <h1>desserts</h1>
//               </div>
//             ): MenuRoute === 'beverages'?(
//               <div>
//                 <Beverages />
//                 <h1>Beverages</h1>
//                 <AboutBanner />
//                 </div>
//             ): MenuRoute === 'food'?(
//               <div>
//                 <Food />
//                 <h1>food</h1>
//                 <AboutBanner />
//                 </div>
//             ): MenuRoute === 'trending'?(
//               <div>
//                 <Trending />
//                 <h1>Trending</h1>
//                 <AboutBanner />
//                 </div>
//             ):<h1>Other</h1>
//           }
  
  
         
  
//         </div>
//       )
    

//     }
//     else if(MainRoute === 'fav'){
//       mainContent = (
//         <div>
//           <NavigationBar onMainRouteChange={this.onMainRouteChange} />
//           <FavouriteBanner />
//           <Favourites />
//           <AboutBanner />
//           </div>
//       )
//     }else if(MainRoute ==='cart'){

//       mainContent = (
//         <div>
//           <NavigationBar onMainRouteChange={this.onMainRouteChange} />
//           <FavouriteBanner />
//           <Cart />
//           <AboutBanner />
//         </div>
//       )
//     }else if(MainRoute === 'orders'){
//       mainContent = (
//         <div>
//           <NavigationBar onMainRouteChange={this.onMainRouteChange} />
//           <Order />
//           <AboutBanner />
//         </div>
//       )
//     }else if (MainRoute === 'profile'){
//       mainContent = (
//         <div>
//           <NavigationBar onMainRouteChange={this.onMainRouteChange} />
//           <h1>profile</h1>
//           <button onClick={()=> this.onMainRouteChange('signin')}>Sign out </button>
//           </div>
//       )
//     }else if(MainRoute === 'register'){
//      mainContent = (
//       <div>
//         <Register onMainRouteChange={this.onMainRouteChange}    />
//       </div>
//      )
//     }else if(MainRoute==='signin'){
//       mainContent = (
//         <div>
//           <SignIn onMainRouteChange={this.onMainRouteChange}/>
//         </div>
//       )
//     }
   
    
//     return <div className='app'>{mainContent}</div>
//   }

// }





// export default App;



