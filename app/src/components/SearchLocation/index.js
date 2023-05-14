import { Component } from "react";
import FavoriteContext from "../../context/FavoriteContext";
import Header from "../Header";
import './index.css'
import Axios from "axios";

import {BiSearch} from 'react-icons/bi'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
 
const apiStatusConstants = {
    initial:'INITIAL',
    success:'SUCCESS',
    failure:'FAILURE',
    inProgress:'IN_PROGRESS'
}

class SearchLocation extends Component{
    state = {apiStatus:apiStatusConstants.initial,searchInput:'',city:'',weather:'',temp:'',humidity:'',wind:''}

    onChangeInput = event => {
        this.setState({searchInput:event.target.value})
    }

    onClickSearch = () => {
        this.setState({apiStatus:apiStatusConstants.inProgress})
        const {searchInput} = this.state
        const api_key = `bc3b3409fc36f41c598557ec859384ef`
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${api_key}&units=metric`
        Axios.get(url)
        .then((response) => {
            if(response.status === 200){
                console.log(response)
                this.setState({city:response.data.name,weather:response.data.weather[0].main,temp:response.data.main.temp,humidity:response.data.main.humidity,wind:response.data.wind.speed,apiStatus:apiStatusConstants.success,searchInput:''})     
            }
        }).catch((err) => {
            this.setState({apiStatus:apiStatusConstants.failure})
        })
    }

    renderLoadingView = () => {
        return(
        <div className="spinner-container">
            <div className="loading-spinner">
            </div>
        </div>
        )
    }

    renderSuccessView = () => (
        <FavoriteContext.Consumer>
            {value => {
                const {favoriteLocations,addFavoriteLocation,deleteFavoriteLocation} = value
                const{city,weather,temp,humidity,wind} = this.state 
                console.log(city)

                const onClickFav = () => {
                    if(favoriteLocations.includes(city)){
                        deleteFavoriteLocation(city)
                    }else{
                        addFavoriteLocation(city)
                    }
                }

                const checkLocation = (city) => {
                    if(favoriteLocations.includes(city)){
                        return true
                    }else{
                        return false
                    }
                }
                return(
                    <div className="winfo">
                        <h1 className="label">Temperature:{temp}°C</h1>
                        <h1 className="label">Weather condition: {weather}</h1>
                        <h2 className="label">City: {city}</h2>
                        <div className="details">
                            <h1 className="label">Humidity: {humidity}%</h1>
                            <h1 className="label">Wind: {wind} km/h</h1>
                        </div>
                        <div>
                            {checkLocation(city) && (<button type="button" className="fav-button" onClick={onClickFav}>
                                <AiFillStar className="fav-icon"/>
                            </button>)}
                            {!checkLocation(city) && (<button type="button" className="fav-button" onClick={onClickFav}>
                                <AiOutlineStar className="not-fav-icon"/>
                            </button>)}
                        </div>
                        {checkLocation(city) && (<h1>Favorite Location</h1>)}
                        {!checkLocation(city) && (<h1>Not a Favorite Location</h1>)}
                    </div>
                )
            }}
        </FavoriteContext.Consumer>
        )
        


    renderResults = () => {
        const {apiStatus} = this.state
        switch(apiStatus) {
            case apiStatusConstants.initial:
                return <h1>Search for a Location to see the weather</h1>
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            case apiStatusConstants.success:
                return this.renderSuccessView()
            case apiStatusConstants.failure:
                return <h1>City not found, try another city!</h1>
            default:
                return null
        }
    }

    render(){
        const {searchInput} = this.state
        return(
            <div className="search-container">
                <Header />
                <div className="container">
                    <div className="weather">
                        <div className="search">
                            <input type="search" placeholder="Enter City name" value={searchInput} onChange={this.onChangeInput}/>
                            <button onClick={this.onClickSearch} className="search-btn"><BiSearch  className="icon"/></button>
                        </div>

                        {this.renderResults()}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchLocation