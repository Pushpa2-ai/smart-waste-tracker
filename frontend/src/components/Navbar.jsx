import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-green-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Left - Logo */}
        <div className="text-xl font-bold text-green-700 select-none">
          SmartWaste
        </div>

        {/* Right - Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-green-700 font-medium transition no-underline"

          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-green-700 no-underline font-medium transition"
          >
            About
          </Link>

          <Link
            to="/settings"
            className="text-gray-700 hover:text-green-700 font-medium transition no-underline"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}
