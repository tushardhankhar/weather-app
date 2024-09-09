import React from "react";
import { DAY } from "../utils/dateConfig";
import CurrentTime from "./CurrentTime";

export default function Card() {
  const date = new Date();
  return (
    <div className="bg-base-200 w-full rounded-2xl border-base-content border p-8 flex flex-col justify-between ">
      <div>
        <div className="flex justify-between font-medium text-xl">
          <h2>{DAY[date.getDay()]}</h2>
          <CurrentTime />
        </div>
        <div className="font-medium text-lg mt-2 ">Parliament House, Delhi</div>
      </div>
      <div className="font-extrabold text-7xl text-center">14&deg;c</div>
      <div>
        <img
          className="h-16 w-16 ml-[-1rem]"
          src="https://openweathermap.org/img/wn/10d@2x.png"
          alt=""
        />
        <h2>Clear</h2>
        <div>L: 14&deg;C &nbsp; h: 28&deg;C</div>
      </div>
    </div>
  );
}
