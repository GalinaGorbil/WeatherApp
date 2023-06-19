//City
function showCity(event) {
  event.preventDefault();
  //Log h2 з card-title
  let loadedCity = document.querySelector("h2.card-title");
  // Add class special to the h2 with class card-title
  loadedCity.classList.add("special");
  // In the code replace the content of the element with id card-title
  // by the entered city
  // отримуємо значення
  //let val = event.target.value;
  //встановлюємо значення input
  let formaControl = document.querySelector("#form-control");
  loadedCity.innerHTML = formaControl.value;
  //temperature changing
function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
        <img src=https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png class="card-img-top" alt="..." style="width: 50px" />
        <div class="card-body">
        ${formatDay(forecastDay.dt)}
          </div>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)} </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)} </span>
  
          </div>
        </div>
       
       `;}
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
  }

  function getDaylyForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function showTemperature(response) {
    celsiusTemperature = response.data.main.temp;
    formaControl.value = response.data.name;
    let changeTemp = document.querySelector("#temperature");
    changeTemp.innerHTML = Math.round(celsiusTemperature);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let pressureElement = document.querySelector("#pressure");
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
    pressureElement.innerHTML = Math.round(response.data.main.pressure);

    getDaylyForecast(response.data.coord);
  }

  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formaControl.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
//Звертаємося до форми вводу і встановлюємо подію на підтвердження форми
let forma = document.querySelector("#search-form");
forma.addEventListener("submit", showCity);

//Geolocation button
function showGeoCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
//Log h2 з card-title
function loadedCity(city) {
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

/*let loadedCity = document.querySelector("h2.card-title");
  // Add class special to the h2 with class card-title
  loadedCity.classList.add("special");
  loadedCity.innerHTML = navigator.geolocation.value;*/

  function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
        <img 
        src=https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png  class="card-img-top" alt="..." style="width: 50px" />
        <div class="card-body"> ${formatDay(forecastDay.dt)}
        
          </div>
          
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)} </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)} </span>
  
          </div>
        </div>
       
       `;
      }
    });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getDaylyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  /*let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);*/
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let changeGeotemperature = document.querySelector("#temperature");
  changeGeotemperature.innerHTML = Math.round(celsiusTemperature);
  let town = document.querySelector("#city");
  town.innerHTML = response.data.name;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#pressure");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  pressureElement.innerHTML = Math.round(response.data.main.pressure);

  
  getDaylyForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemperature);
}

let geoButton = document.querySelector("#showGeo");
geoButton.addEventListener("click", showGeoCity);

/*
//C/F

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
/*let celsiusTemperature = response.data.main.temp;*/
let celsiusTemperature = null;

/*let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);*/

loadedCity("Paris");

//Date

let now = new Date();

function formatDate(date) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuersday`,
    `Wendsday`,
    `Thursday`,
    `Friday`,
    `Satarday`,
  ];
  let currentday = days[date.getDay()];

  let currentyear = date.getFullYear();

  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  let currentmonth = months[date.getMonth()];

  let currentdate = date.getDate();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentday}, ${currentmonth} ${currentdate}, ${currentyear} 
  ${hours}:${minutes}`;
}

let formattedDate = document.querySelector("#date");
formattedDate.innerHTML = formatDate(now);


