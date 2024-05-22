import React, { useState, useEffect } from "react";

interface Props {
  currentState: "go" | "slow" | "stop";
}
const Timer = ({ currentState }: Props) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        } else {
          return prevSeconds + 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setMinutes(0);
    setSeconds(0);
  }, [currentState]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-gray-400 dark:bg-gray-800 rounded-box ">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": minutes } as React.CSSProperties}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-gray-400 dark:bg-gray-800 rounded-box ">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": seconds } as React.CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Timer;
