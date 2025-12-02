from django.urls import path
from . import views

urlpatterns = [
    path('programmes/', views.ProgrammeListView.as_view(), name='programme-list'),
    path('register/', views.register_student, name='student-register'),
    path('profile/', views.student_profile, name='student-profile'),
    path('progress/', views.student_progress, name='student-progress'),
]