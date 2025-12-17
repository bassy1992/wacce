#!/usr/bin/env python
"""Check users and their student profiles"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.contrib.auth.models import User
from students.models import Student

print("=" * 60)
print("ALL USERS IN DATABASE")
print("=" * 60)

users = User.objects.all()
if not users:
    print("No users found in database!")
else:
    for user in users:
        print(f"\nUsername: {user.username}")
        print(f"Email: {user.email}")
        print(f"Name: {user.first_name} {user.last_name}")
        print(f"Staff: {user.is_staff}")
        print(f"Active: {user.is_active}")
        
        try:
            student = Student.objects.select_related('programme').get(user=user)
            print(f"Has Student Profile: YES")
            print(f"  - Student ID: {student.id}")
            print(f"  - Programme: {student.programme.get_name_display() if student.programme else 'None'}")
            print(f"  - Programme ID: {student.programme.id if student.programme else 'None'}")
            print(f"  - Enrollment Date: {student.enrollment_date}")
            print(f"  - Active: {student.is_active}")
        except Student.DoesNotExist:
            print(f"Has Student Profile: NO")

print("\n" + "=" * 60)
print("STUDENTS WITHOUT PROGRAMMES")
print("=" * 60)

students_no_programme = Student.objects.filter(programme__isnull=True)
if students_no_programme:
    for student in students_no_programme:
        print(f"User: {student.user.username} - Missing Programme!")
else:
    print("All students have programmes assigned.")

print("\n" + "=" * 60)
print("SUMMARY")
print("=" * 60)
print(f"Total Users: {User.objects.count()}")
print(f"Total Students: {Student.objects.count()}")
print(f"Students with Programmes: {Student.objects.filter(programme__isnull=False).count()}")
print(f"Students without Programmes: {Student.objects.filter(programme__isnull=True).count()}")
