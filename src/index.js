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
  }
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
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
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}


/*let loadedCity = document.querySelector("h2.card-title");
  // Add class special to the h2 with class card-title
  loadedCity.classList.add("special");
  loadedCity.innerHTML = navigator.geolocation.value;*/

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
  /*getForecast(response.data.coord);*/

  /* let place = response.data.name;*/
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCityTemperature);
}

let geoButton = document.querySelector("#showGeo");
geoButton.addEventListener("click", showGeoCity);

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

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
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
    `Satarday`
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
    `December`
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


function displayForecast() {
let forecastElement = document.querySelector("#forecast");
let days = ["Thu", "Fri", "Sat", "Sun", "Mon","Tues"];

let forecastHTML = `<div class="row">`;
days.forEach(function (day) {
forecastHTML = forecastHTML +
`
  <div class="col-2">
      <img src="img/cloud.png" class="card-img-top" alt="..." style="width: 50px" />
      <div class="card-body">
      ${day}
        </div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
<div>
         <ul>
              <li class="card-text_forecast">Humidity: <span id="humidity_forecast"></span>%</li>
              <li class="ccard-text_forecast">Wind: <span id="wind_forecast"></span> km/h</li>
              <li class="card-text_forecast">
                Pressure: <span id="pressure_forecast"></span> PA
              </li>
            </ul>
</div>
        </div>
      </div>
     
     `;
    });


    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

displayForecast();






