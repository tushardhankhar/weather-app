import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "../context/location-context";

// Component to handle map re-centering
const ChangeMapCenter = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coordinates); // Update map center
  }, [coordinates, map]);
  return null;
};

const WeatherMap = () => {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [weatherLayer, setWeatherLayer] = useState("temp_new");
  const [coordinates, setCoordinates] = useState([20.5937, 78.9629]);
  const { location, error } = useLocation();

  const API_KEY = process.env.REACT_APP_WEATHER_KEY; // Replace with your OpenWeatherMap API key

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (location && Object.values(location).length > 0) {
      setCoordinates(Object.values(location));
    }
  }, [location]);

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
        center={coordinates}
        zoom={5}
        style={{ height: "100%", width: "100%", borderRadius: "2rem" }}
      >
        {/* Re-center map when location changes */}
        <ChangeMapCenter coordinates={coordinates} />

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
        <button onClick={toggleDarkMode} className="btn btn-primary">
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default WeatherMap;
