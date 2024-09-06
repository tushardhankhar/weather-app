import React from "react";
import { LuSunset } from "react-icons/lu";
export default function Wind() {
  return (
    <div className="bg-base-200 w-[20rem] h-[15rem] rounded-2xl border-base-content border p-8 flex flex-col justify-between">
      <div>
        <div className="flex gap-2 mb-6 font-medium text-xl">
          <LuSunset size={25} />
          <h1>Sunset</h1>
        </div>
        <h3>5:41 PM</h3>
      </div>
      <h2>Sunrise : 7:15 AM</h2>
    </div>
  );
}
