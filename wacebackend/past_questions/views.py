from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from students.models import Student
from courses.models import ProgrammeSubject
from .models import PastQuestionPaper, QuestionTopic


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_past_questions(request):
    """
    Get past questions filtered by student's programme subjects
    Returns papers from 1990-2025 for all core and elective subjects in their programme
    """
    try:
        # Get student and their programme
        student = Student.objects.get(user=request.user)
        programme = student.programme
        
        # Get all subjects for this programme (core + elective)
        programme_subjects = ProgrammeSubject.objects.filter(
            programme=programme
        ).select_related('subject').values_list('subject_id', flat=True)
        
        # Get all past papers for these subjects from 1990-2025
        papers = PastQuestionPaper.objects.filter(
            subject_id__in=programme_subjects,
            year__gte=1990,
            year__lte=2025,
            is_published=True
        ).select_related('subject').order_by('-year', 'subject__name', 'paper_number')
        
        # Group papers by subject
        subjects_data = {}
        for paper in papers:
            subject_name = paper.subject.name
            if subject_name not in subjects_data:
                subjects_data[subject_name] = {
                    'id': paper.subject.id,
                    'name': subject_name,
                    'code': paper.subject.code,
                    'subject_type': paper.subject.subject_type,
                    'papers': []
                }
            
            subjects_data[subject_name]['papers'].append({
                'id': paper.id,
                'year': paper.year,
                'paper_number': paper.paper_number,
                'paper_type': paper.paper_type,
                'title': paper.title,
                'duration_minutes': paper.duration_minutes,
                'total_marks': paper.total_marks,
                'question_count': paper.mcq_questions.count() + paper.essay_questions.count()
            })
        
        # Get topics for these subjects
        topics = QuestionTopic.objects.filter(
            subject_id__in=programme_subjects
        ).select_related('subject').order_by('subject__name', 'order')
        
        topics_data = []
        for topic in topics:
            topics_data.append({
                'id': topic.id,
                'name': topic.name,
                'description': topic.description,
                'subject': {
                    'id': topic.subject.id,
                    'name': topic.subject.name
                }
            })
        
        return JsonResponse({
            'programme': {
                'id': programme.id,
                'name': programme.name,
                'display_name': programme.get_name_display()
            },
            'subjects': list(subjects_data.values()),
            'topics': topics_data,
            'year_range': {
                'start': 1990,
                'end': 2025
            },
            'total_papers': papers.count()
        })
        
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student profile not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def paper_detail(request, paper_id):
    """Get detailed information about a specific past paper"""
    try:
        paper = PastQuestionPaper.objects.get(id=paper_id, is_published=True)
        
        # Get MCQ questions
        mcq_questions = paper.mcq_questions.all().order_by('question_number')
        mcq_data = []
        for mcq in mcq_questions:
            mcq_data.append({
                'id': mcq.id,
                'question_number': mcq.question_number,
                'question_text': mcq.question_text,
                'options': {
                    'A': mcq.option_a,
                    'B': mcq.option_b,
                    'C': mcq.option_c,
                    'D': mcq.option_d,
                    'E': mcq.option_e if mcq.option_e else None
                },
                'marks': mcq.marks,
                'difficulty': mcq.difficulty,
                'topic': mcq.topic.name if mcq.topic else None
            })
        
        # Get essay questions
        essay_questions = paper.essay_questions.all().order_by('section', 'question_number')
        essay_data = []
        for essay in essay_questions:
            sub_questions = []
            if essay.has_sub_questions:
                for sub in essay.sub_questions.all():
                    sub_questions.append({
                        'sub_number': sub.sub_number,
                        'question_text': sub.question_text,
                        'marks': sub.marks
                    })
            
            essay_data.append({
                'id': essay.id,
                'question_number': essay.question_number,
                'section': essay.section,
                'question_text': essay.question_text,
                'marks': essay.marks,
                'suggested_time_minutes': essay.suggested_time_minutes,
                'difficulty': essay.difficulty,
                'topic': essay.topic.name if essay.topic else None,
                'has_sub_questions': essay.has_sub_questions,
                'sub_questions': sub_questions
            })
        
        return JsonResponse({
            'paper': {
                'id': paper.id,
                'subject': paper.subject.name,
                'year': paper.year,
                'paper_number': paper.paper_number,
                'paper_type': paper.paper_type,
                'title': paper.title,
                'instructions': paper.instructions,
                'duration_minutes': paper.duration_minutes,
                'total_marks': paper.total_marks
            },
            'mcq_questions': mcq_data,
            'essay_questions': essay_data,
            'total_questions': len(mcq_data) + len(essay_data)
        })
        
    except PastQuestionPaper.DoesNotExist:
        return JsonResponse({'error': 'Paper not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
