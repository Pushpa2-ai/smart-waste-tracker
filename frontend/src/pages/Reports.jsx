import { useEffect, useState } from "react";
import api from "../services/api";
import ComplaintForm from "../components/ComplaintForm";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  // 🔥 Simulation state
  const [simEnabled, setSimEnabled] = useState(false);
  const [simTicking, setSimTicking] = useState(false);

  const PAGE_SIZE = 5;

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (type) params.append("issue_type", type);
      params.append("page", page);

      const data = await api.getReports(`?${params.toString()}`);
      const list = data?.results || [];

      setReports(list);
      setCount(data?.count || list.length);
    } catch (err) {
      console.error(err);
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on filter/page change
  useEffect(() => {
    fetchReports();
  }, [status, type, page]);

  // 🔥 SINGLE simulation loop (correct)
  useEffect(() => {
    if (!simEnabled) return;

    const interval = setInterval(async () => {
      try {
        setSimTicking(true);
        await api.toggleSimulation(true);
        await fetchReports();
      } catch (err) {
        console.error("Simulation tick failed", err);
      } finally {
        setSimTicking(false);
      }
    }, 8000); // every 8 seconds

    return () => clearInterval(interval);
  }, [simEnabled, status, type, page]);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);

      const updated = await api.updateReportStatus(id, newStatus);
      if (!updated) throw new Error("Update failed");

      setReports((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: updated.status } : r
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleSimulation = async () => {
    try {
      const next = !simEnabled;
      setSimEnabled(next);
      await api.toggleSimulation(next);
    } catch (err) {
      console.error(err);
      alert("Failed to toggle simulation.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          Reports Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            onClick={toggleSimulation}
            className={`px-4 py-2 rounded text-white font-medium transition ${
              simEnabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {simEnabled
              ? simTicking
                ? "Simulating..."
                : "Stop Demo Mode"
              : "Start Demo Mode"}
          </button>

          <button
            onClick={() => setOpenForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + New Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="overflow">Overflow</option>
          <option value="missed">Missed</option>
          <option value="illegal">Illegal</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading reports...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2">Type</th>
                <th className="p-2">Status</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr
                  key={r.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-2">{r.user_name}</td>
                  <td className="p-2">{r.location}</td>
                  <td className="p-2 capitalize">
                    {r.issue_type}
                  </td>

                  <td className="p-2">
                    <select
                      value={r.status}
                      disabled={updatingId === r.id}
                      onChange={(e) =>
                        handleStatusChange(
                          r.id,
                          e.target.value
                        )
                      }
                      className="border p-1 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">
                        In Progress
                      </option>
                      <option value="resolved">
                        Resolved
                      </option>
                    </select>
                  </td>

                  <td className="p-2">
                    {new Date(
                      r.created_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Slide-in Form */}
      {openForm && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={() => setOpenForm(false)}
        >
          <div
            className="bg-white w-96 h-full shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">
                New Report
              </h3>
              <button
                onClick={() => setOpenForm(false)}
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <ComplaintForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
