#!/bin/bash
cd wacebackend
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn wace_api.wsgi:application --bind 0.0.0.0:$PORT