import React, { useState } from "react";
import TrafficIntersection from "./trafficIntersection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import History, { TableData } from "./History";

const Hero = () => {
  const [history, setHistory] = useState<TableData[]>([]);
  const addHistoryHandler = (value: TableData) => {
    console.log(value);

    setHistory((prev) => {
      let newArr = [...prev];
      newArr.unshift({ ...value });
      return newArr;
    });
  };
  return (
    <div className="mt-20 lg:mt-0 p-8 w-full ">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border "
      >
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col h-full items-center justify-center ">
            <TrafficIntersection addHistory={addHistoryHandler} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} maxSize={30}>
          <div className="flex flex-col p-2 h-full">
            <History data={history} resetHistory={() => setHistory([])} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default Hero;
