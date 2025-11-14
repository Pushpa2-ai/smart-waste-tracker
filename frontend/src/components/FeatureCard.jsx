// src/components/FeatureCard.jsx
import React from "react";

export default function FeatureCard({ icon, title, desc, tag, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="card-frame card-3d w-full text-left p-4 flex items-start gap-3 cursor-pointer"
      aria-label={title}
    >
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          {tag && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-green-100 text-green-700 border border-green-200">
              {tag}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </button>
  );
}
