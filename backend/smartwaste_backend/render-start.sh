#!/usr/bin/env bash
set -o errexit

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
gunicorn smartwaste_backend.wsgi:application --bind 0.0.0.0:$PORT --workers 1
