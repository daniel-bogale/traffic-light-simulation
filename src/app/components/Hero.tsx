import React, { useState } from "react";
import TrafficIntersection from "./trafficIntersection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import History, { TableData } from "./History";
import { SocketState, State } from "../page";
interface Props {
  socketState: SocketState | null;
  currentState: State[];
  seconds: number[];
  history: TableData[];
  resetHistory: () => void
}

const Hero = ({ currentState, resetHistory, socketState, seconds, history }: Props) => {

  return (
    <div className="mt-20 lg:mt-0 p-8 w-full ">
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border "
      >
        <ResizablePanel defaultSize={75}>
          <div className="bg-[url('/images/roadImage.png')]">
            {socketState && <TrafficIntersection currentState={currentState} seconds={seconds} />}
            {!socketState && <div className="w-full h-full min-h-[90vh] flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>

            </div>}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} maxSize={25}>
          <div className="flex flex-col p-2 h-full">
            <History data={history} resetHistory={resetHistory} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default Hero;
