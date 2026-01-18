import React, { useState } from 'react';
import { FiMail, FiBell } from 'react-icons/fi';

export default function Settings() {
  const [email, setEmail] = useState('username@example.com');
  const [smartReminders, setSmartReminders] = useState(true);

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-50 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-green-800 mb-8 tracking-wide">⚙️ SmartWaste Settings</h1>

      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 hover:shadow-2xl">
        <div className="flex items-center space-x-3">
          <FiMail className="text-green-600 text-xl" />
          <label className="text-sm font-semibold text-gray-700">Notification Email</label>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="flex items-start space-x-3 mt-4">
          <input
            type="checkbox"
            checked={smartReminders}
            onChange={() => setSmartReminders(!smartReminders)}
            className="mt-1 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <div>
            <div className="flex items-center space-x-2">
              <FiBell className="text-green-600 text-lg" />
              <label className="text-sm font-semibold text-gray-800">Smart Reminders (AI)</label>
            </div>
            <p className="text-xs text-gray-500 ml-1">Let the system pick the best time to remind you.</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-100 hover:bg-green-200 text-black font-semibold py-2 rounded-lg transition duration-200"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}