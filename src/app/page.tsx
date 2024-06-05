"use client";
import * as React from "react";

import Hero from "./components/Hero";
import Nav from "./components/Nav";

export default function Home() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/read-eeprom');
      const result = await response.json();
      setData(result.eepromData);
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-h-[100rem]">
      <Nav />
      <Hero />
      <div>
        <h1>EEPROM Data</h1>
        <p>{data}</p>
      </div>
    </main>
  );
}
