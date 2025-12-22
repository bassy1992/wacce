"""
Admin setup views - temporary endpoint to make users admin
"""
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
import os


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_all_users(request):
    """
    DANGEROUS: Delete all users and create fresh admin
    Requires secret key for security
    """
    secret = request.data.get('secret')
    
    # Simple security check
    expected_secret = os.getenv('ADMIN_SETUP_SECRET', 'ResetUsers2024!')
    
    if secret != expected_secret:
        return Response({'error': 'Invalid secret key'}, status=403)
    
    try:
        # Count existing users
        user_count = User.objects.count()
        
        # Delete all users
        User.objects.all().delete()
        
        # Create fresh admin
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@excelwassce.com',
            password='Admin123!'
        )
        
        return Response({
            'success': True,
            'message': f'✅ Deleted {user_count} users and created fresh admin',
            'credentials': {
                'username': 'admin',
                'password': 'Admin123!',
                'email': admin.email,
            },
            'login_url': 'https://wacce-production.up.railway.app/admin/'
        })
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=500)


@api_view(['POST'])
@permission_classes([AllowAny])
def make_user_admin(request):
    """
    Temporary endpoint to make a user admin
    Requires secret key for security
    """
    username = request.data.get('username')
    secret = request.data.get('secret')
    
    # Simple security check
    expected_secret = os.getenv('ADMIN_SETUP_SECRET', 'setup123')
    
    if secret != expected_secret:
        return Response({'error': 'Invalid secret'}, status=403)
    
    if not username:
        return Response({'error': 'Username required'}, status=400)
    
    try:
        user = User.objects.get(username=username)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        
        return Response({
            'success': True,
            'message': f'✅ {username} is now an admin!',
            'user': {
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
            }
        })
        
    except User.DoesNotExist:
        # List available users
        users = User.objects.all()[:10]
        user_list = [{'username': u.username, 'is_staff': u.is_staff} for u in users]
        
        return Response({
            'error': f'User "{username}" not found',
            'available_users': user_list
        }, status=404)
