import { useState } from "react";
import AirPollution from "./components/AirPollution";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import Sunset from "./components/Sunset";
import Wind from "./components/WindCard";
import FeelsLike from "./components/FeelsLike";
import WeatherMap from "./components/Map";
import Forecast from "./components/Forecast";

function App() {
  const [theme, setTheme] = useState("coffee");
  return (
    <div data-theme={theme} className="bg-base-100 min-h-screen ">
      <NavBar setTheme={setTheme} theme={theme} />
      <main className="flex gap-10 p-20">
        <div className="w-full flex flex-col gap-8">
          <Card />
          <Forecast />
        </div>
        <div>
          <WeatherMap />
          <AirPollution />
        </div>

        <div  className="w-full flex flex-col gap-8">
          <Wind />
          <FeelsLike />
          <Sunset />

        </div>
      </main>
    </div>
  );
}

export default App;
