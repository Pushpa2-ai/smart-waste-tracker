import React from 'react';

const features = [
  {
    title: 'Live GPS Tracking',
    emoji: '🗺️',
    description:
      'Real-time location of garbage trucks using Leaflet + GPS API. Click markers for driver details and route view.',
  },
  {
    title: 'Punctual Disposal (AI)',
    emoji: '⏱️',
    description:
      'AI predicts delays and suggests optimized routes. View punctuality score and simulate route optimization.',
  },
  {
    title: 'Location Alerts',
    emoji: '🚨',
    description:
      'Alerts for delays, breakdowns, or traffic. Admin can assign backup trucks and acknowledge alerts.',
  },
  {
    title: 'Driver Conduct',
    emoji: '🧑‍✈️',
    description:
      'Tracks driver behavior, skipped stops, and route compliance. View daily performance and pickup stats.',
  },
  {
    title: 'AI Route Optimization',
    emoji: '🧠',
    description:
      'Future ML model to find fastest, fuel-efficient routes using traffic and pickup data.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">About Our Project</h1>
        <p className="text-lg text-gray-700 mb-10">
          A smart waste management system built for residential areas. We combine real-time tracking, AI-powered route optimization, and driver analytics to ensure efficient garbage collection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 border-l-4 border-green-500"
          >
            <div className="text-4xl mb-4">{feature.emoji}</div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">Crafted with ❤️ by Pushpa</p>
      </div>
    </div>
  );
}