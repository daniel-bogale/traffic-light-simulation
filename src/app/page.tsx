"use client";
import io from 'socket.io-client';


import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { useEffect, useState } from 'react';
import { POSITION, TableData } from './components/History';

export interface SocketState {
  turn: number;
  delay: number;
  cars: number[];
}
export type State = "go" | "slow" | "stop"


export default function Home() {
  const [socket_state, setSocket_state] = useState<SocketState | null>(null);
  const [currentState, setCurrentState] = useState<State[]>([
    "stop",
    "stop",
    "stop",
    "stop",
  ]);
  const [socket, setSocket] = useState<any>(null);
  const [seconds, setSeconds] = useState([0, 0, 0, 0]);
  const [history, setHistory] = useState<TableData[]>([]);


  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        return prevSeconds.map((val, idx) => {
          if (val === 1 && currentState[idx] === "slow") {
            setCurrentState((prev) => prev.map((val, i) => {
              if (i === idx) return "stop"
              return val
            }))
            return 0
          }
          return val + 1
        })
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [...currentState]);

  useEffect(() => {
    fetch('api/socket');
    setSocket(io());
  }, []);
  if (socket) {
    socket.on('updateData', (data: SocketState) => {
      setSocket_state(data);
      setCurrentState((prev) => {
        return prev.map((_, idx) => {
          if (idx === data.turn) {
            return "go"
          }
          if (idx === (data.turn + 3) % 4) return "slow"
          return "stop"
        })
      })
    });
  }
  useEffect(() => {
    const goIndex = currentState.findIndex((val) => val === "go")
    const slowIndex = currentState.findIndex((val) => val === "slow")
    // const stopIndex = currentState.findIndex((val) => val === "stop")

    if (goIndex >= 0 && slowIndex >= 0) {
      addHistoryHandler({
        id: history.length + 1,
        time: new Date().toLocaleTimeString(),
        position: POSITION[goIndex],
        action: "go",
      });
      // addHistoryHandler({
      //   id: history.length + 2,
      //   time: new Date().toLocaleTimeString(),
      //   position: POSITION[slowIndex],
      //   action: "slow",
      // });

      setSeconds((prevSeconds) => {
        return prevSeconds.map((val, idx) => {
          if (idx === goIndex || idx === slowIndex) return 0
          return val
        })
      });
    }
    // if (stopIndex >= 0) {
    //   addHistoryHandler({
    //     id: history.length + 1,
    //     time: new Date().toLocaleTimeString(),
    //     position: POSITION[stopIndex],
    //     action: "stop",
    //   });
    // }

  }, [...currentState])

  const addHistoryHandler = (value: TableData) => {
    setHistory((prev) => {
      let newArr = [...prev];
      newArr.unshift({ ...value });
      return newArr;
    });
  };




  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-h-[100rem]">
      <Nav />
      <Hero history={history} resetHistory={() => setHistory([])} socketState={socket_state} seconds={seconds} currentState={currentState} />
    </main>
  );
}
