import React, { useEffect, useState } from "react";
import { MdAir } from "react-icons/md";
import { useLocation } from "../context/location-context";
import { getAirPollution } from "../services/weatherService";
import { Pollution } from "../utils/pollution";

export default function AirPollution() {
  const { location } = useLocation();
  const [aqi, setAqi] = useState(1);

  async function getData(params) {
    try {
      const result = await getAirPollution({
        lat: location.latitude,
        lon: location.longitude,
      });
      setAqi(result.list[0].main.aqi)
    } catch (error) {}
  }

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="bg-base-200 w-full min-h-[12rem] rounded-2xl border-base-content border p-8 flex flex-col justify-between lg:mt-20">
      <div className="flex items-center gap-2 font-medium text-xl">
        <MdAir size={25} />

        <h1>Air Pollution</h1>
      </div>
      <progress class="progress w-full h-4" value={aqi} max="5"></progress>
      <h2 className="">Air Quality is {Pollution[aqi]}</h2>
    </div>
  );
}
