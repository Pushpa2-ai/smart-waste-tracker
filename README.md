🌱 SmartWaste – AI Powered Waste Management & Garbage Collection Tracker (Production-Ready & Cloud-Deployed)
<p align="center"> <img src="frontend/src/assets/demo.gif" width="800" /> </p>

SmartWaste is a production-ready, full-stack, AI-enhanced smart city platform designed to digitize and optimize municipal waste operations at scale — enabling real-time (simulated) tracking, intelligent route planning, and citizen-driven issue reporting through a cloud-deployed architecture.

This project demonstrates production-grade system design, REST API integration, AI-driven simulation workflows, cloud deployment workflows, and frontend-backend scalability patterns used in modern SaaS platforms.

🚀 Key Features

🗺️ Live GPS Tracking

Displays real-time (simulated) truck locations on an interactive map

Simulates geolocation-based movement and updates

Detects inactive trucks and triggers alerts

🧑‍✈️ Driver Conduct Monitoring

Tracks driver punctuality, route adherence, and stop behavior

Calculates overall performance score dynamically using weighted scoring logic and backend-driven metrics

Ranks drivers based on efficiency and safety metrics

🧠 AI Route Optimization

Accepts a list of sectors and truck ID

Uses heuristic-based optimization algorithms to simulate intelligent route planning and measure efficiency gains

Calculates time saved and efficiency gain

⏱️ Punctual Disposal Prediction

Uses probabilistic scoring and rule-based prediction logic to estimate delays in garbage collection

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

Deployed on cloud infrastructure with environment-based configuration and CORS-secured API access

```text

Frontend (React + Vite + Tailwind)
        |
        | REST API (JSON)
        |
Backend (Django + Django REST Framework)
        |
Database (PostgreSQL - Cloud Ready)

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

PostgreSQL

AI Simulation & Heuristic Engine (Python)

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
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── waste/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ai_model.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── .env
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```
🔌 API Endpoints

All endpoints are protected with CORS policies and environment-based base URLs for production and development

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

.env

Create a .env file in backend:

SECRET_KEY=your_secret

DEBUG=False

DATABASE_URL=your_db_url

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

Implementation Approach

Punctual Disposal	AI prediction + probability scoring

Suggest Time	ML + rule-based optimization

Driver Conduct	Behavioral scoring model

Route Optimization	Heuristic-based path simulation

Alerts	Real-time anomaly detection

🚀 Future Enhancements

Designed to transition from simulation-based intelligence to production-grade ML pipelines

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

👩‍💻 B.Tech (CSE-AIDS) | Full-Stack Developer(React & Django)

🔥 Focused on building cloud-deployed, API-driven applications with real-world simulation and production-style architecture.
