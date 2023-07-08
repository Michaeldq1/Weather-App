import { fetchJSON } from "./utils.js";

async function getLocationData(location) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=b2b931ede63e919c305100a39dc05111`;
  return fetchJSON(url);
}

export { getLocationData };
