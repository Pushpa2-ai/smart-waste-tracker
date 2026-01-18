import { useEffect, useState } from "react";
import api from "../services/api";

export default function DriverConduct() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Proper API call
      const data = await api.getDriverConduct();

      // Supports paginated + non-paginated response
      const results = data?.results || data || [];
      setDrivers(results);
    } catch (err) {
      console.error("Driver conduct fetch failed:", err);
      setError("Failed to load driver performance data.");
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  if (loading)
    return (
      <p className="text-sm text-gray-500">
        Loading driver performance...
      </p>
    );

  if (error)
    return (
      <p className="text-sm text-red-600">
        {error}
      </p>
    );

  if (!drivers.length)
    return (
      <p className="text-sm text-gray-500">
        No driver data available 🚛
      </p>
    );

  return (
    <div className="space-y-3">
      {drivers.map((d) => (
        <div
          key={d.id}
          className="p-4 border border-gray-100 rounded-xl shadow-sm bg-white hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-800">
              {d.driver_name || "Unknown Driver"}{" "}
              <span className="text-gray-400 text-sm">
                (
                {typeof d.truck === "object"
                  ? d.truck?.truck_id
                  : d.truck || "N/A"}
                )
              </span>
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
              {Number(d.overall_score || 0).toFixed(1)}%
            </span>
          </div>

          <div className="mt-2 grid grid-cols-3 text-sm text-gray-600">
            <div>
              <span className="font-medium text-gray-700">
                Punctuality:
              </span>{" "}
              {Number(d.punctuality_score || 0).toFixed(1)}%
            </div>

            <div>
              <span className="font-medium text-gray-700">
                Route:
              </span>{" "}
              {Number(d.route_adherence_score || 0).toFixed(1)}%
            </div>

            <div>
              <span className="font-medium text-gray-700">
                Stops:
              </span>{" "}
              {Number(d.stop_behavior_score || 0).toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
