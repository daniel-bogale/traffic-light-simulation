"use client";
import { useEffect, useState } from "react";
import { TrafficLight } from "./trafficLight";
import Timer from "./timer";
import { SocketState, State } from "../page";

interface Props {
  currentState: State[];
  seconds: number[];
}
const TrafficIntersection = ({ currentState, seconds }: Props) => {

  return (
    <div className="ml-96 grid grid-cols-5 grid-rows-3 gap-2 max-w-3xl ">
      <div className="col-start-3 flex flex-col justify-start items-center">
        <TrafficLight
          selected={currentState[0]}
          horizontal={true}
        />
        <div className="mt-[-5rem]">
          <Timer seconds={seconds[0]}
          />
        </div>
      </div>
      <div className="col-start-1 row-start-2">
        <div className="flex justify-center items-center gap-4">
          <Timer seconds={seconds[1]}
          />
          <TrafficLight
            selected={currentState[1]}
          />
        </div>
      </div>
      <div className="col-start-5 row-start-2">
        <div className="flex justify-center items-center gap-4">
          <TrafficLight
            selected={currentState[2]}
          />
          <Timer seconds={seconds[2]}
          />
        </div>
      </div>
      <div className="col-start-3 row-start-3">
        <div className="col-start-3 flex flex-col justify-start items-center">
          <div className="mb-[-5rem]">
            <Timer seconds={seconds[3]}
            />
          </div>
          <TrafficLight
            selected={currentState[3]}
            horizontal={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TrafficIntersection;
