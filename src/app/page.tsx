"use client";
import io from 'socket.io-client';


import Hero from "./components/Hero";
import Nav from "./components/Nav";
import { useEffect, useState } from 'react';

export default function Home() {
  const [socket_state, setSocket_state] = useState('try connecting...');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    fetch('api/socket');
    setSocket(io());
  }, []);
  if (socket) {
    socket.on('updateData', (data: any) => {
      console.log('connected successfully', socket.id);
      setSocket_state(data);
    });
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-h-[100rem]">
      <Nav />
      <Hero />
      <div>
        <h1>EEPROM Data</h1>
        <div>
          <h1>socket state: {JSON.stringify(socket_state)}</h1>
        </div>
      </div>
    </main>
  );
}
