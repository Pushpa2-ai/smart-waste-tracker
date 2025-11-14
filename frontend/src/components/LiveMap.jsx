import React, { useEffect, useState } from "react";
import mapImg from "../assets/green-city-map.jpeg";
import pinImg from "../assets/pin.png";

export default function LiveMap() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latRef = 23.2599; // Bhopal reference
        const lonRef = 77.4126;

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const x = 50 + (lon - lonRef) * 250;
        const y = 50 - (lat - latRef) * 250;

        setPosition({
          x: Math.max(15, Math.min(85, x)),
          y: Math.max(15, Math.min(85, y)),
        });
      },
      () => console.log("GPS blocked → using default center")
    );
  }, []);

  return (
    <div
      className="relative w-full h-60 rounded-xl overflow-hidden shadow-md border border-green-300 bg-green-100"
      style={{
        backgroundImage: `url(${mapImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Single Location Pin */}
      <img
      src={pinImg}
      alt="pin"
      className="absolute w-10 drop-shadow-xl animate-glow-pin transition-all duration-500"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      />

    </div>
  );
}
