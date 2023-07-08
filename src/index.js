import _ from "lodash";

import "./style.css";
import {
  searchInput,
  searchButton,
  celsius,
  fahrenheit,
  feelsLikeTemperature,
} from "./modules/dom";
import { getWeatherData } from "./modules/weather";

let isCelsius = false;
let isFahrenheit = true;

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeatherData(searchInput.value, isFahrenheit);
  }
});

searchButton.addEventListener("click", () => {
  getWeatherData(searchInput.value, isFahrenheit);
  console.log(feelsLikeTemperature.textContent);
});

celsius.addEventListener("click", () => {
  if (!isCelsius) {
    isCelsius = true;
    isFahrenheit = false;
    getWeatherData(searchInput.value, isFahrenheit);
  }
  celsius.style.opacity = 1;
  fahrenheit.style.opacity = 0.6;

  console.log(isCelsius, isFahrenheit);
});

fahrenheit.addEventListener("click", () => {
  if (!isFahrenheit) {
    isFahrenheit = true;
    isCelsius = false;
    getWeatherData(searchInput.value, isFahrenheit);
  }
  celsius.style.opacity = 0.6;
  fahrenheit.style.opacity = 1;
});
