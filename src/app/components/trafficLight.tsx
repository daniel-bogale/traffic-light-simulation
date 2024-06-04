import { useState } from "react";

interface Props {
  selected: string;
  setSelected: (value: "go" | "slow" | "stop") => void;
  horizontal?: boolean;
  addHistory: (value: any) => void;
  position: "south" | "north" | "east" | "west";
}
export const TrafficLight = ({
  selected,
  setSelected,
  horizontal = false,
  addHistory,
  position,
}: Props) => {
  const clickHandler = (action: "go" | "slow" | "stop") => {
    if (selected === action) return;
    const newHistory = {
      time: new Date().toLocaleTimeString(),
      position,
      action,
    };

    setSelected(action);
    addHistory(newHistory);
  };
  return (
    <div
      className={`float-left p-4 w-42  bg-gray-400/65  dark:bg-gray-800/65 rounded-[18px] backdrop-blur-sm ${horizontal ? "-rotate-90" : ""
        }`}
    >
      <div
        onClick={() => clickHandler("go")}
        id="goLight"
        className={` mx-auto w-16 h-16 ${selected === "go" ? "bg-green-600" : "bg-gray-900"
          }  rounded-full transition-bg duration-500`}
      ></div>
      <div
        onClick={() => clickHandler("slow")}
        id="slowLight"
        className={`my-5 mx-auto w-16 h-16 ${selected === "slow" ? "bg-yellow-600" : "bg-gray-900"
          }  rounded-full transition-bg duration-500`}
      ></div>
      <div
        onClick={() => clickHandler("stop")}
        id="stopLight"
        className={` mx-auto w-16 h-16 ${selected === "stop" ? "bg-red-600" : "bg-gray-900"
          }  rounded-full transition-bg duration-500`}
      ></div>
    </div>
  );
};
