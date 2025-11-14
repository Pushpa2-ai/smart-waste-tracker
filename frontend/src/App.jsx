import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";
import MapPage from "./pages/MapPage";
import RouteOptimizer from "./components/RouteOptimizer"; // <-- ensure file exists

export default function App() {
  return (
    <div className="min-h-screen bg-green-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/optimize" element={<RouteOptimizer />} /> {/* <-- added */}
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
