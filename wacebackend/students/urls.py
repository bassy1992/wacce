from django.urls import path
from . import views

urlpatterns = [
    path('programmes/', views.ProgrammeListView.as_view(), name='programme-list'),
    path('register/', views.register_student, name='student-register'),
    path('profile/', views.student_profile, name='student-profile'),
    path('progress/', views.student_progress, name='student-progress'),
    path('dashboard/', views.student_dashboard, name='student-dashboard'),
    path('populate-subjects/', views.populate_subjects_api, name='populate-subjects'),
    path('populate-topics/', views.populate_topics_api, name='populate-topics'),
    path('populate-lessons/', views.populate_lessons_api, name='populate-lessons'),
    path('update-english-videos/', views.update_english_videos_api, name='update-english-videos'),
]