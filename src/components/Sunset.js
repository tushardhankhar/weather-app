import React from "react";
import { LuSunset } from "react-icons/lu";
export default function Sunset({ data }) {
  const sunset = new Date(data?.sys?.sunset).toLocaleTimeString();
  const sunrise = new Date(data?.sys?.sunrise).toLocaleTimeString();
  return (
    <div className="bg-base-200 w-full rounded-2xl border-base-content border p-8 flex flex-col justify-between">
      <div>
        <div className="flex gap-2 mb-6 font-medium text-xl">
          <LuSunset size={25} />
          <h1>Sunset</h1>
        </div>
        <h3>{sunset.split(":").slice(0, 2).join(":")} PM</h3>
      </div>
      <h2>Sunrise : {sunrise.split(":").slice(0, 2).join(":")} AM</h2>
    </div>
  );
}
