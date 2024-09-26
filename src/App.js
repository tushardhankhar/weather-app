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

function App() {
  const [theme, setTheme] = useState("coffee");
  const { location, error } = useLocation();
  const [data, setData] = useState();
  const [isLocationUpdated, setIsLocationUpdated] = useState(false);

  const fetchWeatherData = async () => {
    try {
      const weatherData = await getWeatherData({
        lat: location.latitude,
        lon: location.longitude,
      });
      setData(weatherData);
    } catch (error) {
      notify(error.message);
    }
  };
  useEffect(() => {
    if (error) {
      notify(error);
    }
  }, [error]);

  useEffect(() => {
    if (!isLocationUpdated && location.latitude !== 28.7041 && location.longitude !== 77.1025) {
      setIsLocationUpdated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (isLocationUpdated || !navigator.geolocation) {
      fetchWeatherData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocationUpdated, location]);

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
