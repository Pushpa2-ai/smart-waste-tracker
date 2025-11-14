import React, { useEffect, useState } from "react";

export default function DriverConduct() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/driver-conduct/")
      .then((res) => res.json())
      .then((data) => {
        setDrivers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching driver conduct:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading driver performance...</p>;

  if (drivers.length === 0)
    return <p className="text-gray-500 text-sm">No driver data available 🚛</p>;

  return (
    <div className="space-y-3">
      {drivers.map((d) => (
        <div
          key={d.id}
          className="p-4 border border-gray-100 rounded-xl shadow-sm bg-white hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">
              {d.driver_name} <span className="text-gray-400 text-sm">({d.truck.truck_id})</span>
            </h3>
            <span
              className={`font-semibold ${
                d.overall_score > 80
                  ? "text-green-600"
                  : d.overall_score > 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {d.overall_score.toFixed(1)}%
            </span>
          </div>

          <div className="mt-2 grid grid-cols-3 text-sm text-gray-600">
            <div>
              <span className="font-medium text-gray-700">Punctuality:</span> {d.punctuality_score.toFixed(1)}%
            </div>
            <div>
              <span className="font-medium text-gray-700">Route:</span> {d.route_adherence_score.toFixed(1)}%
            </div>
            <div>
              <span className="font-medium text-gray-700">Stops:</span> {d.stop_behavior_score.toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
