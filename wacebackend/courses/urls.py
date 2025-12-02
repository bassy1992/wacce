from django.urls import path
from . import views

urlpatterns = [
    path('programmes/', views.programmes_list, name='programmes_list'),
    path('programmes/<int:programme_id>/', views.programme_detail, name='programme_detail'),
    path('subjects/<int:subject_id>/', views.subject_detail, name='subject_detail'),
]