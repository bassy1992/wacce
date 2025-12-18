from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from students.models import Programme, Student
import json
import re


@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    """User registration endpoint"""
    try:
        data = json.loads(request.body)
        print(f"DEBUG: Received signup data: {data}")
        
        # Required fields
        required_fields = ['username', 'email', 'password', 'first_name', 'last_name', 
                          'phone_number', 'date_of_birth', 'programme_id', 'previous_school', 
                          'wassce_year', 'index_number']
        
        # Check for missing fields
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            print(f"DEBUG: Missing fields: {missing_fields}")
            return JsonResponse({
                'error': 'Missing required fields',
                'missing_fields': missing_fields
            }, status=400)
        
        # Extract data
        username = data['username'].strip()
        email = data['email'].strip().lower()
        password = data['password']
        first_name = data['first_name'].strip()
        last_name = data['last_name'].strip()
        phone_number = data['phone_number'].strip()
        date_of_birth = data['date_of_birth']
        programme_id = data['programme_id']
        previous_school = data['previous_school'].strip()
        wassce_year = data['wassce_year']
        index_number = data['index_number'].strip()
        
        # Validation
        errors = {}
        
        # Username validation
        if len(username) < 3:
            errors['username'] = 'Username must be at least 3 characters long'
        elif User.objects.filter(username=username).exists():
            errors['username'] = 'Username already exists'
        
        # Email validation
        try:
            validate_email(email)
            if User.objects.filter(email=email).exists():
                errors['email'] = 'Email already registered'
        except ValidationError:
            errors['email'] = 'Invalid email format'
        
        # Password validation
        if len(password) < 8:
            errors['password'] = 'Password must be at least 8 characters long'
        elif not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password):
            errors['password'] = 'Password must contain both letters and numbers'
        
        # Phone number validation
        if not re.match(r'^\+?[\d\s\-\(\)]{10,15}$', phone_number):
            errors['phone_number'] = 'Invalid phone number format'
        
        # Programme validation
        try:
            programme = Programme.objects.get(id=programme_id)
        except Programme.DoesNotExist:
            errors['programme_id'] = 'Invalid programme selected'
        
        # WASSCE year validation
        try:
            wassce_year = int(wassce_year)
            if wassce_year < 2000 or wassce_year > 2030:
                errors['wassce_year'] = 'Invalid WASSCE year'
        except (ValueError, TypeError):
            errors['wassce_year'] = 'WASSCE year must be a valid number'
        
        # Index number validation
        if Student.objects.filter(index_number=index_number).exists():
            errors['index_number'] = 'Index number already registered'
        
        if errors:
            return JsonResponse({'errors': errors}, status=400)
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        # Create student profile
        student = Student.objects.create(
            user=user,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
            programme=programme,
            previous_school=previous_school,
            wassce_year=wassce_year,
            index_number=index_number
        )
        
        # Auto-login the user
        login(request, user)
        
        return JsonResponse({
            'message': 'Registration successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'programme': programme.get_name_display(),
                'student_id': student.id
            }
        }, status=201)
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def signin(request):
    """User login endpoint"""
    try:
        data = json.loads(request.body)
        
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return JsonResponse({
                'error': 'Username and password are required'
            }, status=400)
        
        # Try to authenticate with username or email
        user = authenticate(request, username=username, password=password)
        
        if not user:
            # Try with email if username authentication failed
            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass
        
        if user:
            if user.is_active:
                login(request, user)
                
                # Create or get auth token for iOS/Safari compatibility
                from rest_framework.authtoken.models import Token
                token, created = Token.objects.get_or_create(user=user)
                
                # Get student profile if exists
                student_data = None
                try:
                    student = Student.objects.select_related('programme').get(user=user)
                    student_data = {
                        'id': student.id,
                        'phone_number': student.phone_number,
                        'date_of_birth': student.date_of_birth.isoformat(),
                        'programme': {
                            'id': student.programme.id,
                            'name': student.programme.name,
                            'price': float(student.programme.price)
                        },
                        'enrollment_date': student.enrollment_date.isoformat(),
                        'is_active': student.is_active,
                        'previous_school': student.previous_school,
                        'wassce_year': student.wassce_year,
                        'index_number': student.index_number
                    }
                except Student.DoesNotExist:
                    pass
                
                return JsonResponse({
                    'message': 'Login successful',
                    'token': token.key,  # Send token for iOS/Safari
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'is_staff': user.is_staff,
                        'student': student_data
                    }
                })
            else:
                return JsonResponse({
                    'error': 'Account is deactivated'
                }, status=403)
        else:
            return JsonResponse({
                'error': 'Invalid username/email or password'
            }, status=401)
            
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def signout(request):
    """User logout endpoint"""
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({'message': 'Logout successful'})
    else:
        return JsonResponse({'error': 'User not authenticated'}, status=401)


@require_http_methods(["GET"])
def profile(request):
    """Get current user profile"""
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    user = request.user
    
    # Get student profile if exists
    student_data = None
    try:
        student = Student.objects.select_related('programme').get(user=user)
        student_data = {
            'id': student.id,
            'phone_number': student.phone_number,
            'date_of_birth': student.date_of_birth.isoformat(),
            'programme': {
                'id': student.programme.id,
                'name': student.programme.get_name_display(),
                'price': float(student.programme.price)
            },
            'enrollment_date': student.enrollment_date.isoformat(),
            'is_active': student.is_active,
            'previous_school': student.previous_school,
            'wassce_year': student.wassce_year,
            'index_number': student.index_number
        }
    except Student.DoesNotExist:
        pass
    
    return JsonResponse({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'date_joined': user.date_joined.isoformat(),
            'is_staff': user.is_staff,
            'student': student_data
        }
    })


@require_http_methods(["GET"])
def check_availability(request):
    """Check if username or email is available"""
    username = request.GET.get('username')
    email = request.GET.get('email')
    
    result = {}
    
    if username:
        result['username_available'] = not User.objects.filter(username=username).exists()
    
    if email:
        result['email_available'] = not User.objects.filter(email=email).exists()
    
    return JsonResponse(result)


@csrf_exempt
@require_http_methods(["POST"])
def debug_signup(request):
    """Debug endpoint to test signup data"""
    try:
        data = json.loads(request.body)
        print(f"DEBUG: Received data: {data}")
        
        return JsonResponse({
            'received_data': data,
            'data_keys': list(data.keys()),
            'message': 'Debug successful'
        })
    except json.JSONDecodeError as e:
        return JsonResponse({'error': f'JSON decode error: {str(e)}'}, status=400)
    except Exception as e:
        return JsonResponse({'error': f'Unexpected error: {str(e)}'}, status=500)