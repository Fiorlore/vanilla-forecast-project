let button = document.querySelector("#special-button");
let locationButton = document.querySelector("#locbutton");
let londonButton = document.querySelector("#london");
let nyButton = document.querySelector("#newyork");
let tokyoButton = document.querySelector("#tokyo");
let celsiusButton = document.querySelector("#celsius");
let fahrenheitButton = document.querySelector("#fahrenheit");

let celsiusTmeperature = null;

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
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;

  let celsiusTemp = document.querySelector("#celsius");
  celsiusTemp.innerHTML = `°C`;

  let breakElement = document.querySelector("#break");
  breakElement.innerHTML = ` | `;

  let fahrenheitTemp = document.querySelector("#fahrenheit");
  fahrenheitTemp.innerHTML = `°F`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `🚩wind: ${Math.round(response.data.wind.speed)} km/h`;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `💧humidity: ${response.data.main.humidity}%`;

  let iconId = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;
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

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#weather-now");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitButton.classList.add("active");
  celsiusButton.classList.remove("active");
  celsiusButton.classList.add("non-active");
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#weather-now");
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
      <div class="next-days">
        <div class="forecast-day">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="forecast-temps">
          <span class="temp-max"> 18° </span>
          <span class="temp-min"> 12° </span>
        </div>
      </div>  
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


button.addEventListener("click", handleSubmit);
locationButton.addEventListener("click", findLocation);
londonButton.addEventListener("click", showLondonWeather);
nyButton.addEventListener("click", showNewYorkWeather);
tokyoButton.addEventListener("click", showTokyoWeather);
fahrenheitButton.addEventListener("click", showFahrenheit);
celsiusButton.addEventListener("click", showCelsius);

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
displayForecast();

