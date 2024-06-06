"use client";
import { useEffect, useState } from "react";
import { TrafficLight } from "./trafficLight";
import Timer from "./timer";

interface Props {
  addHistory: (value: any) => void;
}
type State = "go" | "slow" | "stop"
const TrafficIntersection = ({ addHistory }: Props) => {
  const [selectedState, setSelectedState] = useState<State[]>([
    "go",
    "go",
    "go",
    "go",
  ]);

  //for north,east,west,south
  const [seconds, setSeconds] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        return prevSeconds.map((val) => val + 1)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const setState = (idx: number, state: State) => {
    setSelectedState((prev) => {
      return prev.map((val, i) => {
        if (idx === i) return state
        return val
      })
    })
    setSeconds((prev) => {
      return prev.map((val, i) => {
        if (idx === i) return 0
        return val
      })
    })

  }
  return (
    <div className="ml-96 grid grid-cols-5 grid-rows-3 gap-2 max-w-3xl ">
      <div className="col-start-3 flex flex-col justify-start items-center">
        <TrafficLight
          selected={selectedState[0]}
          setSelected={(state) => setState(0, state)}
          horizontal={true}
          addHistory={addHistory}
          position="north"
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
            selected={selectedState[1]}
            setSelected={(state) => setState(1, state)}
            addHistory={addHistory}
            position="west"
          />
        </div>
      </div>
      <div className="col-start-5 row-start-2">
        <div className="flex justify-center items-center gap-4">
          <TrafficLight
            selected={selectedState[2]}
            setSelected={(state) => setState(2, state)}
            addHistory={addHistory}
            position="east"
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
            selected={selectedState[3]}
            setSelected={(state) => setState(3, state)}
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
