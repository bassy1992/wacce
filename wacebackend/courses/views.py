from django.shortcuts import render
from django.http import JsonResponse
from students.models import Programme
from .models import Subject, ProgrammeSubject, Topic, Lesson


def programmes_list(request):
    """API endpoint to list all programmes with their subjects"""
    programmes_data = []
    
    for programme in Programme.objects.all():
        # Get programme subjects through the many-to-many relationship
        programme_subjects = ProgrammeSubject.objects.filter(
            programme=programme
        ).select_related('subject').order_by('subject__subject_type', 'order')
        
        # Separate core and elective subjects
        core_subjects = []
        elective_subjects = []
        
        for prog_subject in programme_subjects:
            subject_data = {
                'id': prog_subject.subject.id,
                'name': prog_subject.subject.name,
                'code': prog_subject.subject.code,
                'description': prog_subject.subject.description,
                'topics_count': prog_subject.subject.topics.count()
            }
            
            if prog_subject.subject.subject_type == 'core':
                core_subjects.append(subject_data)
            else:
                elective_subjects.append(subject_data)
        
        programme_data = {
            'id': programme.id,
            'name': programme.name,
            'display_name': programme.get_name_display(),
            'description': programme.description,
            'price': float(programme.price),
            'duration_months': programme.duration_months,
            'core_subjects': core_subjects,
            'elective_subjects': elective_subjects
        }
        programmes_data.append(programme_data)
    
    return JsonResponse({
        'programmes': programmes_data,
        'total_count': len(programmes_data)
    })


def programme_detail(request, programme_id):
    """API endpoint to get detailed information about a specific programme"""
    try:
        programme = Programme.objects.get(id=programme_id)
        
        # Get programme subjects through the many-to-many relationship
        programme_subjects = ProgrammeSubject.objects.filter(
            programme=programme
        ).select_related('subject').prefetch_related('subject__topics').order_by('subject__subject_type', 'order')
        
        subjects_by_type = {
            'core': [],
            'elective': []
        }
        
        for prog_subject in programme_subjects:
            subject = prog_subject.subject
            subject_data = {
                'id': subject.id,
                'name': subject.name,
                'code': subject.code,
                'description': subject.description,
                'order': prog_subject.order,
                'topics_count': subject.topics.count(),
                'topics': [
                    {
                        'id': topic.id,
                        'title': topic.title,
                        'description': topic.description,
                        'order': topic.order,
                        'estimated_duration_hours': topic.estimated_duration_hours,
                        'lessons_count': topic.lessons.count()
                    }
                    for topic in subject.topics.all()[:5]  # Show first 5 topics
                ]
            }
            subjects_by_type[subject.subject_type].append(subject_data)
        
        programme_data = {
            'id': programme.id,
            'name': programme.name,
            'display_name': programme.get_name_display(),
            'description': programme.description,
            'price': float(programme.price),
            'duration_months': programme.duration_months,
            'subjects': subjects_by_type,
            'total_subjects': len(programme_subjects)
        }
        
        return JsonResponse(programme_data)
        
    except Programme.DoesNotExist:
        return JsonResponse({'error': 'Programme not found'}, status=404)


def subject_detail(request, subject_id):
    """API endpoint to get detailed information about a specific subject"""
    try:
        subject = Subject.objects.get(id=subject_id)
        
        topics = Topic.objects.filter(subject=subject).prefetch_related('lessons').order_by('order')
        
        topics_data = []
        for topic in topics:
            topic_data = {
                'id': topic.id,
                'title': topic.title,
                'description': topic.description,
                'order': topic.order,
                'estimated_duration_hours': topic.estimated_duration_hours,
                'is_published': topic.is_published,
                'lessons_count': topic.lessons.count(),
                'lessons': [
                    {
                        'id': lesson.id,
                        'title': lesson.title,
                        'lesson_type': lesson.lesson_type,
                        'order': lesson.order,
                        'is_free': lesson.is_free,
                        'video_duration_minutes': lesson.video_duration_minutes,
                        'video_url': lesson.video_url,
                        'content': lesson.content
                    }
                    for lesson in topic.lessons.all()
                ]
            }
            topics_data.append(topic_data)
        
        subject_data = {
            'id': subject.id,
            'name': subject.name,
            'code': subject.code,
            'description': subject.description,
            'subject_type': subject.subject_type,
            'topics': topics_data,
            'total_topics': len(topics_data)
        }
        
        return JsonResponse(subject_data)
        
    except Subject.DoesNotExist:
        return JsonResponse({'error': 'Subject not found'}, status=404)
