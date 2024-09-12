import { useEffect, useState } from "react";
import AirPollution from "./components/AirPollution";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import Sunset from "./components/Sunset";
import Wind from "./components/WindCard";
import FeelsLike from "./components/FeelsLike";
import WeatherMap from "./components/Map";
import Forecast from "./components/Forecast";
import useGetLocation from "./hooks/useGetLocation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const notify = (err) => toast.error(err);

function App() {
  const [theme, setTheme] = useState("coffee");
  const { location, error } = useGetLocation();
  const [data, setData] = useState();

  async function getData(params) {
    try {
      const res = await axios({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?",
        params: {
          lat: location.latitude,
          lon: location.longitude,
          appid: "26417544c7a6f54247e9f8e84ffa236e",
        },
      });
      setData(res?.data);
    } catch (error) {
      notify(error.message);
    }
  }

  useEffect(() => {
    if (error) {
      notify(error);
    }
  }, [error]);

  useEffect(() => {
    if (location.latitude) {
      getData();
    }
  }, [location]);

  console.log(data);

  return (
    <div data-theme={theme} className="bg-base-100 min-h-screen ">
      <NavBar setTheme={setTheme} theme={theme} />
      <main className="flex gap-10 p-20">
        <div className="w-full flex flex-col gap-8">
          <Card data={data} />
          <Forecast data={data} />
        </div>
        <div>
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
