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
        return prevSeconds.map((val) => val + 1)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('api/socket');
    setSocket(io());
  }, []);
  if (socket) {
    socket.on('updateData', (data: SocketState) => {
      setSocket_state(data);
      setCurrentState((prev) => {
        return prev.map((val, idx) => {
          if (idx === data.turn) {
            // addHistoryHandler({
            //   id: new Date().toLocaleTimeString(),
            //   time: new Date().toLocaleTimeString(),
            //   position: POSITION[0],
            //   action: "go",
            // });
            return "go"
          }
          if (idx === (data.turn + 3) % 4) return "slow"
          return "stop"
        })
      })
    });
  }

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
