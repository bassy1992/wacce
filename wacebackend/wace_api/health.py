"""
Health check views for Railway deployment
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

@csrf_exempt
@require_http_methods(["GET"])
def health_check(request):
    """
    Simple health check endpoint for Railway
    """
    return JsonResponse({
        'status': 'healthy',
        'message': 'ExcelWASSCE API is running'
    })

@csrf_exempt
@require_http_methods(["GET"])
def api_info(request):
    """
    API information endpoint
    """
    return JsonResponse({
        'name': 'ExcelWASSCE API',
        'version': '1.0.0',
        'status': 'active',
        'endpoints': {
            'auth': '/api/auth/',
            'courses': '/api/courses/',
            'students': '/api/students/',
            'payments': '/api/payments/',
            'past_questions': '/api/past_questions/',
        }
    })