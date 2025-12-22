from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .models import Student, Programme, StudentProgress, GHANA_HIGH_SCHOOLS
from .serializers import (
    StudentSerializer, ProgrammeSerializer, 
    StudentProgressSerializer, StudentRegistrationSerializer
)

class ProgrammeListView(generics.ListAPIView):
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([AllowAny])
def get_high_schools(request):
    """
    Get list of Ghana high schools for signup form
    """
    return Response({
        'schools': GHANA_HIGH_SCHOOLS,
        'total_count': len(GHANA_HIGH_SCHOOLS)
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def register_student(request):
    serializer = StudentRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        student = serializer.save()
        return Response({
            'message': 'Student registered successfully',
            'student_id': student.id
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_profile(request):
    try:
        student = Student.objects.get(user=request.user)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'error': 'Student profile not found'}, 
                       status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_progress(request):
    try:
        student = Student.objects.get(user=request.user)
        progress = StudentProgress.objects.filter(student=student)
        serializer = StudentProgressSerializer(progress, many=True)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({'error': 'Student profile not found'}, 
                       status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_dashboard(request):
    """
    Get student dashboard with their programme's core and elective subjects
    """
    try:
        from courses.models import ProgrammeSubject
        
        student = Student.objects.get(user=request.user)
        programme = student.programme
        
        # Get all subjects for this programme
        programme_subjects = ProgrammeSubject.objects.filter(
            programme=programme
        ).select_related('subject').prefetch_related('subject__topics').order_by('subject__subject_type', 'order')
        
        # Separate core and elective subjects
        core_subjects = []
        elective_subjects = []
        
        for prog_subject in programme_subjects:
            subject = prog_subject.subject
            
            # Get student progress for this subject if exists
            try:
                progress = StudentProgress.objects.get(student=student, subject=subject.name)
                progress_data = {
                    'current_grade': progress.current_grade,
                    'target_grade': progress.target_grade,
                    'progress_percentage': progress.progress_percentage,
                    'lessons_completed': progress.lessons_completed,
                    'total_lessons': progress.total_lessons,
                }
            except StudentProgress.DoesNotExist:
                progress_data = {
                    'current_grade': '',
                    'target_grade': '',
                    'progress_percentage': 0,
                    'lessons_completed': 0,
                    'total_lessons': subject.topics.count(),
                }
            
            subject_data = {
                'id': subject.id,
                'name': subject.name,
                'code': subject.code,
                'description': subject.description,
                'topics_count': subject.topics.count(),
                'is_required': prog_subject.is_required,
                'progress': progress_data
            }
            
            if subject.subject_type == 'core':
                core_subjects.append(subject_data)
            else:
                elective_subjects.append(subject_data)
        
        dashboard_data = {
            'student': {
                'id': student.id,
                'name': student.user.get_full_name(),
                'email': student.user.email,
                'phone_number': student.phone_number,
                'index_number': student.index_number,
                'enrollment_date': student.enrollment_date,
            },
            'programme': {
                'id': programme.id,
                'name': programme.name,
                'display_name': programme.get_name_display(),
                'description': programme.description,
                'duration_months': programme.duration_months,
            },
            'subjects': {
                'core': core_subjects,
                'elective': elective_subjects,
            },
            'summary': {
                'total_subjects': len(core_subjects) + len(elective_subjects),
                'core_subjects_count': len(core_subjects),
                'elective_subjects_count': len(elective_subjects),
            }
        }
        
        return Response(dashboard_data)
        
    except Student.DoesNotExist:
        return Response({'error': 'Student profile not found'}, 
                       status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def populate_subjects_api(request):
    """
    API endpoint to populate subjects - only accessible by admin users
    """
    from courses.models import Subject, ProgrammeSubject
    from django.core.management import call_command
    from io import StringIO
    
    try:
        # Capture the output
        out = StringIO()
        call_command('populate_subjects', stdout=out)
        output = out.getvalue()
        
        return Response({
            'success': True,
            'message': 'Subjects populated successfully',
            'output': output,
            'summary': {
                'total_subjects': Subject.objects.count(),
                'core_subjects': Subject.objects.filter(subject_type='core').count(),
                'elective_subjects': Subject.objects.filter(subject_type='elective').count(),
                'programme_subject_links': ProgrammeSubject.objects.count(),
            }
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def populate_topics_api(request):
    """
    API endpoint to populate topics - only accessible by admin users
    """
    from courses.models import Topic
    from django.core.management import call_command
    from io import StringIO
    
    try:
        # Capture the output
        out = StringIO()
        call_command('populate_topics', stdout=out)
        output = out.getvalue()
        
        return Response({
            'success': True,
            'message': 'Topics populated successfully',
            'output': output,
            'summary': {
                'total_topics': Topic.objects.count(),
            }
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def populate_lessons_api(request):
    """
    API endpoint to populate lessons - only accessible by admin users
    """
    from courses.models import Lesson
    from django.core.management import call_command
    from io import StringIO
    
    try:
        # Capture the output
        out = StringIO()
        call_command('populate_lessons', stdout=out)
        output = out.getvalue()
        
        return Response({
            'success': True,
            'message': 'Lessons populated successfully',
            'output': output,
            'summary': {
                'total_lessons': Lesson.objects.count(),
            }
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_english_videos_api(request):
    """
    API endpoint to update English videos - only accessible by admin users
    """
    from django.core.management import call_command
    from io import StringIO
    
    try:
        # Capture the output
        out = StringIO()
        call_command('update_english_videos', stdout=out)
        output = out.getvalue()
        
        return Response({
            'success': True,
            'message': 'English videos updated successfully',
            'output': output,
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def update_all_video_urls_api(request):
    """
    API endpoint to update ALL video URLs - only accessible by admin users
    """
    from django.core.management import call_command
    from io import StringIO
    
    try:
        # Capture the output
        out = StringIO()
        call_command('update_all_video_urls', stdout=out)
        output = out.getvalue()
        
        return Response({
            'success': True,
            'message': 'All video URLs updated successfully',
            'output': output,
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
