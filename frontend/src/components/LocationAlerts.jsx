import { useEffect, useState } from "react";
import api from "../services/api";

export default function LocationAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = async () => {
    try {
      setError(null);

      // Call backend via central API service
      const data = await api.getTruckLocations();

      // Handle paginated or non-paginated responses
      const trucks = data?.results || data || [];

      const now = new Date();

      const detected = trucks
        .filter((t) => {
          if (!t.updated_at) return false;
          const updatedAt = new Date(t.updated_at);
          const diffSeconds = (now - updatedAt) / 1000;
          // 🚨 Alert if truck hasn’t updated for over 60 seconds
          return diffSeconds > 60;
        })
        .map((t) => ({
          id: t.id || t.truck_id,
          message: `Truck ${t.truck_id} inactive for over 1 min`,
          time: t.updated_at
            ? new Date(t.updated_at).toLocaleTimeString()
            : "Unknown time",
        }));

      setAlerts(detected);
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setError("Failed to load alerts.");
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts(); // initial fetch
    const interval = setInterval(fetchAlerts, 10000); // refresh every 10s
    return () => clearInterval(interval); // cleanup
  }, []);

  if (loading) return <p>Loading alerts...</p>;
  if (error)
    return <p className="text-red-600 text-sm">{error}</p>;

  return (
    <div className="space-y-3">
      {alerts.length === 0 ? (
        <div className="text-gray-500 text-sm">
          No active alerts 🚀
        </div>
      ) : (
        alerts.map((a) => (
          <div
            key={a.id}
            className="p-3 border border-red-100 bg-red-50 rounded-lg"
          >
            <p className="text-red-700 font-medium">{a.message}</p>
            <p className="text-xs text-gray-400 mt-1">
              {a.time}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
