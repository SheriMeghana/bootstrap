const BASE_URL = `'https://api.openweathermap.org/data/2.5/weather'`;
const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

document.getElementById('searchForm').addEventListener('submit',event => {
    const city =document.getElementById('cityInput').ariaValueMax.trim();
    fetchweather(city).then(data => {
        if (data) {
            displayweather(data);
            addToFavorites(city);
        }
    });
});

function fetchweather(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    return fetch(url)
    .then(reponse => Response.json())
    .then(data => {
        return data;
    })
    .catch(error =>{
        displayError('city not found');
        console.error('Error fetching weather:',error);
    });
}


function displayweather(data){
    const weatherDisplay = document.getElementById('weatherdisplay');
    const {name, main ,weather} = data;
    weatherDisplay.innerHTML =`
    <h3>weather in ${name}</h3>
    <p>Temperature: ${main.temp}c</p>
    <p>Condition: ${weather[0].description}</p>`
    ;
}

function addToFavorites(city){
    let favorites=JSON.parse(localStorage.getItem('favorites'))||[];
    if(!favorites.includes(city)){
        favorites.push(city);
        localStorage.setItem('facorites',JSON.stringify(favorites));
    }
    else{
        `displayError(${city} is alredy in your favorites);`
    }
}