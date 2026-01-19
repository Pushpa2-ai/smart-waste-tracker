#!/usr/bin/env bash
set -o errexit

echo "Running migrations..."
python backend/smartwaste_backend/manage.py migrate --noinput

echo "Collecting static files..."
python backend/smartwaste_backend/manage.py collectstatic --noinput

echo "Starting server..."
gunicorn smartwaste_backend.wsgi:application --bind 0.0.0.0:$PORT
