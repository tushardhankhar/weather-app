import clsx from "clsx";
import React from "react";
import { themes } from "../utils/ThemeUtils";

export default function NavBar({ setTheme, theme }) {
  const ItemTemplate = ({ data }) => {
    console.log(data);
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
  return (
    <div className="flex p-10 justify-between shadow-xl">
      <div className="p-2 bg-warning text-warning-conten rounded-xl font-extrabold text-2xl">
        Weather
      </div>
      <div>
        <input placeholder="Search" className="p-2 rounded-xl pr-10 pl-6" />
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
