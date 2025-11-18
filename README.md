🌱 SmartWaste – AI Powered Waste Management & Garbage Collection Tracker
<p align="center"> <img src="frontend/src/assets/demo.gif" width="800" /> </p>

SmartWaste is an intelligent waste-management platform built to help smart cities, municipalities, and residential societies track garbage trucks, predict delays, optimize routes, and ensure fast & efficient waste disposal.

This project is built using React + Tailwind CSS (Frontend) and Django REST Framework + AI/ML (Backend), featuring real-time tracking, AI predictions, anomaly alerts, and smart routing.

🌟 ✨ Key Features
✅ 1. Live GPS Tracking (Real-Time Map)

Shows live location of garbage trucks

Auto-centers to the user's GPS location

Beautiful green-themed animated map

Smooth truck movement (real + simulated)

Powered by Leaflet + Django API

✅ 2. AI-Based Punctual Disposal Prediction

AI model predicts:

On-Time

Slight Delay

Delayed

Suggests optimal reminder time using:

Historical disposal timings

Traffic simulation

ML scoring

Example:

“Recommended Reminder: 8:12 AM (AI Optimized)”

✅ 3. Driver Conduct Monitoring

Punctuality score

Route adherence

Stop-duration behavior

Auto-generated behavior score using ML-style logic

Shows per-driver performance card

✅ 4. Location Alerts (Emergency / Issue Detection)

Detects trucks inactive for over 60 seconds

Real-time alert cards:

“Truck TRUCK-202 inactive for over 60 seconds 🚨”

Useful for breakdown, fuel stops, or anomalies

✅ 5. AI Route Optimization (Smart Routing)

AI-assisted route ordering

Reports:

Optimized sector sequence

Time saved

Efficiency gain

Fully integrated frontend input → backend output

✅ 6. Issue Reporting Module

Users can report issues such as:

Missed pickups

Overflowing bins

Driver misconduct

Backend stores all reports for admin review.

✅ 7. Modern Dynamic Dashboard

Smooth animations

Sliding side-panels

Soft green UI theme (green-100)

Clean professional card styling

Mobile responsive

🏗️ Tech Stack
🎨 Frontend

React.js

Tailwind CSS

React Router

Leaflet.js

🧠 Backend

Django

Django REST Framework

SQLite3

AI/ML (Python logic + heuristics)

🗺️ Live Map Engine

Leaflet.js

OpenStreetMap

Custom animated map style

GPS auto-detection

⚙️ Other Tools

Postman

Git & GitHub

NPM

Python Virtual Environment

📂 Project Structure
SmartWaste/
│
├── backend/
│   ├── smartwaste_backend/
│   ├── waste/
│   ├── manage.py
│   └── gps_updater.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

📥 How to Clone & Run the Project
🖥️ 1. Clone the Repository
git clone https://github.com/Pushpa2-ai/smart-waste-tracker.git
cd smart-waste-tracker

🛠️ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Backend will run on:
👉 http://127.0.0.1:8000

🎨 Frontend Setup
cd frontend
npm install
npm run dev


Frontend will run on:
👉 http://localhost:5173

🧠 AI & ML Inside SmartWaste
Feature	AI / ML Logic Used
Punctual Disposal	AI prediction + probability scoring
Suggest Time	ML + rule-based optimization
Driver Conduct	Behavioral scoring model
Route Optimization	Heuristic-based path simulation
Alerts	Real-time anomaly detection
🚀 Future Enhancements

🧠 Deep-learning based route prediction

📡 Real hardware-based IoT bin sensors

📊 Admin analytics dashboard

🌤 Weather API integration

🚛 Optimization using OR-Tools

📄 License

MIT License — Free to use and improve.
