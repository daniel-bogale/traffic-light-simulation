import React, { useState, useEffect } from "react";

const Timer = () => {
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

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max ">
      <div className="flex flex-col p-2 bg-gray-800 rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-gray-800 rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Timer;
