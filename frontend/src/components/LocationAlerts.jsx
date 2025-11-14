import React, { useEffect, useState } from "react";

export default function LocationAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = () => {
    fetch("http://127.0.0.1:8000/api/truck-locations/")
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();

        const detected = data
          .filter((t) => {
            const updatedAt = new Date(t.updated_at);
            const diffSeconds = (now - updatedAt) / 1000;
            // 🚨 Alert if truck hasn’t updated for over 60 seconds
            return diffSeconds > 60;
          })
          .map((t) => ({
            id: t.id,
            message: `Truck ${t.truck_id} inactive for over 1 min`,
            time: new Date(t.updated_at).toLocaleTimeString(),
          }));

        setAlerts(detected);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAlerts(); // initial fetch
    const interval = setInterval(fetchAlerts, 10000); // refresh every 10s
    return () => clearInterval(interval); // cleanup
  }, []);

  if (loading) return <p>Loading alerts...</p>;

  return (
    <div className="space-y-3">
      {alerts.length === 0 ? (
        <div className="text-gray-500 text-sm">No active alerts 🚀</div>
      ) : (
        alerts.map((a) => (
          <div
            key={a.id}
            className="p-3 border border-red-100 bg-red-50 rounded-lg"
          >
            <p className="text-red-700 font-medium">{a.message}</p>
            <p className="text-xs text-gray-400 mt-1">{a.time}</p>
          </div>
        ))
      )}
    </div>
  );
}
