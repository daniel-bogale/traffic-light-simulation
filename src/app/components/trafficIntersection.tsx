"use client";
import { useState } from "react";
import { TrafficLight } from "./trafficLight";
import Timer from "./timer";

const TrafficIntersection = () => {
  const [northSelected, setNorthSelected] = useState("stop");
  const [eastSelected, setEastSelected] = useState("stop");
  const [southSelected, setSouthSelected] = useState("stop");
  const [westSelected, setWestSelected] = useState("stop");

  return (
    <div className="grid grid-cols-5 grid-rows-3 gap-2 max-w-3xl">
      <div className="col-start-3 flex flex-col justify-start items-center">
        <TrafficLight
          selected={northSelected}
          setSelected={setNorthSelected}
          horizontal={true}
        />
        <div className="mt-[-5rem]">
          <Timer />
        </div>
      </div>
      <div className="col-start-1 row-start-2">
        <div className="flex justify-center items-center gap-4">
          <Timer />
          <TrafficLight selected={westSelected} setSelected={setWestSelected} />
        </div>
      </div>
      <div className="col-start-5 row-start-2">
        <div className="flex justify-center items-center gap-4">
          <TrafficLight selected={eastSelected} setSelected={setEastSelected} />
          <Timer />
        </div>
      </div>
      <div className="col-start-3 row-start-3">
        <div className="col-start-3 flex flex-col justify-start items-center">
          <div className="mb-[-5rem]">
            <Timer />
          </div>
          <TrafficLight
            selected={southSelected}
            setSelected={setSouthSelected}
            horizontal={true}
          />
        </div>
      </div>
    </div>
  );
};

export default TrafficIntersection;
