#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from students.models import Programme, Student
from courses.models import Subject, ProgrammeSubject, Topic, Lesson
from django.contrib.auth.models import User

print('=== DATABASE SUMMARY ===')
print(f'Users: {User.objects.count()}')
print(f'Programmes: {Programme.objects.count()}')
print(f'Students: {Student.objects.count()}')
print(f'Subjects: {Subject.objects.count()}')
print(f'  - Core: {Subject.objects.filter(subject_type="core").count()}')
print(f'  - Elective: {Subject.objects.filter(subject_type="elective").count()}')
print(f'Programme-Subject assignments: {ProgrammeSubject.objects.count()}')
print(f'Topics: {Topic.objects.count()}')
print(f'Lessons: {Lesson.objects.count()}')

print('\n=== CORE SUBJECTS ===')
for subject in Subject.objects.filter(subject_type='core'):
    print(f'{subject.name} ({subject.code}) - {subject.topics.count()} topics')

print('\n=== SAMPLE PROGRAMME SUBJECTS ===')
gs = Programme.objects.get(name='general_science')
print(f'{gs.get_name_display()}:')
for ps in ProgrammeSubject.objects.filter(programme=gs).order_by('subject__subject_type', 'order'):
    print(f'  - {ps.subject.name} ({ps.subject.subject_type})')

print('\n=== ENGLISH LANGUAGE TOPICS ===')
eng = Subject.objects.get(code='ENG')
for topic in eng.topics.all():
    print(f'{topic.title} - {topic.lessons.count()} lessons')