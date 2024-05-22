"use client";
import * as React from "react";

import Hero from "./components/Hero";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Nav />
      <Hero />
    </main>
  );
}
