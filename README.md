🌱 SmartWaste – AI Powered Waste Management & Garbage Collection Tracker

SmartWaste is an AI-driven waste management system designed to help municipalities, housing societies, and smart cities monitor waste trucks, predict delays, optimize routes, and ensure efficient garbage collection.
Built using React + Tailwind (Frontend) and Django REST Framework + AI/ML (Backend), the system provides real-time tracking, AI predictions, and smart alerts.
📽️ Dashboard Demo

![Dashboard Demo](frontend/src/assets/demo.gif)


🌟 ✨ Key Features

✅ 1. Live GPS Tracking (Real-Time Map)

Shows current location of garbage trucks in real time

Detects user’s GPS and centers the map on user's city

Uses a green-themed custom animated map

Smooth live markers & animated truck movement

Powered by Leaflet + Django API

✅ 2. AI-Based Punctual Disposal Prediction

AI model predicts whether a truck will arrive on time, slightly delayed, or delayed

Suggests optimal reminder time based on:

Historical disposal timings

Traffic pattern simulation

Weather (optional future integration)

Users get smart suggestions like:

“Recommended Reminder: 8:12 AM (AI Optimized)”

✅ 3. Driver Conduct Monitoring

Tracks driver punctuality, route adherence, and stop duration

Automatically generates driver behavior scores

Trend-based scoring using a light ML algorithm

Helps ensure safe & efficient operations

✅ 4. Location Alerts (Emergency / Delay Detection)

Detects trucks that have not updated their GPS for more than 1 minute

Raises automatic alerts:

“Truck TRUCK-202 inactive for over 60 seconds”

Real-time anomaly detection

Perfect for monitoring breakdowns or long halts

✅ 5. AI Route Optimization (Smart Routing)

Suggests optimized routes for waste collection

Uses heuristics + randomness to simulate real optimization

Shows:

New optimized sector order

Time saved

Efficiency gained

Fully integrated frontend + backend

✅ 6. Report Issue Module

Users can report issues such as:

Missed pickups

Overflowing bins

Driver behavior issues

Reports are stored in the backend for admin review.

✅ 7. Dynamic Dashboard

Clean UI with soft green theme (green-100)

React-based side panel for each feature

Smooth animations and modern card styling

Mobile friendly

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

Python AI/ML logic

🗺 Live Map

Leaflet.js + OpenStreetMap

Custom animated green theme

User GPS integration

⚙️ Other Tools

Postman for API testing

Git & GitHub

NPM + Python venv

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

1️⃣ Clone the Repository

git clone https://github.com/Pushpa2-ai/smartwaste.git

cd smartwaste

📌 Backend Setup

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

📌 Frontend Setup

cd frontend

npm install

npm start

🧠 AI & ML Inside SmartWaste

Feature	AI/ML Used

Punctual Disposal	AI prediction + ML-based probability scoring
Suggest Time	ML + rule-based model
Driver Conduct	Behavioral scoring model
Route Optimization	Heuristic-based path simulation
Alerts	Anomaly detection  
