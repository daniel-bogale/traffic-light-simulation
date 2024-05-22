import React from "react";
import TrafficIntersection from "./trafficIntersection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import History from "./History";

const Hero = () => {
  return (
    <div className="mt-20 lg:mt-2 p-8 w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border"
      >
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col h-full items-center justify-center ">
            <TrafficIntersection />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} maxSize={30}>
          <div className="flex flex-col py-10 px-2 h-full">
            <History />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default Hero;
