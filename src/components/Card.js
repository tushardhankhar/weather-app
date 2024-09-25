import React from "react";
import { DAY } from "../utils/dateConfig";
import CurrentTime from "./CurrentTime";

export default function Card({ data }) {
  const date = new Date();
  return (
    <div className="bg-base-200 w-full rounded-2xl border-base-content border p-8 flex flex-col justify-between ">
      <div>
        <div className="flex justify-between font-medium text-xl">
          <h2>{DAY[date.getDay()]}</h2>
          <CurrentTime />
        </div>
        <div className="font-medium text-lg mt-2 ">{data?.name}</div>
      </div>
      <div className="font-extrabold text-6xl my-12 text-center">
        {(data?.main?.temp - 273.15).toFixed(1)}&deg;c
      </div>
      <div>
        <img
          className="h-16 w-16 ml-[-1rem]"
          src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
          alt=""
        />
        <h2>{data?.weather[0]?.main}</h2>
        <div>L: {(data?.main?.temp_min - 273.15).toFixed(1)}&deg;c &nbsp; h: {(data?.main?.temp_max - 273.15).toFixed(1)}&deg;c</div>
      </div>
    </div>
  );
}
