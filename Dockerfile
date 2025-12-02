# Use Python 3.11 slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/wacebackend
ENV DJANGO_SETTINGS_MODULE=wace_api.settings_production

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY wacebackend/requirements.txt /app/wacebackend/
RUN cd wacebackend && pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Create a startup script
RUN echo '#!/bin/bash\n\
cd /app/wacebackend\n\
echo "Starting Django application..."\n\
echo "Running migrations..."\n\
python manage.py migrate --noinput\n\
echo "Collecting static files..."\n\
python manage.py collectstatic --noinput\n\
echo "Starting Gunicorn server on port $PORT..."\n\
exec gunicorn wace_api.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120 --log-level info\n\
' > /app/start.sh && chmod +x /app/start.sh

# Expose port
EXPOSE $PORT

# Run the application
CMD ["/app/start.sh"]