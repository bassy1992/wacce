#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.contrib.auth.models import User
from students.models import Student
from courses.models import ProgrammeSubject

# Get the bassy user
user = User.objects.get(username='bassy')
print(f"User: {user.username} ({user.first_name} {user.last_name})")

# Get student
student = Student.objects.get(user=user)
print(f"Student: {student}")
print(f"Programme: {student.programme.name} - {student.programme.get_name_display()}")

# Get programme subjects
programme_subjects = ProgrammeSubject.objects.filter(
    programme=student.programme
).select_related('subject').prefetch_related('subject__topics').order_by('subject__subject_type', 'order')

print(f"\nTotal programme subjects: {programme_subjects.count()}")

core_subjects = []
elective_subjects = []

for prog_subject in programme_subjects:
    subject = prog_subject.subject
    print(f"\n  Subject: {subject.name} ({subject.subject_type})")
    print(f"    Code: {subject.code}")
    print(f"    Topics: {subject.topics.count()}")
    
    if subject.subject_type == 'core':
        core_subjects.append(subject)
    else:
        elective_subjects.append(subject)

print(f"\nCore subjects: {len(core_subjects)}")
print(f"Elective subjects: {len(elective_subjects)}")
