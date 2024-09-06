import React from "react";
import { MdAir } from "react-icons/md";

export default function AirPollution() {
  return (
    <div className="bg-base-200 w-[40rem] min-h-[12rem] rounded-2xl border-base-content border p-8 flex flex-col justify-between">
      <div className="flex items-center gap-2 font-medium text-xl">
        <MdAir size={25} />

        <h1>Air Pollution</h1>
      </div>
      <progress class="progress w-full h-4" value="10" max="100"></progress>
      <h2 className="">Air Quality is Good.</h2>
    </div>
  );
}
