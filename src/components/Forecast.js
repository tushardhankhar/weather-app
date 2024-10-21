import React, { useEffect, useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { useLocation } from "../context/location-context";
import { getWeatherForecast } from "../services/weatherService";
import { DAY } from "../utils/dateConfig";
export default function Forecast() {
  const { location } = useLocation();
  const [data, setData] = useState();

  async function getData(params) {
    try {
      const data = await getWeatherForecast({
        lat: location.latitude,
        lon: location.longitude,
      });
      const dailyForecast = extractDailyForecast(data.list);
      setData(dailyForecast);
    } catch (error) {}
  }
  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const extractDailyForecast = (list) => {
    const dailyForecast = [];
    const noon = 12;
    list.forEach((item) => {
      const date = new Date(item.dt_txt);
      if (date.getHours() === noon) {
        dailyForecast.push(item);
      }
    });
    return dailyForecast;
  };

  return (
    <div className="bg-base-200 w-full rounded-2xl border-base-content border p-8 flex flex-col justify-between ">
      <div className="flex gap-2 mb-4 lg:mb-6 font-medium text-base lg:text-xl">
        <IoCalendarOutline size={25} />
        <h1>Forecast</h1>
      </div>{" "}
      {data?.map((val) => {
        const date = new Date(val.dt_txt);
        return (
          <div key={val.dt} className="flex items-center justify-between">
            <h2 className="text-sm lg:text-base min-w-10 lg:min-w-0">{DAY[date.getDay()].slice(0, 3)}</h2>
            <img
              className=" h-8 w-8 lg:h-12 lg:w-12 mt-1"
              src={`https://openweathermap.org/img/wn/${val?.weather[0]?.icon}@2x.png`}
              alt=""
            />
            <div className="w-full flex items-center gap-2 lg:gap-4">
              <h3 className=" text-sm lg:text-xl font-semibold">{(val?.main?.temp_min - 273.15).toFixed(1)}&deg;c</h3>
              <hr className="border-base-content border-2 w-full" />
              <h3 className=" text-sm lg:text-xl font-semibold">{(val?.main?.temp_max - 273.15).toFixed(1)}&deg;c</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
