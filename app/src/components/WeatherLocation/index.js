import {useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import './index.css'
import Header from "../Header";
import  Axios from "axios";

const apiStatusConstants = {
    'initial':'INITIAL',
    'success':'SUCCESS',
    'failure':'FAILURE',
    'inProgress':'IN_PROGRESS'
}

const WeatherLocation = (props) => {
    const {item} = useParams()
    console.log(item)
    const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)
    const [city,setCity] = useState('')
    const [weather,setWeather] = useState('')
    const [temp,setTemp] = useState('')
    const [humidity,setHumidity] = useState('')
    const [wind,setWind] = useState('')


    useEffect(() => {
        setApiStatus(apiStatusConstants.inProgress)
        const id = item
        const cityname = id
        const api_key = `bc3b3409fc36f41c598557ec859384ef`
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${api_key}`
        Axios.get(url)
        .then((response) => {
            if (response.status === 200 ){
                setApiStatus(apiStatusConstants.success)
                setCity(response.data.name)
                setWeather(response.data.weather[0].main)
                setTemp(response.data.main.temp)
                setHumidity(response.data.main.humidity)
                setWind(response.data.wind.speed)
            }else{
                setApiStatus(apiStatusConstants.failure)
            }
        })
        .catch(()=>{
            setApiStatus(apiStatusConstants.failure)
        })
    }, [])


    const renderLoadingView = () => {
        return(
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
        </div>
        )
    }

    const renderFailureView = () => {
        return (
            <div className="failure-container">
                <h1 className="failure-heading">
                    Something went wrong
                </h1>
            </div>
        )
    }

    const renderSuccessView = () => {
        return (
            <div className="favorite-city-container">
                <h1 className="favorite-city">Location: {city}</h1>
                <h1 className="favorite-weather">Weather condition: {weather}</h1>
                <h1 className="favorite-temperature">Temperature: {temp}°C</h1>
                <div className="favorite-container-1">
                    <h1 className="favorite-humidity">Humidity: {humidity}%</h1>
                    <h1 className="favorite-wind">Wind: {wind} km/h</h1>    
                </div>
            </div>
        )
    }

    const renderWeatherLocation = () => {
        switch(apiStatus){
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.inProgress:
                return renderLoadingView()
            case apiStatusConstants.failure:
                return renderFailureView()
            default:
                return null
        }
    }

        return(
            <div className="bg-container">
                <Header/>
                <div className="favorite-container">
                    {renderWeatherLocation()}
                </div>
            </div>
        )
}

export default WeatherLocation