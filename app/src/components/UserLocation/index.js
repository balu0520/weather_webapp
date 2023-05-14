import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Axios from "axios"
import Header from '../Header'
import "./index.css"
import FavoriteContext from "../../context/FavoriteContext";

// import "../../assets/images"
const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS",
  };
  

const UserLocation = () => {
    const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial) 
    const [cityname,setCityName] = useState('')
    const [weather,setWeather] = useState('')
    const [temp,setTemp] = useState('')
    const [humidity,setHumidity] = useState('')
    const [wind,setWind] = useState('')
    

    useEffect(() => {
        setApiStatus(apiStatusConstants.inProgress)

        const getWeatherData = (latitude, longitude) => {
            const api_key = `bc3b3409fc36f41c598557ec859384ef`
            const location_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`;
            return Axios.get(location_url);
          };

        const getUserLocation = () => {
            return new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  resolve({ latitude, longitude });
                },
                (error) => reject(error)
              );
            });
          };

        const fetchData = async () => {
            try {
              const {latitude,longitude} = await getUserLocation();
              const weatherData = await getWeatherData(latitude, longitude);
              if (weatherData.status === 200 ){
                setApiStatus(apiStatusConstants.success)
                setCityName(weatherData.data.name)
                setWeather(weatherData.data.weather[0].main)
                setTemp(weatherData.data.main.temp)
                setHumidity(weatherData.data.main.humidity)
                setWind(weatherData.data.wind.speed)
            }else{
                setApiStatus(apiStatusConstants.failure)
            }
            } catch (error) {
              console.log(error)
              setApiStatus(apiStatusConstants.failure)
            }
          };
        
          fetchData();
    },[])

    

    const renderLoadingView = () => (
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
        </div>
      );

    
    const renderSuccessView = () => 
         (
            <div className="current-city-container">
                <h1 className="current-city">Your current location: {cityname}</h1>
                <h1 className="current-weather">Weather condition: {weather}</h1>
                <h1 className="current-temperature">Temperature: {temp}°C</h1>
                <div className="current-container">
                    <h1 className="current-humidity">Humidity: {humidity}%</h1>
                    <h1 className="current-wind">Wind: {wind} km/h</h1>    
                </div>
            </div>
        )
    

    const renderFailureView = () => {
        return (
            <div className="failure-container">
                <h1 className="failure-heading">
                    This application uses location , so please allow the browser to access the location and reload the page. After reloading same issue occurs, Try after some time
                </h1>
            </div>
        )
    }
    const renderLocation = () => {
        switch (apiStatus){
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.failure:
                return renderFailureView()
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            default:
                return null            
        }
    }

    const renderFavoriteLocations = () => (
        <FavoriteContext.Consumer>
            {value => {
                const {favoriteLocations} = value
                console.log(favoriteLocations)
                if (favoriteLocations.length === 0){
                    return <h1 className="favorite-heading">No Favarite Locations added, Go to Search Location and add your favorites</h1>
                }
                return (
                    <ul className="favorite-locations-list">
                        {favoriteLocations.map(item => (
                            <li key={item} className="favorite-item"><Link to={`/loc/${item}`} className="navigator-link">{item}</Link></li>
                        ))}
                    </ul>
                )
            }}
        </FavoriteContext.Consumer>
    )

        return(
            <div className="bg-container">
                <Header />
                <div className="location-container">
                    {renderLocation()}
                </div>
                <h1 className="favorite-heading">Favorite Locations: </h1>
                {renderFavoriteLocations()}
            </div>
        )
    }

export default UserLocation

