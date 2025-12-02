"""
Production settings for Railway deployment
"""
import os
from decouple import config
from .settings import *

# Override settings for production
DEBUG = config('DEBUG', default=False, cast=bool)
SECRET_KEY = config('SECRET_KEY', default='django-insecure-change-me-in-production')

# Railway provides DATABASE_URL automatically for PostgreSQL
if 'DATABASE_URL' in os.environ:
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
    }
else:
    # Fallback to SQLite for development
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Allowed hosts for Railway
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    '.railway.app',  # Railway domains
    '*',  # Allow all hosts for now (Railway will handle routing)
]

# Add Railway-specific hosts if available
railway_url = config('RAILWAY_STATIC_URL', default='')
railway_domain = config('RAILWAY_PUBLIC_DOMAIN', default='')

if railway_url:
    ALLOWED_HOSTS.append(railway_url.replace('https://', '').replace('http://', ''))
if railway_domain:
    ALLOWED_HOSTS.append(railway_domain)

# Remove empty strings from ALLOWED_HOSTS
ALLOWED_HOSTS = [host for host in ALLOWED_HOSTS if host]

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    "https://wacefront.vercel.app",  # Your Vercel frontend
    "http://localhost:3000",  # Local development
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    config('FRONTEND_URL', default=''),
]

# Remove empty strings
CORS_ALLOWED_ORIGINS = [origin for origin in CORS_ALLOWED_ORIGINS if origin]

# CSRF trusted origins
CSRF_TRUSTED_ORIGINS = [
    "https://wacefront.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    config('FRONTEND_URL', default=''),
]

# Remove empty strings
CSRF_TRUSTED_ORIGINS = [origin for origin in CSRF_TRUSTED_ORIGINS if origin]

# Disable CORS_ALLOW_ALL_ORIGINS in production
CORS_ALLOW_ALL_ORIGINS = False

# Static files with WhiteNoise
if 'whitenoise.middleware.WhiteNoiseMiddleware' not in MIDDLEWARE:
    MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Disable HTTPS redirect for Railway health checks
if config('RAILWAY_ENVIRONMENT', default='') == 'production':
    SECURE_SSL_REDIRECT = False

# Security settings for production
if not DEBUG:
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    
    # Only enable these if using HTTPS
    if config('USE_HTTPS', default=True, cast=bool):
        SECURE_SSL_REDIRECT = True
        SESSION_COOKIE_SECURE = True
        CSRF_COOKIE_SECURE = True

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': config('DJANGO_LOG_LEVEL', default='INFO'),
            'propagate': False,
        },
    },
}