import { useState } from "react";
import api from "../services/api";

export default function RouteOptimizer() {
  const [truckId, setTruckId] = useState();
  const [sectorsInput, setSectorsInput] = useState();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const optimize = async (e) => {
    e.preventDefault();
    setError(null);

    const sectors = sectorsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!truckId || sectors.length === 0) {
      setError("Provide truck id and at least one sector.");
      return;
    }

    try {
      setLoading(true);

      const data = await api.optimizeRoute({
        truck_id: truckId,
        sectors,
      });

      if (!data) throw new Error("Backend error");

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to optimize route.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sw-card p-6 bg-white rounded-xl border">
      <h1 className="text-2xl font-semibold mb-4">
        AI Route Optimization
      </h1>

      <form onSubmit={optimize} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Truck ID
          </label>
          <input
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
            className="mt-1 w-full border rounded-md p-2"
            placeholder="TRUCK-101"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sectors (comma separated)
          </label>
          <input
            value={sectorsInput}
            onChange={(e) => setSectorsInput(e.target.value)}
            className="mt-1 w-full border rounded-md p-2"
            placeholder="Sector 1, Sector 3, Sector 5"
            required
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-green-100 hover:bg-green-200 text-black font-semibold shadow-md disabled:opacity-60"
        >
          {loading ? "Optimizing..." : "Optimize Route"}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-lg border p-4 bg-green-50">
          <h2 className="font-semibold text-green-800 mb-2">
            Result
          </h2>
          <p>
            <span className="font-medium">Truck:</span>{" "}
            {result.truck_id}
          </p>
          <p>
            <span className="font-medium">Original Sectors:</span>{" "}
            {result.sectors?.join(", ")}
          </p>
          <p>
            <span className="font-medium">Optimized Route:</span>{" "}
            {result.optimized_route?.join(" → ")}
          </p>
          <p>
            <span className="font-medium">Time Saved:</span>{" "}
            {result.time_saved} mins
          </p>
          <p>
            <span className="font-medium">Efficiency Gain:</span>{" "}
            {result.efficiency_gain}%
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Created:{" "}
            {result.created_at
              ? new Date(result.created_at).toLocaleString()
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
