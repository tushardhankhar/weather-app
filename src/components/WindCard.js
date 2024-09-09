import React from "react";
import { MdAir } from "react-icons/md";
import Compass from "./Compass";
export default function Wind() {
  return (
    <div className="bg-base-200 w-full h-[15rem] rounded-2xl border-base-content border p-8 flex flex-col justify-between">
      <div className="flex gap-2 mb-6 font-medium text-xl">
        <MdAir size={25} />
        <h1>Wind</h1>
      </div>
      <div className="flex w-full justify-center">
      <Compass speed={20} deg={2} />

      </div>
    </div>
  );
}
