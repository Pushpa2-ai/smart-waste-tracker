import { useEffect, useState } from "react";
import api from "../services/api";

export default function PunctualDisposal() {
  const [disposal, setDisposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestDisposal = async () => {
      try {
        setError(null);

        // Get disposals (paginated-safe)
        const data = await api.getDisposals("?page=1");

        const list = data?.results || data || [];

        if (list.length === 0) {
          setDisposal(null);
          return;
        }

        // Backend is ordered by -scheduled_time, so first item is latest
        const latest = list[0];

        // Call AI prediction endpoint
        const predicted = await api.request
          ? api.request(`/api/disposals/${latest.id}/predict/`)
          : fetch(
              (import.meta.env.VITE_API_BASE || "http://localhost:8000") +
                `/api/disposals/${latest.id}/predict/`
            ).then((r) => r.json());

        setDisposal(predicted);
      } catch (err) {
        console.error("Error fetching disposal:", err);
        setError("Failed to load AI prediction.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestDisposal();
  }, []);

  if (loading) return <p>Loading prediction...</p>;
  if (error)
    return <p className="text-red-600 text-sm">{error}</p>;

  if (!disposal)
    return (
      <div className="text-gray-500 text-sm">
        No disposal data available.
      </div>
    );

  return (
    <div className="space-y-3">
      <p className="text-gray-700">
        AI analyzes pickup times and predicts possible delays using past data,
        traffic, and weather.
      </p>

      <div className="border border-gray-200 p-3 rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">
          Truck {disposal.truck_id}
        </h3>
        <p>
          <strong>Sector:</strong> {disposal.sector}
        </p>
        <p>
          <strong>Scheduled Time:</strong>{" "}
          {new Date(disposal.scheduled_time).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {disposal.status}
        </p>
        <p>
          <strong>Predicted:</strong>{" "}
          {disposal.predicted_status || "N/A"}
        </p>
        <p>
          <strong>Confidence:</strong>{" "}
          {disposal.confidence
            ? `${(disposal.confidence * 100).toFixed(1)}%`
            : "N/A"}
        </p>
      </div>
    </div>
  );
}
