from django.urls import path
from . import views

urlpatterns = [
    path('programmes/', views.programmes_list, name='programmes_list'),
    path('programmes/<int:programme_id>/', views.programme_detail, name='programme_detail'),
    path('subjects/<int:subject_id>/', views.subject_detail, name='subject_detail'),
    path('lessons/<int:lesson_id>/complete/', views.mark_lesson_complete, name='mark_lesson_complete'),
    path('lessons/<int:lesson_id>/uncomplete/', views.unmark_lesson_complete, name='unmark_lesson_complete'),
    path('topics/<int:topic_id>/progress/', views.get_topic_progress, name='get_topic_progress'),
    path('announcements/', views.get_announcements, name='get_announcements'),
    path('instructors/', views.get_instructors, name='get_instructors'),
]