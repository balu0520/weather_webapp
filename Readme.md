application link : https://calm-cendol-1ac898.netlify.app/
Note: This is an weather application, It will get the co-ordinates of your location and shows the weather, So you have allow the web browser to access your location. This application uses openWeatherMap API , if number of calls per day exceeds then the api will temporary blocked

#Creation of React Project
Initally,I created a basic react project using this command
npx create-react-app app

#Navigation and Working
For navigation between the screens, I had used react-router-dom.I had created four components
1. Header: In every Route, header is the main component that renders at the top, it helps us to navigate through the different routes. This is the common component that renders in every route 
2. UserLocation: This is the component which we will see initially at the start of our application, It will get the co-ordinates of your location(latitude and longitude) and using openweather map api we pass the co-ordinates to the API using string literals and we get the response, in which it had all the data about our current city and weather conditions. Getting co-ordinates and getting the weather data both are asynchronous calls, inorder to handle these calls I had make use of await which helps us not go to other asynchronous call until the first promise object is resolved nothing but the asynchronous call. Intially, the favorite locations are empty.We need to go to search location screen to add our favorite locations
3. WeatherLoaction: This component render when we click on the item present in favorite location list view. It shows the detailed weather conditions of the location you had clicked
4. SearchLocation: This component will render when we click on search locations button present in the header. This component contains a search bar initally, we can search the weather conditions by cityname or state or country. The search input we type in the search bar will be passed to the openweathermap API when we click on the search icon. If the city was present it shows the weather for the location, otherwise it tells us to try another city.

#Storing of Favorite Location
I didn't use any database in this application and there is no backend or backend connection. I used react context for storing of these favorite locations, we can get these favorite locations in any component if we use context.consumer component
Initially I had created an React Context and exported it, It contains favorite locations and two functions one is addFavoriteLocation for adding the favorite location and other is deleteFavoriteLocation for deleting the existing favorite location
We can access the react context everywhere, just use FavoriteLocation.Consumer component to access the favorite locations and FavoriteLocation.Provider component to pass the updated favorite locations to the consumer components. The Provider updates the value, the consumer component which is nested in the provider component will only re-render.

Note: React context will store the favorite locations untill we reload the page. If we reload the page, the favorite locations we added will be deleted in the react context which results the empty favorite locations on reload
