import { useEffect, useState } from "react";
import api from "../services/api";
import mapImg from "../assets/green-city-map.jpeg";
import pinImg from "../assets/pin.png";

export default function LiveMap() {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reference point (center of your city map)
  const latRef = 23.2599; // Bhopal
  const lonRef = 77.4126;

  const fetchLocations = async () => {
    try {
      setError(null);

      const data = await api.getTruckLocations();
      const list = data?.results || data || [];

      setTrucks(list);
    } catch (err) {
      console.error("Error loading truck locations:", err);
      setError("Failed to load live locations.");
      setTrucks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
    const interval = setInterval(fetchLocations, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const projectToMap = (lat, lon) => {
    const x = 50 + (lon - lonRef) * 250;
    const y = 50 - (lat - latRef) * 250;

    return {
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y)),
    };
  };

  if (loading) return <p>Loading live map...</p>;
  if (error)
    return <p className="text-red-600 text-sm">{error}</p>;

  return (
    <div
      className="relative w-full h-60 rounded-xl overflow-hidden shadow-md border border-green-300 bg-green-100"
      style={{
        backgroundImage: `url(${mapImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {trucks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          No truck locations available
        </div>
      )}

      {trucks.map((t) => {
        if (!t.latitude || !t.longitude) return null;

        const pos = projectToMap(t.latitude, t.longitude);

        return (
          <img
            key={t.id || t.truck_id}
            src={pinImg}
            alt={`Truck ${t.truck_id}`}
            className="absolute w-8 drop-shadow-xl transition-all duration-500"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}
