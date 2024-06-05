import React, { useState, useEffect } from "react";

interface Props {
  seconds: number;
}
const Timer = ({ seconds }: Props) => {

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-gray-400/65 dark:bg-gray-800/65 rounded-box backdrop-blur-sm">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": Math.floor(seconds / 60) } as React.CSSProperties}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-gray-400/65 dark:bg-gray-800/65 rounded-box backdrop-blur-sm ">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": seconds % 60 } as React.CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Timer;
