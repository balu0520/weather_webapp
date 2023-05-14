import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
    <div className='header-container'>
        <h1 className='weather-application'>Weather App</h1>
        <div className='button-container'>
        <Link to="/" className='navigating-link'>
            <button className='search-loc-btn' type='button'>Home </button>
        </Link>
        <Link to="/search-loc" className='navigating-link'>
            <button className='search-loc-btn' type='button'>Search Locations</button>
        </Link>
        </div>
    </div>
)

export default Header