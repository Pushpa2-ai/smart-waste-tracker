🌱 SmartWaste – AI Powered Waste Management & Garbage Collection Tracker
```text
🌱 SmartWaste – AI Powered Waste Management & Garbage Collection Tracker
```
<p align="center"> <img src="frontend/src/assets/demo.gif" width="800" /> </p>

SmartWaste is a full-stack, AI-enhanced waste management platform designed to track garbage collection, monitor driver behavior, optimize collection routes, and allow residents to report issues in real-time.
It simulates a real-world smart city waste ecosystem using modern web technologies and cloud-ready architecture.

This project demonstrates production-grade system design, REST API integration, AI simulation workflows, and frontend-backend deployment readiness.

🚀 Key Features

🗺️ Live GPS Tracking

Displays real-time truck locations on an interactive map

Simulates geolocation-based movement and updates

Detects inactive trucks and triggers alerts

🧑‍✈️ Driver Conduct Monitoring

Tracks driver punctuality, route adherence, and stop behavior

Calculates overall performance score dynamically

Ranks drivers based on efficiency and safety metrics

🧠 AI Route Optimization

Accepts a list of sectors and truck ID

Simulates AI-based optimized route generation

Calculates time saved and efficiency gain

⏱️ Punctual Disposal Prediction

Uses AI logic to predict delays in garbage collection

Displays confidence score for predictions

Helps residents prepare for schedule changes

📢 Reports & Complaint Management

📝 Report Dashboard

View all reported issues in a clean, paginated table

Filter reports by:

Status (Pending, In Progress, Resolved)

Issue Type (Overflow, Missed Pickup, Illegal Dumping, Other)

Server-side pagination for scalability

🔄 Live Status Updates

Update report status directly from the UI

Changes persist in the backend via REST API

Reflects real-world municipal workflow simulation

🤖 AI Demo / Simulation Mode

Auto-generates fake reports in real time

Randomly progresses old reports through lifecycle:

Pending → In Progress → Resolved

Runs on a timed backend simulation engine

Designed for live demos and recruiter walkthroughs

🏗️ System Architecture

```text

Frontend (React + Vite + Tailwind)
        |
        | REST API (JSON)
        |
Backend (Django + Django REST Framework)
        |
Database (SQLite / PostgreSQL - Cloud Ready)

```

🏗️ Tech Stack

🎨 Frontend

React (Vite)

Tailwind CSS

React Router

Fetch API

Modular Component Architecture

Leaflet.js

🧠 Backend

Django

Django REST Framework

Django Filters

Pagination (PageNumberPagination)

AI Simulation Engine (Python Logic Layer)

SQLite3

AI (Python logic + heuristics)

⚙️ DevOps & Deployment

GitHub (Version Control)

Render (Backend Hosting)

Vercel (Frontend Hosting)

Environment-Based API Routing

📂 Project Structure

```text
smartwaste/
│
├── backend/
│   ├── smartwaste_backend/
│   ├── waste/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ai_model.py
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/api.js
    │   └── App.jsx
    └── vite.config.js
```
🔌 API Endpoints

📄 Reports

```text
| Method | Endpoint                        | Description                     |
|--------|---------------------------------|---------------------------------|
| GET    | /api/reports/                   | List reports (pagination + filters) |
| POST   | /api/reports/                   | Create new report               |
| PATCH  | /api/reports/{id}/update_status/| Update report status            |
| POST   | /api/reports/simulate/          | Trigger AI demo simulation      |
```

🚮 Disposal

```text
| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | /api/disposals/                 | List disposal records    |
| GET    | /api/disposals/latest/          | Latest disposal          |
| GET    | /api/disposals/{id}/predict/    | AI delay prediction      |
```

🧠 Optimization

```text
| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | /api/optimize-route/  | AI route optimization   |
```

⚙️ Environment Setup

🛠 Backend

cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

🎨 Frontend

cd frontend

npm install

npm run dev

🌐 Deployment (Production Ready)

Backend

Hosted on Render: https://smart-waste-tracker.onrender.com/api

Gunicorn + Whitenoise

Cloud Database Support (PostgreSQL)

Frontend

Hosted on Vercel: https://smart-waste-tracker-vercel-6sqasq6y1.vercel.app/

Environment-based API routing:

VITE_API_BASE=https://smart-waste-tracker.onrender.com/api

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

🤝 Contributing

Feel free to fork this repo, submit pull requests or open issues.

🙌 Author

Pushpa Kumari

👩‍💻 B.Tech (CSE-AIDS) | Full-Stack Developer

🔥 Passionate about building clean UI and scalable backend systems.
