function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let currentConditions = response.data.condition.description;
  let conditionsElement = document.querySelector("#current-conditions");
  let currentHumidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#current-humidity");
  let currentWind = response.data.wind.speed;
  let windElement = document.querySelector("#current-wind");
  let unit = "metric";
  let windSpeedUnit = document.querySelector("#wind-unit");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  conditionsElement.innerHTML = `${currentConditions}`;
  humidityElement.innerHTML = `${currentHumidity}%`;
  windElement.innerHTML = `${currentWind}`;

  if (unit === "metric") {
    windSpeedUnit.innerHTML = `km/h`;
  } else {
    windSpeedUnit.innerHTML = `mph`;
  }
  console.log(`response`);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "a2t477eebb3f98daaa0d6cf85ob51907";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
