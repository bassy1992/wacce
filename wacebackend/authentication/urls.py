from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('check-availability/', views.check_availability, name='check_availability'),
    path('debug-signup/', views.debug_signup, name='debug_signup'),
    path('change-password/', views.change_password, name='change_password'),
    path('email-notifications/', views.email_notifications, name='email_notifications'),
    path('delete-account/', views.delete_account, name='delete_account'),
]