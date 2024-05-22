import { useState } from "react";

interface Props {
  selected: string;
  setSelected: (value: "go" | "slow" | "stop") => void;
  horizontal?: boolean;
}
export const TrafficLight = ({
  selected,
  setSelected,
  horizontal = false,
}: Props) => {
  return (
    <div
      className={`float-left p-4 w-42  bg-gray-300 dark:bg-gray-800 rounded-[18px] ${
        horizontal ? "-rotate-90" : ""
      }`}
    >
      <div
        onClick={() => setSelected("go")}
        id="goLight"
        className={` mx-auto w-16 h-16 ${
          selected === "go" ? "bg-green-600" : "bg-gray-900"
        }  rounded-full transition-bg duration-500`}
      ></div>
      <div
        onClick={() => setSelected("slow")}
        id="slowLight"
        className={`my-5 mx-auto w-16 h-16 ${
          selected === "slow" ? "bg-yellow-600" : "bg-gray-900"
        }  rounded-full transition-bg duration-500`}
      ></div>
      <div
        onClick={() => setSelected("stop")}
        id="stopLight"
        className={` mx-auto w-16 h-16 ${
          selected === "stop" ? "bg-red-600" : "bg-gray-900"
        }  rounded-full transition-bg duration-500`}
      ></div>
    </div>
  );
};
