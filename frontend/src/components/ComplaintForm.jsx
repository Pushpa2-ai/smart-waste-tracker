import { useState } from "react";
import api from "../services/api";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    user_name: "",
    email: "",
    location: "",
    issue_type: "other",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await api.createComplaint(form);
      if (!res) throw new Error("Backend rejected request");

      setSuccess(true);
      setForm({
        user_name: "",
        email: "",
        location: "",
        issue_type: "other",
        description: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <h3 className="font-semibold mb-2">Complaint & Feedback</h3>

      <input
        name="user_name"
        value={form.user_name}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full border rounded p-2"
        required
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your email"
        className="w-full border rounded p-2"
        required
      />

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location / Sector"
        className="w-full border rounded p-2"
        required
      />

      <select
        name="issue_type"
        value={form.issue_type}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        <option value="overflow">Overflowing Garbage</option>
        <option value="missed">Missed Pickup</option>
        <option value="illegal">Illegal Dumping</option>
        <option value="other">Other</option>
      </select>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Describe the issue"
        className="w-full border rounded p-2"
        rows={4}
        required
      />

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm">
          Complaint submitted successfully.
        </p>
      )}

      <div className="flex justify-end">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
