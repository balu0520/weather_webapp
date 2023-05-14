import React from 'react'

const FavoriteContext = React.createContext({
    favoriteLocations:[],
    addFavoriteLocation:() => {},
    deleteFavoriteLocation:() => {}
})

export default FavoriteContext