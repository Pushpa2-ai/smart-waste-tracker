import { useEffect, useState } from "react";
import api from "../services/api";

const STORAGE_KEY = "smartwaste_reminder_enabled";

export default function ReminderToggle({ userId = 1 }) {
  const [enabled, setEnabled] = useState(true);
  const [suggest, setSuggest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setEnabled(saved === "true");
    }
  }, []);

  // Persist preference whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, enabled.toString());
  }, [enabled]);

  const toggle = () => {
    setEnabled((s) => !s);
    setSuggest(null);
    setError(null);
  };

  const fetchSuggestion = async () => {
    if (!enabled) {
      setError("Enable reminders to get AI suggestions.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.predictNotificationTime({
        user_id: userId,
        candidate_times: [],
      });

      if (!res) throw new Error("AI service unavailable");

      setSuggest(res);
    } catch (err) {
      console.error(err);
      setError("Failed to get AI suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className={`toggle ${enabled ? "on" : ""}`}
            aria-pressed={enabled}
          >
            <div className="knob" />
          </button>
          <div className="text-sm font-medium">
            AI Smart Reminder
          </div>
        </div>

        <button
          onClick={fetchSuggestion}
          className="text-sm text-sw-green underline disabled:opacity-60"
          disabled={loading || !enabled}
        >
          {loading ? "Suggesting..." : "Suggest time"}
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {suggest && (
        <div className="text-sm text-gray-600">
          Suggested:{" "}
          <span className="font-medium">
            {new Date(suggest.best_time).toLocaleTimeString()}
          </span>{" "}
          via{" "}
          <span className="font-medium">
            {suggest.channel}
          </span>
        </div>
      )}
    </div>
  );
}
