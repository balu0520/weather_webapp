import {BrowserRouter,Route,Routes} from 'react-router-dom'
import UserLocation from './components/UserLocation'
import SearchLocation from './components/SearchLocation'
import WeatherLocation from './components/WeatherLocation'
import FavoriteContext from './context/FavoriteContext'
import './App.css';
import { Component } from 'react'

class App extends Component{
   state = {locations:[]}

  addFavoriteLocation = (city) => {
    this.setState(prevState => ({locations:[...prevState.locations,city]}))
  }

  deleteFavoriteLocation = (city) => {
    const {locations} = this.state
    const index = locations.findIndex((location) => location === city)
    console.log(index)
    locations.splice(index,1)
    this.setState(locations)
  }
  

  render(){
    const {locations} = this.state
  
  return (
      <BrowserRouter>
      <FavoriteContext.Provider value={{favoriteLocations:locations,
                  addFavoriteLocation:this.addFavoriteLocation,
                  deleteFavoriteLocation:this.deleteFavoriteLocation}}>
        <Routes>
          <Route exact path="/" Component={UserLocation}/>
          <Route exact path="/search-loc" Component={SearchLocation}/>
          <Route exact path="/loc/:item" Component={WeatherLocation} />
        </Routes>
        </FavoriteContext.Provider>
      </BrowserRouter>
  );
  }
}

export default App;
