import { useState } from "react";
import AirPollution from "./components/AirPollution";
import Card from "./components/Card";
import NavBar from "./components/NavBar";
import Sunset from "./components/Sunset";
import Wind from "./components/WindCard";

function App() {
  const [theme, setTheme] = useState("luxury");
  return (
    <div data-theme={theme} className="bg-base-100 min-h-screen ">
      <NavBar setTheme={setTheme} theme={theme} />
      <main className="flex gap-10 p-20">
        <Card />
        <AirPollution />
        <div>
          <Sunset />
          <Wind />
        </div>
      </main>
    </div>
  );
}

export default App;
