"use client";
import { useEffect, useState } from "react";
import { TrafficLight } from "./trafficLight";
import Timer from "./timer";

interface Props {
  addHistory: (value: any) => void;
}
const TrafficIntersection = ({ addHistory }: Props) => {
  const [northSelected, setNorthSelected] = useState<"go" | "slow" | "stop">(
    "go"
  );
  const [eastSelected, setEastSelected] = useState<"go" | "slow" | "stop">(
    "stop"
  );
  const [westSelected, setWestSelected] = useState<"go" | "slow" | "stop">(
    "stop"
  );
  const [southSelected, setSouthSelected] = useState<"go" | "slow" | "stop">(
    "go"
  );

  return (
    <div className="ml-96 grid grid-cols-5 grid-rows-3 gap-2 max-w-3xl ">
      <div className="col-start-3 flex flex-col justify-start items-center">
        <TrafficLight
          selected={northSelected}
          setSelected={setNorthSelected}
          horizontal={true}
          addHistory={addHistory}
          position="north"
        />
        <div className="mt-[-5rem]">
          <Timer currentState={northSelected} />
        </div>
      </div>
      <div className="col-start-1 row-start-2">
        <div className="flex justify-center items-center gap-4">
          <Timer currentState={westSelected} />
          <TrafficLight
            selected={westSelected}
            setSelected={setWestSelected}
            addHistory={addHistory}
            position="west"
          />
        </div>
      </div>
      <div className="col-start-5 row-start-2">
        <div className="flex justify-center items-center gap-4">
          <TrafficLight
            selected={eastSelected}
            setSelected={setEastSelected}
            addHistory={addHistory}
            position="east"
          />
          <Timer currentState={eastSelected} />
        </div>
      </div>
      <div className="col-start-3 row-start-3">
        <div className="col-start-3 flex flex-col justify-start items-center">
          <div className="mb-[-5rem]">
            <Timer currentState={southSelected} />
          </div>
          <TrafficLight
            selected={southSelected}
            setSelected={setSouthSelected}
            horizontal={true}
            addHistory={addHistory}
            position="south"
          />
        </div>
      </div>
    </div>
  );
};

export default TrafficIntersection;
