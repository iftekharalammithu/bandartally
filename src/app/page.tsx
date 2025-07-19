"use client";

import DoubleShift from "@/Component/Double Shift/DoubleShift";
import TripleShift from "@/Component/Triple Shift/TripleShift";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
  const [active, setactive] = useState("DoubleShift");
  const navbar = [
    { id: "DoubleShift", name: "Double Shift", component: <DoubleShift /> },
    { id: "TripleShift", name: "Triple Shift", component: <TripleShift /> },
  ];
  return (
    <div className="flex w-fit gap-6 items-center m-2 p-10 overflow-auto md:m-6 h-fit flex-col">
      <div className="flex gap-4">
        {navbar.map((item, index) => (
          <button
            key={index}
            className={cn(
              "relative px-4 py-2 rounded-full transition-all duration-500 ease-in-out",
              active === item.id
                ? "bg-blue-500 text-white"
                : "bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-2xl text-black"
            )}
            onClick={() => {
              setactive(item.id);
            }}
          >
            {item.name}
            <span
              className={cn(
                "absolute bottom-1 left-1/2 h-0.5 bg-current transform -translate-x-1/2 transition-all duration-300 ease-in-out",
                active === item.id ? "w-[70%]" : "w-0"
              )}
              style={{ bottom: "4px" }} // Adjust this to position the underline properly
            />
          </button>
        ))}
      </div>
      {active === "DoubleShift" ? <DoubleShift /> : <TripleShift />}
    </div>
  );
}
