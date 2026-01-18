import { useState } from "react";
import api from "../services/api";

export default function PickupForm() {
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        user_name: "Anonymous",
        email: "user@example.com",
        location: "Sector 12, Apt 101",
        issue_type: "missed",
        description: desc,
      };

      const res = await api.createComplaint(payload);

      if (!res) throw new Error("Backend rejected request");

      alert("Pickup request submitted successfully.");
      setDesc("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit pickup request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">
        Report Missed Pickup / Request Extra Pickup
      </h3>

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Describe the issue (e.g., 'Truck didn't come today at 8 AM')"
        className="w-full border rounded p-2"
        rows={4}
        required
      />

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="bg-amber-500 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
