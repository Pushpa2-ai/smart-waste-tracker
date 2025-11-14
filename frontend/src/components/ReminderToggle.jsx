import React, { useState } from "react";
import api from "../services/api";

export default function ReminderToggle({ userId = 1 }) {
  const [enabled, setEnabled] = useState(true);
  const [suggest, setSuggest] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggle = () => setEnabled((s) => !s);

  const fetchSuggestion = async () => {
    setLoading(true);
    try {
      const res = await api.predictNotificationTime({ user_id: userId, candidate_times: [] });
      setSuggest(res);
    } catch (err) {
      console.error(err);
      alert("Failed to get suggestion (mock).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`toggle ${enabled ? "on" : ""}`} onClick={toggle} role="button">
            <div className="knob" />
          </div>
          <div className="text-sm font-medium">AI Smart Reminder</div>
        </div>
        <button
          onClick={fetchSuggestion}
          className="text-sm text-sw-green underline"
          disabled={loading}
        >
          {loading ? "Suggesting..." : "Suggest time"}
        </button>
      </div>

      {suggest && (
        <div className="text-sm text-gray-600">
          Suggested: <span className="font-medium">{new Date(suggest.best_time).toLocaleTimeString()}</span> via <span className="font-medium">{suggest.channel}</span>
        </div>
      )}
    </div>
  );
}
