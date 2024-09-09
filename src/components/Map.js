import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [weatherLayer, setWeatherLayer] = useState("clouds_new");

  const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className="rounded-2xl"
      style={{
        backgroundColor: darkMode ? "#333" : "#fff",
        width: "50vw",
        height: "50vh",
        borderRadius: "1rem",
      }}
    >
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%", borderRadius: "2rem" }}
      >
        {/* Base Map Layer (Light or Dark) */}
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark mode tile
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Light mode tile
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Weather Overlay Layer */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/${weatherLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
        />
      </MapContainer>

      <div className="flex gap-4 justify-center mt-4">
        {/* Layer Switcher */}
        <button
          className="btn btn-primary"
          onClick={() => setWeatherLayer("clouds_new")}
        >
          Clouds
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setWeatherLayer("precipitation_new")}
        >
          Precipitation
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setWeatherLayer("temp_new")}
        >
          Temperature
        </button>
        <button
          onClick={() => setWeatherLayer("wind_new")}
          className="btn btn-primary"
        >
          Wind
        </button>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="btn btn-primary"
         
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
};



export default WeatherMap;
