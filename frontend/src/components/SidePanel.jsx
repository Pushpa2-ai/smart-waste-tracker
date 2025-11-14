// src/components/SidePanel.jsx
import React from "react";

export default function SidePanel({ open, onClose, title, content }) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Slide Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-green-100 shadow-2xl p-6 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 text-sm">{content}</p>

        <button
          onClick={onClose}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:opacity-90"
        >
          Close
        </button>
      </div>
    </>
  );
}
