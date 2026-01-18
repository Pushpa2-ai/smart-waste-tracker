import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

import LiveMap from "../components/LiveMap";
import FeatureCard from "../components/FeatureCard";
import DriverConduct from "../components/DriverConduct";
import PunctualDisposal from "../components/PunctualDisposal";
import ReminderToggle from "../components/ReminderToggle";
import LocationAlerts from "../components/LocationAlerts";
import ComplaintForm from "../components/ComplaintForm";


const IconDriver = () => <span>🧑‍✈️</span>;
const IconTrash = () => <span>🗑️</span>;
const IconAlert = () => <span>🚨</span>;
const IconAI = () => <span>⚙️</span>;
const IconIssue = () => <span>📢</span>;

export default function Home() {
  const navigate = useNavigate();

  // Slide-in panel state
  const [openPanel, setOpenPanel] = useState(null);


  // Schedule + AI suggestion
  const [scheduledText, setScheduledText] = useState("Wed 8:30 AM");
  const [suggestedText, setSuggestedText] = useState(null);

  // Handle feature card clicks
  const handleCardClick = (title) => {
    if (title === "AI Route Optimization") {
      navigate("/optimize");
      return;
    }
    setOpenPanel(title);
  };
  const closePanel = () => setOpenPanel(null);


  // AI: Suggest Time flow
  const suggestTime = async () => {
    try {
      const latest = await fetch(`${API_BASE}/disposals/latest/`).then((r) => r.json());
      if (!latest?.id) {
        alert("No latest disposal record found.");
        return;
      }
      const pred = await fetch(`${API_BASE}/disposals/${latest.id}/predict/`).then((r) =>
        r.json()
      );

      const sched = new Date(latest.scheduled_time);
      if (isNaN(sched)) {
        alert("Invalid scheduled time in latest record.");
        return;
      }

      // If delay predicted → +15m, else −10m
      const status = (pred.predicted_status || "").toLowerCase();
      const rec = status.includes("delay")
        ? new Date(sched.getTime() + 15 * 60 * 1000)
        : new Date(sched.getTime() - 10 * 60 * 1000);

      setScheduledText(
        sched.toLocaleString(undefined, {
          weekday: "short",
          hour: "numeric",
          minute: "2-digit",
        })
      );
      setSuggestedText(
        rec.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
      );
    } catch (err) {
      alert("Could not get AI suggestion.");
      console.error(err);
    }
  };

  // Panel content renderer
  const renderPanelContent = () => {
    switch (openPanel) {
      case "Driver Conduct":
        return (
          <>
            <p className="mb-4">
              AI monitors driver punctuality, route adherence, and safety metrics.
            </p>
            <DriverConduct />
          </>
        );
      case "Punctual Disposal":
        return <PunctualDisposal />;
      case "Location Alerts":
        return (
          <>
            <p>Real-time alerts for emergency stops or unexpected delays.</p>
            <div className="mt-4">
              <LocationAlerts />
            </div>
          </>
        );
      case "Report Issue":
        return <ComplaintForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-green-100">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* LEFT: Map + schedule */}
        <div className="col-span-12 lg:col-span-7">
          <div className="card-frame card-3d p-6">
            <h2 className="text-2xl font-semibold mb-4">Live GPS Tracking</h2>

            <LiveMap />

            {/* Suggest Time button (top-right, styled) */}
            

            {/* Next pickup + suggested */}
            <div className="mt-4">
              <div className="text-sm text-gray-500">Next pickup time</div>
              <div className="text-2xl font-bold text-gray-800 mt-1">
                {scheduledText}
              </div>
              {suggestedText && (
                <p className="mt-1 text-sm text-gray-600">
                  Suggested:{" "}
                  <span className="font-semibold text-green-700">
                    {suggestedText}
                  </span>
                </p>
              )}
            </div>

            {/* Reminder toggle */}
            <div className="mt-4">
              <ReminderToggle />
            </div>

            {/* Track Now (full width) */}
            <div className="mt-6">
              <button
                onClick={() => navigate("/map")}
                className="w-full py-3 rounded-lg bg-green-100 hover:bg-green-200 transition text-black font-semibold shadow-md text-lg"
              >
                Track Now
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Feature cards */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <FeatureCard
            icon={<IconDriver />}
            title="Driver Conduct"
            desc="Tracks driver's punctuality & behavior"
            onClick={() => handleCardClick("Driver Conduct")}
          />
          <FeatureCard
            icon={<IconTrash />}
            title="Punctual Disposal"
            desc="Confirms timely waste pickup using AI predictions"
            tag="AI"
            onClick={() => handleCardClick("Punctual Disposal")}
          />
          <FeatureCard
            icon={<IconAlert />}
            title="Location Alerts"
            desc="Sends emergency and delay notifications"
            onClick={() => handleCardClick("Location Alerts")}
          />
          <FeatureCard
            icon={<IconAI />}
            title="AI Route Optimization"
            desc="Predicts fastest route and adjusts schedules"
            tag="AI"
            onClick={() => handleCardClick("AI Route Optimization")}
          />
          <FeatureCard
            icon={<IconIssue />}
            title="Report Issue"
            desc="Report problems like missed pickups or overflowing bins"
            onClick={() => handleCardClick("Report Issue")}
          />
        </div>
      </div>

      {/* Slide-in Side Panel */}
      {openPanel && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-end z-50"
          onClick={closePanel}
        >
          <div
            className="bg-white w-96 h-full shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">{openPanel}</h3>
              <button onClick={closePanel} className="text-xl">✕</button>
            </div>
            <div className="mt-4 text-gray-700">{renderPanelContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
