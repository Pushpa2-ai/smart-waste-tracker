import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import greenPin from "../assets/pin.png"; // ✅ your pin image

export default function MapPage() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [center, setCenter] = useState([23.2599, 77.4126]); // Default: Bhopal

  // ✅ Detect user location first
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
      },
      () => console.log("GPS blocked — using Bhopal default")
    );
  }, []);

  // ✅ Initialize Map ONLY ONCE
  useEffect(() => {
    if (mapRef.current) return; // prevent re-running

    mapRef.current = L.map("mainMap", {
      center,
      zoom: 15,
      zoomControl: true,
    });

    // Soft green OpenStreetMap Style
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution: "SmartWaste Live Map",
    }).addTo(mapRef.current);

  }, []);

  // ✅ Update Center + Marker
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setView(center, 15, { animate: true });

    const pinIcon = L.icon({
      iconUrl: greenPin,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
    });

    if (markerRef.current) mapRef.current.removeLayer(markerRef.current);

    markerRef.current = L.marker(center, { icon: pinIcon }).addTo(mapRef.current);
  }, [center]);

  return (
    <div className="h-[88vh] w-full p-4 rounded-xl bg-green-100">
      <div
        id="mainMap"
        className="w-full h-full rounded-xl shadow-lg border border-green-300"
      ></div>
    </div>
  );
}
