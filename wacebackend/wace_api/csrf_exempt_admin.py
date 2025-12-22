"""
Middleware to exempt admin login from CSRF for Railway deployment issues
"""
from django.utils.deprecation import MiddlewareMixin

class AdminCSRFExemptMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith('/admin/login/'):
            setattr(request, '_dont_enforce_csrf_checks', True)
