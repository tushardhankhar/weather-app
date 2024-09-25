import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { themes } from "../utils/ThemeUtils";
import axios from "axios";
import { useLocation } from "../context/location-context";

export default function NavBar({ setTheme, theme }) {
  const [inputValue, setInputValue] = useState(""); // To track input changes
  const [state, setState] = useState(""); // Actual state used for location
  const [suggestions, setSuggestions] = useState([]);
  const { setLocation } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  async function handleSearch() {
    try {
      const res = await axios({
        method: "GET",
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=26417544c7a6f54247e9f8e84ffa236e`,
      });
      setSuggestions(res.data);
      setShowDropdown(true);
    } catch (error) {}
  }

  useEffect(() => {
    if (inputValue) {
      let timer = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [inputValue]);

  const handleItemClick = (item) => {
    setState(item.name); // Update selected state
    setShowDropdown(false); // Close dropdown
    setLocation({
      latitude: item?.lat,
      longitude: item?.lon,
    });
  };

  return (
    <div className="flex p-6 justify-between shadow-xl">
      <div className="p-2 bg-warning text-warning-content rounded-xl font-extrabold text-2xl">
        Weather
      </div>
      <div className="flex">
        <div>
          <input
            placeholder="Search"
            className="p-2 rounded-xl pr-10 pl-6 w-60"
            onChange={(e) => setInputValue(e.target.value)} // Only trigger search when input changes
            value={inputValue} // Control input value
          />
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute z-[1000] w-60 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-indigo-100 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <select
          value={theme}
          className="p-2 px-4 w-48 rounded-xl ml-4"
          onChange={(e) => setTheme(e.target.value)}
        >
          {themes.map((theme, i) => (
            <option key={i}>{theme}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
