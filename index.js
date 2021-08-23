let button = document.querySelector("#special-button");
let locationButton = document.querySelector("#locbutton");
let londonButton = document.querySelector("#london");
let nyButton = document.querySelector("#newyork");
let tokyoButton = document.querySelector("#tokyo");

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  console.log(response);
  let myCity = document.querySelector("#current-city");
  myCity.innerHTML = response.data.name;

  let temperature = document.querySelector("#weather-now");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`;

  let iconId = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );

  getForecast(response.data.coord);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showLondonWeather(event) {
  event.preventDefault();
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showNewYorkWeather(event) {
  event.preventDefault();
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=new york&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTokyoWeather(event) {
  event.preventDefault();
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
      <div class="next-days">
        <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="forecast-temps">
          <span class="temp-max">${Math.round(forecastDay.temp.max)}° </span>
          <span class="temp-min">${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>  
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiKey = "889ddb82ac517574ec1ec04289422270";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

button.addEventListener("click", handleSubmit);
locationButton.addEventListener("click", findLocation);
londonButton.addEventListener("click", showLondonWeather);
nyButton.addEventListener("click", showNewYorkWeather);
tokyoButton.addEventListener("click", showTokyoWeather);

let timeNow = document.querySelector("#timenow");
let now = new Date();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDays[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();

if (minute < 10) {
  timeNow.innerHTML = `${weekDay}, ${hour}:0${minute}`;
} else {
  timeNow.innerHTML = `${weekDay}, ${hour}:${minute}`;
}

searchCity("Prague");
