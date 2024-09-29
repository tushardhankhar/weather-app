import { useEffect, useState } from "react";
import AirPollution from "./components/AirPollution";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import Sunset from "./components/Sunset";
import Wind from "./components/WindCard";
import FeelsLike from "./components/FeelsLike";
import WeatherMap from "./components/Map";
import Forecast from "./components/Forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "./context/location-context";
import { getWeatherData } from "./services/weatherService";

const notify = (err) => toast.error(err);

// Default coordinates for New Delhi (as a fallback)
const DEFAULT_COORDS = {
  latitude: 28.7041, 
  longitude: 77.1025
};

function App() {
  const [theme, setTheme] = useState("coffee");
  const { location, error } = useLocation();  // Get location from context
  const [data, setData] = useState(null);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const weatherData = await getWeatherData({ lat, lon });
      setData(weatherData);
    } catch (error) {
      notify(error.message);
    }
  };

  // Fetch weather data based on location (user location or default)
  useEffect(() => {
    if (error) {
      notify(error);
    }

    // Use default location if location data is not available or geolocation fails
    const lat = location?.latitude || DEFAULT_COORDS.latitude;
    const lon = location?.longitude || DEFAULT_COORDS.longitude;

    fetchWeatherData(lat, lon);
  }, [location, error]);  // Run the effect when location or error changes

  return (
    <div data-theme={theme} className="bg-base-100 min-h-screen ">
      <NavBar setTheme={setTheme} theme={theme} />
      <main className="lg:flex lg:gap-10 p-10 lg:p-20 flex-col lg:flex-row flex gap-8">
        <div className="w-full flex flex-col gap-8">
          <Card data={data} />
          <Forecast data={data} />
        </div>
        <div className="w-full flex flex-col gap-8">
          <WeatherMap />
          <AirPollution />
        </div>
        <div className="w-full flex flex-col gap-8">
          <Wind data={data} />
          <FeelsLike data={data} />
          <Sunset data={data} />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
