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
              active === item.id
                ? "bg-gray-300 text-black underline underline-offset-4"
                : "bg-blue-500 bg-clip-padding backdrop-filter backdrop-blur-2xl   text-white px-4 py-2 ",
              "px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
            )}
            onClick={() => {
              setactive(item.id);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      {active === "DoubleShift" ? <DoubleShift /> : <TripleShift />}
    </div>
  );
}
