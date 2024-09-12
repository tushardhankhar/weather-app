import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { themes } from "../utils/ThemeUtils";
import axios from "axios";
import { useLocation } from "../context/location-context";

export default function NavBar({ setTheme, theme }) {
  const [state, setState] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { setLocation } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  async function handleSearch() {
    try {
      const res = await axios({
        method: "GET",
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${state}&limit=5&appid=26417544c7a6f54247e9f8e84ffa236e`,
      });
      setSuggestions(res.data);
      setShowDropdown(true);
    } catch (error) {}
  }

  useEffect(() => {
    if (state) {
      let timer = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [state]);

  const ItemTemplate = ({ data }) => {
    return (
      <button
        type="button"
        className={clsx(
          "outline-base-content mx-1.5  overflow-hidden rounded-lg text-left"
          // watch("theme.lightTheme") === data.themeName && "[&_svg]:visible"
        )}
        data-set-theme={data.themeName}
        data-act-classname="[&amp;_svg]:visible"
        // onClick={() => setValue("theme.lightTheme", data.themeName, { shouldDirty: true })}
      >
        <div
          data-theme={data.themeName}
          className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>
              <div className="flex-grow text-sm">
                {data?.themeSchema || data.themeName}
              </div>
              <div
                className="flex h-full flex-shrink-0 flex-wrap gap-1"
                data-svelte-h="svelte-izuv7l"
              >
                <div className="bg-primary w-2 rounded"></div>
                <div className="bg-secondary w-2 rounded"></div>
                <div className="bg-accent w-2 rounded"></div>
                <div className="bg-neutral w-2 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  };
  //set the value to value template
  const ValueTemplate = ({ data }) => {
    return (
      <div className="e-input-value">
        <button
          type="button"
          className={clsx(
            "outline-base-content mx-1.5 w-full overflow-hidden rounded-lg text-left"
          )}
          data-set-theme={data.themeName}
          data-act-classname="[&amp;_svg]:visible"
          // onClick={() => setValue("theme.lightTheme", data.themeName, { shouldDirty: true })}
        >
          <div
            data-theme={data.themeName}
            className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
          >
            <div className="grid grid-cols-5 grid-rows-3">
              <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="invisible h-3 w-3 shrink-0"
                >
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                </svg>
                <div className="flex-grow text-sm">
                  {data?.themeSchema || data.themeName}
                </div>
                <div
                  className="flex h-full flex-shrink-0 flex-wrap gap-1"
                  data-svelte-h="svelte-izuv7l"
                >
                  <div className="bg-primary w-2 rounded"></div>
                  <div className="bg-secondary w-2 rounded"></div>
                  <div className="bg-accent w-2 rounded"></div>
                  <div className="bg-neutral w-2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  };

  const handleItemClick = (item) => {
    setState(item.name);
    setShowDropdown(false);
    setLocation({
      latitude: item?.lat,
      longitude: item?.lon,
    });
  };
  return (
    <div className="flex p-6 justify-between shadow-xl">
      <div className="p-2 bg-warning text-warning-conten rounded-xl font-extrabold text-2xl">
        Weather
      </div>
      <div className="flex">
        <div>
          <input
            placeholder="Search"
            className="p-2 rounded-xl pr-10 pl-6 w-60"
            onChange={(e) => setState(e.target.value)}
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
