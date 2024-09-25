import axios from "axios";

export async function getWeatherData({ lat, lon }) {
  try {
    const response = await axios({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        lat,
        lon,
        appid: process.env.REACT_APP_WEATHER_KEY,
      },
    });
    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getWeatherForecast({ lat, lon }) {
  try {
    const response = await axios({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast",
      params: {
        lat,
        lon,
        appid: process.env.REACT_APP_WEATHER_KEY,
      },
    });
    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
