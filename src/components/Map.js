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
        borderRadius: "2rem",
      }}
    >
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" , borderRadius : "2rem" }}
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

      <div style={{ padding: "10px", textAlign: "center" }}>
        {/* Layer Switcher */}
        <button
          onClick={() => setWeatherLayer("clouds_new")}
          style={darkMode ? darkButtonStyle : lightButtonStyle}
        >
          Clouds
        </button>
        <button
          onClick={() => setWeatherLayer("precipitation_new")}
          style={darkMode ? darkButtonStyle : lightButtonStyle}
        >
          Precipitation
        </button>
        <button
          onClick={() => setWeatherLayer("temp_new")}
          style={darkMode ? darkButtonStyle : lightButtonStyle}
        >
          Temperature
        </button>
        <button
          onClick={() => setWeatherLayer("wind_new")}
          style={darkMode ? darkButtonStyle : lightButtonStyle}
        >
          Wind
        </button>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          style={{
            marginTop: "10px",
            ...(darkMode ? darkButtonStyle : lightButtonStyle),
          }}
        >
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
};

// Button styles
const darkButtonStyle = {
  backgroundColor: "#555",
  color: "#fff",
  padding: "10px",
  margin: "5px",
  border: "none",
  cursor: "pointer",
};

const lightButtonStyle = {
  backgroundColor: "#f0f0f0",
  color: "#000",
  padding: "10px",
  margin: "5px",
  border: "1px solid #ccc",
  cursor: "pointer",
};

export default WeatherMap;
