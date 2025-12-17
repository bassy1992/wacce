#!/bin/bash
cd wacebackend
python manage.py migrate
python manage.py collectstatic --noinput

# Populate subjects if database is empty (idempotent - won't create duplicates)
echo "Checking and populating subjects..."
python manage.py populate_subjects

gunicorn wace_api.wsgi:application --bind 0.0.0.0:$PORT