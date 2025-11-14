import { useState } from "react";
import api from "../services/api";

export default function PickupForm() {
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // mock: POST to backend
      await api.createPickupRequest({ user_id: 1, address: "Sector 12, Apt 101", description: desc });
      alert("Pickup request submitted (mock).");
      setDesc("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Report Missed Pickup / Request Extra Pickup</h3>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Describe the issue (e.g., 'Truck didn't come today at 8 AM')"
        className="w-full border rounded p-2"
        rows={4}
      />
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="bg-amber-500 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
