from django.urls import path
from . import views

urlpatterns = [
    path('student/', views.student_past_questions, name='student_past_questions'),
    path('paper/<int:paper_id>/', views.paper_detail, name='paper_detail'),
]
