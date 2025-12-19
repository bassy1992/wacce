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


from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response as DRFResponse


@api_view(['POST'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Change user password"""
    
    try:
        data = request.data
        
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        confirm_password = data.get('confirm_password', '')
        
        # Validation
        if not current_password or not new_password or not confirm_password:
            return JsonResponse({
                'error': 'All password fields are required'
            }, status=400)
        
        # Check current password
        if not request.user.check_password(current_password):
            return JsonResponse({
                'error': 'Current password is incorrect'
            }, status=400)
        
        # Check new password matches confirmation
        if new_password != confirm_password:
            return JsonResponse({
                'error': 'New passwords do not match'
            }, status=400)
        
        # Validate new password strength
        if len(new_password) < 8:
            return JsonResponse({
                'error': 'Password must be at least 8 characters long'
            }, status=400)
        
        if not re.search(r'[A-Za-z]', new_password) or not re.search(r'\d', new_password):
            return JsonResponse({
                'error': 'Password must contain both letters and numbers'
            }, status=400)
        
        # Check if new password is same as current
        if current_password == new_password:
            return JsonResponse({
                'error': 'New password must be different from current password'
            }, status=400)
        
        # Update password
        request.user.set_password(new_password)
        request.user.save()
        
        # Update session to prevent logout
        from django.contrib.auth import update_session_auth_hash
        update_session_auth_hash(request, request.user)
        
        return JsonResponse({
            'message': 'Password changed successfully'
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def email_notifications(request):
    """Get or update email notification preferences"""
    
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student profile not found'}, status=404)
    
    if request.method == "GET":
        # Get current preferences
        return JsonResponse({
            'email_notifications': {
                'course_updates': getattr(student, 'email_course_updates', True),
                'assignment_reminders': getattr(student, 'email_assignment_reminders', True),
                'announcements': getattr(student, 'email_announcements', True),
                'weekly_summary': getattr(student, 'email_weekly_summary', True),
            }
        })
    
    elif request.method == "POST":
        # Update preferences
        try:
            data = request.data
            
            # Update fields if they exist in the model
            if hasattr(student, 'email_course_updates'):
                student.email_course_updates = data.get('course_updates', True)
            if hasattr(student, 'email_assignment_reminders'):
                student.email_assignment_reminders = data.get('assignment_reminders', True)
            if hasattr(student, 'email_announcements'):
                student.email_announcements = data.get('announcements', True)
            if hasattr(student, 'email_weekly_summary'):
                student.email_weekly_summary = data.get('weekly_summary', True)
            
            student.save()
            
            return JsonResponse({
                'message': 'Email notification preferences updated successfully'
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)


@api_view(['POST'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def delete_account(request):
    """Delete user account permanently"""
    
    try:
        data = request.data
        
        password = data.get('password', '')
        confirmation = data.get('confirmation', '')
        
        # Validation
        if not password:
            return JsonResponse({
                'error': 'Password is required to delete account'
            }, status=400)
        
        if confirmation != 'DELETE':
            return JsonResponse({
                'error': 'Please type DELETE to confirm account deletion'
            }, status=400)
        
        # Verify password
        if not request.user.check_password(password):
            return JsonResponse({
                'error': 'Incorrect password'
            }, status=400)
        
        # Delete user (this will cascade delete student profile)
        user = request.user
        logout(request)
        user.delete()
        
        return JsonResponse({
            'message': 'Account deleted successfully'
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Update user profile information"""
    
    try:
        data = request.data
        user = request.user
        
        # Update user fields
        if 'first_name' in data:
            user.first_name = data['first_name'].strip()
        if 'last_name' in data:
            user.last_name = data['last_name'].strip()
        if 'email' in data:
            email = data['email'].strip().lower()
            # Check if email is already taken by another user
            if User.objects.filter(email=email).exclude(id=user.id).exists():
                return JsonResponse({
                    'error': 'Email already in use by another account'
                }, status=400)
            try:
                validate_email(email)
                user.email = email
            except ValidationError:
                return JsonResponse({
                    'error': 'Invalid email format'
                }, status=400)
        
        user.save()
        
        # Update student profile if exists
        try:
            student = Student.objects.get(user=user)
            if 'phone_number' in data:
                phone_number = data['phone_number'].strip()
                if not re.match(r'^\+?[\d\s\-\(\)]{10,15}$', phone_number):
                    return JsonResponse({
                        'error': 'Invalid phone number format'
                    }, status=400)
                student.phone_number = phone_number
            
            student.save()
        except Student.DoesNotExist:
            pass
        
        return JsonResponse({
            'message': 'Profile updated successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)