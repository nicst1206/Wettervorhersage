function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekday = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  string = `${weekday} ${hours}:${minutes}`;
  return string;
}

function updateWeatherData(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-app-icon" />`;
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "obbt00a19b0447e3fbfabf89040f3c88";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function initiateSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", initiateSearch);

function getForecast(city) {
  let apiKey = "obbt00a19b0447e3fbfabf89040f3c88";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">
      <img />
    </div>
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-maximum">18°</span>
      <span class="weather-forecast-temperature-minimum"> 12°</span>
    </div>
  </div>
  `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let forecastElement = document.querySelector("#forecast");
searchCity("Berlin");
getForecast("Berlin");
