#!/usr/bin/env python3
"""
WASSCE Remedial Education Platform - Django Backend Setup Script
This script creates a complete Django backend for the WASSCE education platform
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n{'='*50}")
    print(f"RUNNING: {description}")
    print(f"COMMAND: {command}")
    print(f"{'='*50}")
    
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"ERROR: {description} failed")
        print(f"STDOUT: {result.stdout}")
        print(f"STDERR: {result.stderr}")
        return False
    else:
        print(f"SUCCESS: {description} completed")
        if result.stdout:
            print(f"OUTPUT: {result.stdout}")
        return True

def create_django_project():
    """Create Django project structure"""
    
    # Install Django and required packages
    packages = [
        "django>=4.2.0",
        "djangorestframework>=3.14.0",
        "django-cors-headers>=4.0.0",
        "python-decouple>=3.8",
        "django-filter>=23.2",
        "Pillow>=10.0.0",
        "psycopg2-binary>=2.9.6",  # PostgreSQL support
        "celery>=5.3.0",  # For async tasks
        "redis>=4.6.0",  # For caching and Celery broker
        "requests>=2.31.0",  # For MTN Mobile Money API
        "cryptography>=41.0.0",  # For secure payment processing
    ]
    
    print("Installing Django and required packages...")
    for package in packages:
        if not run_command(f"pip install {package}", f"Installing {package}"):
            return False
    
    # Create Django project
    if not run_command("django-admin startproject wassce_backend .", "Creating Django project"):
        return False
    
    # Create Django apps
    apps = ["accounts", "academics", "payments", "api"]
    for app in apps:
        if not run_command(f"cd wassce_backend && python manage.py startapp {app}", f"Creating {app} app"):
            return False
    
    return True

def create_project_files():
    """Create all necessary Django files"""
    
    # Create requirements.txt
    requirements_content = """Django>=4.2.0
djangorestframework>=3.14.0
django-cors-headers>=4.0.0
python-decouple>=3.8
django-filter>=23.2
Pillow>=10.0.0
psycopg2-binary>=2.9.6
celery>=5.3.0
redis>=4.6.0
requests>=2.31.0
cryptography>=41.0.0
gunicorn>=21.2.0
whitenoise>=6.5.0
"""
    
    with open("requirements.txt", "w") as f:
        f.write(requirements_content)
    
    # Create .env file
    env_content = """# Django Settings
DEBUG=True
SECRET_KEY=your-secret-key-here-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0

# Database Settings (PostgreSQL)
DB_NAME=wassce_db
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# Redis Settings
REDIS_URL=redis://localhost:6379/0

# MTN Mobile Money Settings
MTN_API_URL=https://sandbox.momodeveloper.mtn.com
MTN_SUBSCRIPTION_KEY=your_mtn_subscription_key
MTN_API_USER_ID=your_mtn_api_user_id
MTN_API_KEY=your_mtn_api_key

# Email Settings
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_email_password

# Static Files
STATIC_URL=/static/
MEDIA_URL=/media/
"""
    
    with open(".env", "w") as f:
        f.write(env_content)
    
    print("✅ Created requirements.txt and .env files")
    return True

def create_settings():
    """Create Django settings"""
    
    settings_content = """import os
from pathlib import Path
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY', default='django-insecure-change-me')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# Application definition
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'corsheaders',
    'django_filters',
]

LOCAL_APPS = [
    'accounts',
    'academics',
    'payments',
    'api',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'wassce_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'wassce_backend.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='wassce_db'),
        'USER': config('DB_USER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# Redis Cache
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': config('REDIS_URL', default='redis://127.0.0.1:6379/1'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Accra'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
}

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True

# Email Settings
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')

# Celery Configuration
CELERY_BROKER_URL = config('REDIS_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = config('REDIS_URL', default='redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE

# MTN Mobile Money Settings
MTN_API_URL = config('MTN_API_URL', default='https://sandbox.momodeveloper.mtn.com')
MTN_SUBSCRIPTION_KEY = config('MTN_SUBSCRIPTION_KEY', default='')
MTN_API_USER_ID = config('MTN_API_USER_ID', default='')
MTN_API_KEY = config('MTN_API_KEY', default='')

# Custom User Model
AUTH_USER_MODEL = 'accounts.User'

# Security Settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
"""
    
    os.makedirs("wassce_backend/wassce_backend", exist_ok=True)
    with open("wassce_backend/wassce_backend/settings.py", "w") as f:
        f.write(settings_content)
    
    print("✅ Created Django settings.py")
    return True

def create_models():
    """Create Django models"""
    
    # User model
    user_model = """from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex=r'^\\+?1?\\d{9,15}$')]
    )
    whatsapp = models.CharField(
        max_length=15,
        blank=True,
        validators=[RegexValidator(regex=r'^\\+?1?\\d{9,15}$')]
    )
    date_joined = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    region = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_profiles'
    
    def __str__(self):
        return f"{self.user.get_full_name()}'s Profile"
"""
    
    os.makedirs("wassce_backend/accounts", exist_ok=True)
    with open("wassce_backend/accounts/models.py", "w") as f:
        f.write(user_model)
    
    # Academic models
    academic_models = """from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Program(models.Model):
    PROGRAM_CHOICES = [
        ('general-science', 'General Science'),
        ('general-arts', 'General Arts'),
        ('business', 'Business'),
        ('home-economics', 'Home Economics'),
        ('visual-arts', 'Visual Arts'),
        ('agricultural-science', 'Agricultural Science'),
    ]
    
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, unique=True, choices=PROGRAM_CHOICES)
    description = models.TextField()
    duration_months = models.IntegerField(default=12)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=2000.00)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'programs'
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Subject(models.Model):
    SUBJECT_TYPES = [
        ('core', 'Core Subject'),
        ('elective', 'Elective Subject'),
    ]
    
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    subject_type = models.CharField(max_length=20, choices=SUBJECT_TYPES)
    programs = models.ManyToManyField(Program, related_name='subjects')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'subjects'
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.code})"

class StudentEnrollment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('suspended', 'Suspended'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='enrollments')
    subjects = models.ManyToManyField(Subject, related_name='enrollments')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    enrollment_date = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    additional_info = models.TextField(blank=True)
    
    class Meta:
        db_table = 'student_enrollments'
        unique_together = ['user', 'program']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.program.name}"

class Lesson(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField()
    video_url = models.URLField(blank=True)
    duration_minutes = models.IntegerField(default=60)
    order = models.PositiveIntegerField(default=1)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'lessons'
        ordering = ['subject', 'order']
    
    def __str__(self):
        return f"{self.subject.name} - {self.title}"

class Assignment(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField()
    max_score = models.IntegerField(default=100)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'assignments'
    
    def __str__(self):
        return f"{self.lesson.subject.name} - {self.title}"
"""
    
    os.makedirs("wassce_backend/academics", exist_ok=True)
    with open("wassce_backend/academics/models.py", "w") as f:
        f.write(academic_models)
    
    # Payment models
    payment_models = """from django.db import models
from django.contrib.auth import get_user_model
from academics.models import StudentEnrollment

User = get_user_model()

class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('successful', 'Successful'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('mtn_mobile_money', 'MTN Mobile Money'),
        ('vodafone_cash', 'Vodafone Cash'),
        ('airtel_money', 'AirtelTigo Money'),
        ('bank_transfer', 'Bank Transfer'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    enrollment = models.ForeignKey(StudentEnrollment, on_delete=models.CASCADE, related_name='payments')
    reference = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    
    # MTN Mobile Money specific fields
    mobile_money_number = models.CharField(max_length=15, blank=True)
    mobile_money_name = models.CharField(max_length=100, blank=True)
    transaction_id = models.CharField(max_length=100, blank=True)
    
    # Payment metadata
    payment_metadata = models.JSONField(default=dict, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Payment {self.reference} - {self.user.email} - GH₵{self.amount}"

class PaymentCallback(models.Model):
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='callbacks')
    callback_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'payment_callbacks'
    
    def __str__(self):
        return f"Callback for {self.payment.reference}"
"""
    
    os.makedirs("wassce_backend/payments", exist_ok=True)
    with open("wassce_backend/payments/models.py", "w") as f:
        f.write(payment_models)
    
    print("✅ Created all Django models")
    return True

def create_api_views():
    """Create API views"""
    
    # Registration API
    registration_api = """from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils import timezone
import uuid

from accounts.models import UserProfile
from academics.models import Program, StudentEnrollment
from payments.models import Payment
from .serializers import UserRegistrationSerializer, PaymentSerializer
from .utils import MTNMobileMoneyService

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    \"\"\"
    Handle user registration with payment processing
    \"\"\"
    serializer = UserRegistrationSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        with transaction.atomic():
            # Create user
            user_data = serializer.validated_data
            program_code = user_data.pop('program')
            mobile_money_number = user_data.pop('mobile_money_number')
            mobile_money_name = user_data.pop('mobile_money_name')
            additional_info = user_data.pop('additional_info', '')
            
            user = User.objects.create_user(**user_data)
            
            # Create user profile
            UserProfile.objects.create(user=user)
            
            # Get program
            try:
                program = Program.objects.get(code=program_code, is_active=True)
            except Program.DoesNotExist:
                return Response({
                    'success': False,
                    'error': 'Invalid program selected'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create enrollment
            enrollment = StudentEnrollment.objects.create(
                user=user,
                program=program,
                additional_info=additional_info
            )
            
            # Create payment record
            payment_reference = f"PAY_{uuid.uuid4().hex[:10].upper()}"
            payment = Payment.objects.create(
                user=user,
                enrollment=enrollment,
                reference=payment_reference,
                amount=program.price,
                payment_method='mtn_mobile_money',
                mobile_money_number=mobile_money_number,
                mobile_money_name=mobile_money_name,
                status='pending'
            )
            
            # Process MTN Mobile Money payment
            mtn_service = MTNMobileMoneyService()
            payment_result = mtn_service.request_payment(
                amount=str(program.price),
                phone_number=mobile_money_number,
                reference=payment_reference,
                payer_message=f"Payment for {program.name} program",
                payee_note=f"WASSCE Registration - {user.get_full_name()}"
            )
            
            if payment_result['success']:
                payment.transaction_id = payment_result.get('transaction_id')
                payment.status = 'processing'
                payment.payment_metadata = payment_result
                payment.save()
                
                return Response({
                    'success': True,
                    'message': 'Registration successful! Please check your phone for MTN Mobile Money payment prompt.',
                    'payment_reference': payment_reference,
                    'program_id': program.id,
                    'enrollment_id': enrollment.id
                }, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    'success': False,
                    'error': f"Payment processing failed: {payment_result.get('error', 'Unknown error')}"
                }, status=status.HTTP_400_BAD_REQUEST)
                
    except Exception as e:
        return Response({
            'success': False,
            'error': f'Registration failed: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_programs(request):
    \"\"\"
    Get list of available programs
    \"\"\"
    programs = Program.objects.filter(is_active=True)
    program_data = []
    
    for program in programs:
        core_subjects = program.subjects.filter(subject_type='core')
        elective_subjects = program.subjects.filter(subject_type='elective')
        
        program_data.append({
            'id': program.id,
            'name': program.name,
            'code': program.code,
            'description': program.description,
            'price': str(program.price),
            'duration_months': program.duration_months,
            'core_subjects': [{'name': s.name, 'code': s.code} for s in core_subjects],
            'elective_subjects': [{'name': s.name, 'code': s.code} for s in elective_subjects]
        })
    
    return Response({
        'success': True,
        'programs': program_data
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def payment_callback(request):
    \"\"\"
    Handle MTN Mobile Money payment callbacks
    \"\"\"
    try:
        callback_data = request.data
        reference = callback_data.get('externalId')
        
        if not reference:
            return Response({'error': 'No reference provided'}, status=400)
        
        try:
            payment = Payment.objects.get(reference=reference)
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=404)
        
        # Update payment status based on callback
        if callback_data.get('status') == 'SUCCESSFUL':
            payment.status = 'successful'
            payment.paid_at = timezone.now()
            payment.enrollment.status = 'active'
            payment.enrollment.start_date = timezone.now().date()
            payment.enrollment.save()
        elif callback_data.get('status') == 'FAILED':
            payment.status = 'failed'
        
        payment.payment_metadata.update(callback_data)
        payment.save()
        
        # Store callback data
        from payments.models import PaymentCallback
        PaymentCallback.objects.create(
            payment=payment,
            callback_data=callback_data
        )
        
        return Response({'success': True})
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)
"""
    
    os.makedirs("wassce_backend/api", exist_ok=True)
    with open("wassce_backend/api/views.py", "w") as f:
        f.write(registration_api)
    
    # Create serializers
    serializers_content = """from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from academics.models import Program

User = get_user_model()

class UserRegistrationSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(
        max_length=15,
        validators=[RegexValidator(regex=r'^\\+?233\\d{9}$', message="Enter a valid Ghana phone number")]
    )
    whatsapp = serializers.CharField(max_length=15, required=False, allow_blank=True)
    password = serializers.CharField(min_length=6, write_only=True)
    confirm_password = serializers.CharField(min_length=6, write_only=True)
    program = serializers.CharField(max_length=50)
    mobile_money_number = serializers.CharField(
        max_length=15,
        validators=[RegexValidator(
            regex=r'^(024|054|055|059)\\d{7}$', 
            message="Enter a valid MTN Mobile Money number (024, 054, 055, or 059)"
        )]
    )
    mobile_money_name = serializers.CharField(max_length=100)
    additional_info = serializers.CharField(required=False, allow_blank=True)
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        
        # Check if email already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("User with this email already exists")
        
        # Check if program exists
        if not Program.objects.filter(code=data['program'], is_active=True).exists():
            raise serializers.ValidationError("Invalid program selected")
        
        return data
    
    def create(self, validated_data):
        confirmed_password = validated_data.pop('confirm_password')
        full_name = validated_data.pop('full_name')
        
        # Split full name
        name_parts = full_name.strip().split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''
        
        validated_data.update({
            'first_name': first_name,
            'last_name': last_name,
            'username': validated_data['email']  # Use email as username
        })
        
        return validated_data

class PaymentSerializer(serializers.Serializer):
    reference = serializers.CharField(max_length=100)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    mobile_money_number = serializers.CharField(max_length=15)
    mobile_money_name = serializers.CharField(max_length=100)
"""
    
    with open("wassce_backend/api/serializers.py", "w") as f:
        f.write(serializers_content)
    
    # Create MTN Mobile Money service
    mtn_service = """import requests
import uuid
import json
from django.conf import settings
from django.core.cache import cache
import logging

logger = logging.getLogger(__name__)

class MTNMobileMoneyService:
    def __init__(self):
        self.base_url = settings.MTN_API_URL
        self.subscription_key = settings.MTN_SUBSCRIPTION_KEY
        self.api_user_id = settings.MTN_API_USER_ID
        self.api_key = settings.MTN_API_KEY
    
    def get_access_token(self):
        \"\"\"Get OAuth access token for MTN API\"\"\"
        
        # Check cache first
        cached_token = cache.get('mtn_access_token')
        if cached_token:
            return cached_token
        
        url = f"{self.base_url}/collection/token/"
        
        headers = {
            'Authorization': f'Basic {self.api_user_id}:{self.api_key}',
            'Ocp-Apim-Subscription-Key': self.subscription_key,
            'Content-Type': 'application/json'
        }
        
        try:
            response = requests.post(url, headers=headers)
            response.raise_for_status()
            
            token_data = response.json()
            access_token = token_data['access_token']
            expires_in = token_data.get('expires_in', 3600)
            
            # Cache token for 90% of its lifetime
            cache.set('mtn_access_token', access_token, timeout=int(expires_in * 0.9))
            
            return access_token
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to get MTN access token: {e}")
            return None
    
    def request_payment(self, amount, phone_number, reference, payer_message="", payee_note=""):
        \"\"\"Request payment from MTN Mobile Money\"\"\"
        
        access_token = self.get_access_token()
        if not access_token:
            return {'success': False, 'error': 'Failed to get access token'}
        
        # Clean phone number (remove +233 and add 233)
        if phone_number.startswith('+233'):
            phone_number = '233' + phone_number[4:]
        elif phone_number.startswith('0'):
            phone_number = '233' + phone_number[1:]
        elif not phone_number.startswith('233'):
            phone_number = '233' + phone_number
        
        url = f"{self.base_url}/collection/v1_0/requesttopay"
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'X-Reference-Id': str(uuid.uuid4()),
            'X-Target-Environment': 'sandbox',  # Change to 'live' for production
            'Ocp-Apim-Subscription-Key': self.subscription_key,
            'Content-Type': 'application/json'
        }
        
        payload = {
            'amount': amount,
            'currency': 'GHS',
            'externalId': reference,
            'payer': {
                'partyIdType': 'MSISDN',
                'partyId': phone_number
            },
            'payerMessage': payer_message,
            'payeeNote': payee_note
        }
        
        try:
            response = requests.post(url, headers=headers, json=payload)
            
            if response.status_code == 202:
                transaction_id = headers['X-Reference-Id']
                return {
                    'success': True,
                    'transaction_id': transaction_id,
                    'reference': reference,
                    'message': 'Payment request sent successfully'
                }
            else:
                error_data = response.json() if response.content else {}
                return {
                    'success': False,
                    'error': error_data.get('message', 'Payment request failed'),
                    'details': error_data
                }
                
        except requests.exceptions.RequestException as e:
            logger.error(f"MTN Mobile Money API error: {e}")
            return {
                'success': False,
                'error': 'Payment service temporarily unavailable'
            }
    
    def check_payment_status(self, transaction_id):
        \"\"\"Check the status of a payment transaction\"\"\"
        
        access_token = self.get_access_token()
        if not access_token:
            return {'success': False, 'error': 'Failed to get access token'}
        
        url = f"{self.base_url}/collection/v1_0/requesttopay/{transaction_id}"
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'X-Target-Environment': 'sandbox',
            'Ocp-Apim-Subscription-Key': self.subscription_key
        }
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            return {
                'success': True,
                'data': response.json()
            }
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to check payment status: {e}")
            return {
                'success': False,
                'error': 'Failed to check payment status'
            }
"""
    
    with open("wassce_backend/api/utils.py", "w") as f:
        f.write(mtn_service)
    
    print("✅ Created API views, serializers, and MTN service")
    return True

def create_urls():
    """Create URL configurations"""
    
    # Main URLs
    main_urls = """from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/auth/', include('accounts.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
"""
    
    with open("wassce_backend/wassce_backend/urls.py", "w") as f:
        f.write(main_urls)
    
    # API URLs
    api_urls = """from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register_user'),
    path('programs/', views.get_programs, name='get_programs'),
    path('payment/callback/', views.payment_callback, name='payment_callback'),
]
"""
    
    with open("wassce_backend/api/urls.py", "w") as f:
        f.write(api_urls)
    
    # Accounts URLs
    accounts_urls = """from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('login/', obtain_auth_token, name='api_token_auth'),
]
"""
    
    os.makedirs("wassce_backend/accounts", exist_ok=True)
    with open("wassce_backend/accounts/urls.py", "w") as f:
        f.write(accounts_urls)
    
    print("✅ Created URL configurations")
    return True

def create_admin():
    """Create Django admin configurations"""
    
    # Accounts admin
    accounts_admin = """from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'first_name', 'last_name', 'phone', 'is_verified', 'date_joined']
    list_filter = ['is_verified', 'is_staff', 'is_active', 'date_joined']
    search_fields = ['email', 'first_name', 'last_name', 'phone']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('phone', 'whatsapp', 'is_verified')
        }),
    )

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'region', 'created_at']
    list_filter = ['region', 'created_at']
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
"""
    
    with open("wassce_backend/accounts/admin.py", "w") as f:
        f.write(accounts_admin)
    
    # Academics admin
    academics_admin = """from django.contrib import admin
from .models import Program, Subject, StudentEnrollment, Lesson, Assignment

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'price', 'duration_months', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'code']

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'subject_type', 'is_active']
    list_filter = ['subject_type', 'is_active']
    search_fields = ['name', 'code']
    filter_horizontal = ['programs']

@admin.register(StudentEnrollment)
class StudentEnrollmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'program', 'status', 'enrollment_date']
    list_filter = ['status', 'program', 'enrollment_date']
    search_fields = ['user__email', 'user__first_name', 'user__last_name']
    filter_horizontal = ['subjects']

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'order', 'duration_minutes', 'is_published']
    list_filter = ['subject', 'is_published', 'created_at']
    search_fields = ['title', 'subject__name']

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'lesson', 'due_date', 'max_score', 'is_published']
    list_filter = ['lesson__subject', 'is_published', 'due_date']
    search_fields = ['title', 'lesson__title']
"""
    
    with open("wassce_backend/academics/admin.py", "w") as f:
        f.write(academics_admin)
    
    # Payments admin
    payments_admin = """from django.contrib import admin
from .models import Payment, PaymentCallback

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['reference', 'user', 'amount', 'payment_method', 'status', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['reference', 'user__email', 'mobile_money_number']
    readonly_fields = ['reference', 'created_at', 'updated_at']

@admin.register(PaymentCallback)
class PaymentCallbackAdmin(admin.ModelAdmin):
    list_display = ['payment', 'created_at']
    list_filter = ['created_at']
    readonly_fields = ['payment', 'callback_data', 'created_at']
"""
    
    with open("wassce_backend/payments/admin.py", "w") as f:
        f.write(payments_admin)
    
    print("✅ Created Django admin configurations")
    return True

def create_management_commands():
    """Create Django management commands"""
    
    # Create sample data command
    sample_data_command = """from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from academics.models import Program, Subject

User = get_user_model()

class Command(BaseCommand):
    help = 'Create sample data for development'
    
    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create programs
        programs_data = [
            {
                'name': 'General Science',
                'code': 'general-science',
                'description': 'Comprehensive science program covering Biology, Physics, Chemistry and Mathematics',
                'price': 1800.00
            },
            {
                'name': 'General Arts',
                'code': 'general-arts',
                'description': 'Liberal arts program with focus on languages, history and social sciences',
                'price': 1800.00
            },
            {
                'name': 'Business',
                'code': 'business',
                'description': 'Business studies program covering accounting, economics and management',
                'price': 1800.00
            },
            {
                'name': 'Home Economics',
                'code': 'home-economics',
                'description': 'Practical life skills and nutrition program',
                'price': 1800.00
            },
            {
                'name': 'Visual Arts',
                'code': 'visual-arts',
                'description': 'Creative arts program with painting, sculpture and design',
                'price': 1800.00
            },
            {
                'name': 'Agricultural Science',
                'code': 'agricultural-science',
                'description': 'Agricultural and farming sciences program',
                'price': 1800.00
            }
        ]
        
        for program_data in programs_data:
            program, created = Program.objects.get_or_create(
                code=program_data['code'],
                defaults=program_data
            )
            if created:
                self.stdout.write(f'Created program: {program.name}')
        
        # Create subjects
        subjects_data = [
            # Core subjects
            {'name': 'English Language', 'code': 'ENG', 'subject_type': 'core'},
            {'name': 'Mathematics (Core)', 'code': 'MATH_CORE', 'subject_type': 'core'},
            {'name': 'Integrated Science', 'code': 'INT_SCI', 'subject_type': 'core'},
            {'name': 'Social Studies', 'code': 'SOC_STUDIES', 'subject_type': 'core'},
            
            # Science electives
            {'name': 'Biology', 'code': 'BIO', 'subject_type': 'elective'},
            {'name': 'Physics', 'code': 'PHY', 'subject_type': 'elective'},
            {'name': 'Chemistry', 'code': 'CHEM', 'subject_type': 'elective'},
            {'name': 'Elective Mathematics', 'code': 'MATH_ELEC', 'subject_type': 'elective'},
            {'name': 'ICT', 'code': 'ICT', 'subject_type': 'elective'},
            
            # Arts electives
            {'name': 'Literature in English', 'code': 'LIT', 'subject_type': 'elective'},
            {'name': 'History', 'code': 'HIST', 'subject_type': 'elective'},
            {'name': 'Economics', 'code': 'ECON', 'subject_type': 'elective'},
            {'name': 'French', 'code': 'FRENCH', 'subject_type': 'elective'},
            
            # Business electives
            {'name': 'Financial Accounting', 'code': 'FIN_ACC', 'subject_type': 'elective'},
            {'name': 'Business Management', 'code': 'BUS_MGT', 'subject_type': 'elective'},
            {'name': 'Cost Accounting', 'code': 'COST_ACC', 'subject_type': 'elective'},
            
            # Home Economics electives
            {'name': 'Food and Nutrition', 'code': 'FOOD_NUT', 'subject_type': 'elective'},
            {'name': 'Management in Living', 'code': 'MGT_LIVING', 'subject_type': 'elective'},
            {'name': 'Textiles', 'code': 'TEXTILES', 'subject_type': 'elective'},
            
            # Visual Arts electives
            {'name': 'Picture Making', 'code': 'PICTURE', 'subject_type': 'elective'},
            {'name': 'Sculpture', 'code': 'SCULPTURE', 'subject_type': 'elective'},
            {'name': 'Ceramics', 'code': 'CERAMICS', 'subject_type': 'elective'},
            
            # Agricultural Science electives
            {'name': 'General Agriculture', 'code': 'GEN_AGR', 'subject_type': 'elective'},
            {'name': 'Animal Husbandry', 'code': 'ANIMAL_HUS', 'subject_type': 'elective'},
            {'name': 'Agricultural Economics', 'code': 'AGR_ECON', 'subject_type': 'elective'},
        ]
        
        for subject_data in subjects_data:
            subject, created = Subject.objects.get_or_create(
                code=subject_data['code'],
                defaults=subject_data
            )
            if created:
                self.stdout.write(f'Created subject: {subject.name}')
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
"""
    
    os.makedirs("wassce_backend/academics/management", exist_ok=True)
    os.makedirs("wassce_backend/academics/management/commands", exist_ok=True)
    
    # Create __init__.py files
    open("wassce_backend/academics/management/__init__.py", "w").close()
    open("wassce_backend/academics/management/commands/__init__.py", "w").close()
    
    with open("wassce_backend/academics/management/commands/create_sample_data.py", "w") as f:
        f.write(sample_data_command)
    
    print("✅ Created management commands")
    return True

def create_startup_script():
    """Create startup script"""
    
    startup_script = """#!/bin/bash

# WASSCE Backend Startup Script

echo "🚀 Starting WASSCE Backend Setup..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "📚 Installing requirements..."
pip install -r requirements.txt

# Navigate to Django project
cd wassce_backend

# Make migrations
echo "🗄️ Creating database migrations..."
python manage.py makemigrations accounts
python manage.py makemigrations academics
python manage.py makemigrations payments

# Apply migrations
echo "🔄 Applying migrations..."
python manage.py migrate

# Create superuser (optional)
echo "👤 Creating superuser..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@example.com', 'admin123') if not User.objects.filter(username='admin').exists() else None" | python manage.py shell

# Create sample data
echo "📊 Creating sample data..."
python manage.py create_sample_data

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Setup complete!"
echo ""
echo "🌐 To start the development server:"
echo "   cd wassce_backend"
echo "   python manage.py runserver"
echo ""
echo "👨‍💼 Admin interface: http://127.0.0.1:8000/admin/"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "🔗 API Endpoints:"
echo "   POST /api/register/ - User registration"
echo "   GET /api/programs/ - Get programs list"
echo "   POST /api/payment/callback/ - Payment callback"
"""
    
    with open("start_backend.sh", "w") as f:
        f.write(startup_script)
    
    # Make script executable
    os.chmod("start_backend.sh", 0o755)
    
    print("✅ Created startup script")
    return True

def main():
    """Main setup function"""
    print("🎓 WASSCE Backend Django Setup")
    print("=" * 50)
    
    steps = [
        ("Creating project files", create_project_files),
        ("Creating Django settings", create_settings),
        ("Creating Django models", create_models),
        ("Creating API views", create_api_views),
        ("Creating URL configurations", create_urls),
        ("Creating admin configurations", create_admin),
        ("Creating management commands", create_management_commands),
        ("Creating startup script", create_startup_script),
    ]
    
    for description, func in steps:
        print(f"\n🔄 {description}...")
        if not func():
            print(f"❌ Failed: {description}")
            return False
        print(f"✅ Completed: {description}")
    
    print("\n" + "=" * 50)
    print("🎉 DJANGO BACKEND SETUP COMPLETE!")
    print("=" * 50)
    print("\n📋 NEXT STEPS:")
    print("1. Update .env file with your actual configuration values")
    print("2. Install PostgreSQL and Redis")
    print("3. Run: chmod +x start_backend.sh && ./start_backend.sh")
    print("4. Set up MTN Mobile Money API credentials")
    print("5. Configure your frontend to use the new API endpoints")
    print("\n🔗 API BASE URL: http://127.0.0.1:8000/api/")
    print("\n📚 Documentation:")
    print("- Registration: POST /api/register/")
    print("- Programs: GET /api/programs/")
    print("- Payment Callback: POST /api/payment/callback/")
    print("\n💡 Remember to update CORS settings for your frontend URL!")
    
    return True

if __name__ == "__main__":
    main()
