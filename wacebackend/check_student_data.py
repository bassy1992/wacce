#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.contrib.auth.models import User
from students.models import Student
from courses.models import ProgrammeSubject

print("=" * 70)
print("CHECKING STUDENT DATA")
print("=" * 70)

users = User.objects.all()
print(f"\nTotal users: {users.count()}")
for u in users:
    print(f"  - {u.username} ({u.first_name} {u.last_name})")

students = Student.objects.all()
print(f"\nTotal students: {students.count()}")
for s in students:
    print(f"  - {s.user.username}: Programme = {s.programme.name if s.programme else 'No programme'}")
    if s.programme:
        prog_subjects = ProgrammeSubject.objects.filter(programme=s.programme)
        print(f"    Programme has {prog_subjects.count()} subjects")
        core = prog_subjects.filter(subject__subject_type='core').count()
        elective = prog_subjects.filter(subject__subject_type='elective').count()
        print(f"    Core: {core}, Elective: {elective}")
