import React, { useEffect, useState } from "react";

export default function PunctualDisposal() {
  const [disposal, setDisposal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: Fetch latest disposal
    const fetchLatestDisposal = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/disposals/");
        const data = await res.json();

        if (data.length > 0) {
          const latest = data[data.length - 1]; // pick last record
          // Step 2: Fetch AI prediction for latest disposal
          const predictRes = await fetch(
            `http://127.0.0.1:8000/api/disposals/${latest.id}/predict/`
          );
          const predictData = await predictRes.json();
          setDisposal(predictData);
        }
      } catch (err) {
        console.error("Error fetching disposal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestDisposal();
  }, []);

  if (loading) return <p>Loading prediction...</p>;

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
          <strong>Predicted:</strong> {disposal.predicted_status}
        </p>
        <p>
          <strong>Confidence:</strong>{" "}
          {(disposal.confidence * 100).toFixed(1)}%
        </p>
      </div>
    </div>
  );
}
