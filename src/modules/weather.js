import {
  roundToDecimal,
  capitalizeWords,
  fetchJSON,
  toCelsius,
} from "./utils.js";
import {
  cityName,
  weatherDescription,
  weatherIcon,
  currentTemperature,
  feelsLikeTemperature,
  locationHumidity,
  windSpeed,
  bodyBackground,
  temperatureMeasurement,
} from "./dom.js";
import { getLocationData } from "./location.js";
import sunnyBackground from "../images/sunny.png";
import clearNightBackground from "../images/night.jpg";
import partlyCloudyDay from "../images/partly_cloudy_day.jpg";
import partlyCloudyNight from "../images/partly_cloudy_night.jpg";
import cloudyBackground from "../images/cloudy.jpg";
import rainyBackground from "../images/rain.jpg";
import thunderstormBackground from "../images/lightning.jpg";
import snowyBackground from "../images/snowfall.jpg";
import mistyBackground from "../images/mist.jpg";
import rainyNight from "../images/rainy_night.jpg";

const getWeatherIcon = (icon) => {
  const weatherIcons = {
    "01d": "sunny",
    "01n": "clear_night",
    "02d": "partly_cloudy_day",
    "02n": "partly_cloudy_night",
    "03d": "cloudy",
    "03n": "cloudy",
    "04d": "cloudy",
    "04n": "cloudy",
    "09d": "rainy",
    "09n": "rainy",
    "10d": "rainy",
    "10n": "rainy",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "weather_snowy",
    "13n": "weather_snowy",
    "50d": "mist",
    "50n": "mist",
  };

  const iconClass = weatherIcons[icon];

  if (iconClass) {
    return `<span class="material-symbols-outlined" style="font-size: 75px">${iconClass}</span>`;
  }
  return "";
};

const setBackgroundImage = (code) => {
  const backgroundImages = {
    "01d": sunnyBackground,
    "01n": clearNightBackground,
    "02d": partlyCloudyDay,
    "02n": partlyCloudyNight,
    "03d": cloudyBackground,
    "03n": partlyCloudyNight,
    "04d": cloudyBackground,
    "04n": partlyCloudyNight,
    "09d": rainyBackground,
    "09n": rainyNight,
    "10d": rainyBackground,
    "10n": rainyNight,
    "11d": thunderstormBackground,
    "11n": thunderstormBackground,
    "13d": snowyBackground,
    "13n": snowyBackground,
    "50d": mistyBackground,
    "50n": partlyCloudyNight,
  };

  const fontColors = {
    "01d": "--sunny-color",
    "01n": "--night-color",
    "02d": "--sunny-color",
    "02n": "--night-color",
    "03d": "--default-color",
    "03n": "--night-color",
    "04d": "--default-color",
    "04n": "--night-color",
    "09d": "--default-color",
    "09n": "--night-color",
    "10d": "--default-color",
    "10n": "--night-color",
    "11d": "--default-color",
    "11n": "--default-color",
    "13d": "--default-color",
    "13n": "--default-color",
    "50d": "--default-color",
    "50n": "--night-color",
  };

  bodyBackground.style.color = `var(${fontColors[code]})`;

  return `url(${backgroundImages[code]})`;
};

async function getWeatherData(location, isFahrenheit) {
  try {
    const locationData = await getLocationData(location);
    const { name, lat, lon } = locationData[0];
    const latitude = roundToDecimal(lat, 2);
    const longitude = roundToDecimal(lon, 2);
    console.log(locationData[0], latitude, longitude, name);
    cityName.textContent = name;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=b2b931ede63e919c305100a39dc05111`;
    const weatherData = await fetchJSON(url);
    const { feels_like, humidity, temp } = weatherData.main;
    const { description, icon } = weatherData.weather[0];
    const wind = weatherData.wind.speed;
    weatherDescription.textContent = capitalizeWords(description);

    weatherIcon.innerHTML = getWeatherIcon(icon);
    bodyBackground.style.backgroundImage = setBackgroundImage(icon);

    if (isFahrenheit) {
      currentTemperature.textContent = roundToDecimal(temp, 0);
      feelsLikeTemperature.textContent = `Feels like: ${roundToDecimal(
        feels_like,
        0
      )} \u00B0F`;
    } else {
      currentTemperature.textContent = roundToDecimal(toCelsius(temp), 0);
      feelsLikeTemperature.textContent = `Feels like: ${roundToDecimal(
        toCelsius(feels_like),
        0
      )} \u00B0C`;
    }

    locationHumidity.textContent = `Humidity: ${humidity}%`;

    windSpeed.textContent = `Wind speed: ${roundToDecimal(wind, 0)} mph`;
    temperatureMeasurement.style.display = "flex";
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

export { getWeatherData };
