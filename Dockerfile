# Use Python 3.11 slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app/wacebackend

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

# Collect static files
RUN cd wacebackend && python manage.py collectstatic --noinput

# Expose port
EXPOSE $PORT

# Run the application
CMD cd wacebackend && python manage.py migrate && gunicorn wace_api.wsgi:application --bind 0.0.0.0:$PORT