import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
export default function Forecast() {
  return (
    <div className="bg-base-200 w-full rounded-2xl border-base-content border p-8 flex flex-col justify-between ">
      <div className="flex gap-2 mb-6 font-medium text-xl">
        <IoCalendarOutline size={25} />
        <h1>Forecast</h1>
      </div>
      <div>
        {" "}
        <div className="flex items-center gap-12">
          <h2>Today</h2>
          <img
            className="h-12 w-12 mt-1"
            src="https://openweathermap.org/img/wn/10d@2x.png"
            alt=""
          />
          <div className="w-full flex items-center gap-4">
            <h3 className="text-xl font-semibold">13&deg;c</h3>
            <hr className="border-base-content border-2 w-24" />

            <h3 className="text-xl font-semibold">13&deg;c</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
