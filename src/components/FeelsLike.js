import React from "react";
import { FaTemperatureHalf } from "react-icons/fa6";
export default function FeelsLike() {
  return (
    <div className="bg-base-200 w-full h-[15rem] rounded-2xl border-base-content border p-8 flex flex-col justify-between">
      <div>
        <div className="flex gap-2 mb-6 font-medium text-xl">
          <FaTemperatureHalf size={25} />
          <h1>Feels like</h1>
        </div>
        <h3 className="text-xl font-semibold">13&deg;c</h3>
      </div>
      <h2>Feels Colder than the actual temperature.</h2>
    </div>
  );
}
