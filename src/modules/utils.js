// utils.js module

import { forEachRight } from "lodash";

function roundToDecimal(number, decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(number * factor) / factor;
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

const toCelsius = (fahrenheit) => {
  return roundToDecimal((parseInt(fahrenheit, 0) - 32) * (5 / 9), 0);
};

const toFahrenheit = (celsius) => {
  return roundToDecimal(celsius * (9 / 5) + 32, 0);
};

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}

export { fetchJSON, roundToDecimal, capitalizeWords, toCelsius, toFahrenheit };
