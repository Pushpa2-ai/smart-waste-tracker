import { useState } from "react";
import api from "../services/api";

export default function ComplaintForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createComplaint({ user_id: 1, text });
      alert("Complaint submitted (mock).");
      setText("");
    } catch (err) {
      console.error(err);
      alert("Error sending complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Complaint & Feedback</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your complaint or feedback"
        className="w-full border rounded p-2"
        rows={4}
      />
      <div className="mt-3 flex justify-end">
        <button className="bg-green-600 text-black px-4 py-2 rounded" disabled={loading}>
          Submit
        </button>
      </div>
    </form>
  );
}
