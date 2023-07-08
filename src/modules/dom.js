const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cityName = document.getElementById("city-name");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const currentTemperature = document.getElementById("current-temperature");
const feelsLikeTemperature = document.getElementById("feels-like");
const locationHumidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const bodyBackground = document.querySelector("body");
const temperatureMeasurement = document.getElementById(
  "temperature-measurement"
);
const celsius = document.getElementById("celsius-symbol");
const fahrenheit = document.getElementById("fahrenheit-symbol");

export {
  searchInput,
  searchButton,
  cityName,
  weatherDescription,
  weatherIcon,
  currentTemperature,
  feelsLikeTemperature,
  locationHumidity,
  windSpeed,
  bodyBackground,
  temperatureMeasurement,
  celsius,
  fahrenheit,
};
