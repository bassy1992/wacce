#!/usr/bin/env python
"""
Script to check and fix student programme assignments
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings')
django.setup()

from django.contrib.auth.models import User
from students.models import Student, Programme


def check_and_fix_students():
    """Check all students and fix missing programme assignments"""
    
    print("=" * 70)
    print("CHECKING STUDENT PROGRAMME ASSIGNMENTS")
    print("=" * 70)
    
    # Get all students
    students = Student.objects.select_related('user', 'programme').all()
    
    if not students.exists():
        print("\n❌ No students found in database")
        return
    
    print(f"\n📊 Found {students.count()} student(s)")
    print("\n" + "-" * 70)
    
    students_without_programme = []
    
    for student in students:
        print(f"\nStudent ID: {student.id}")
        print(f"Username: {student.user.username}")
        print(f"Name: {student.user.get_full_name()}")
        print(f"Email: {student.user.email}")
        
        try:
            if student.programme:
                print(f"Programme ID: {student.programme.id}")
                print(f"Programme Name: {student.programme.name}")
                print(f"Programme Display: {student.programme.get_name_display()}")
                print("✅ Programme assigned correctly")
            else:
                print("❌ NO PROGRAMME ASSIGNED")
                students_without_programme.append(student)
        except Exception as e:
            print(f"❌ ERROR accessing programme: {e}")
            students_without_programme.append(student)
        
        print("-" * 70)
    
    # Fix students without programmes
    if students_without_programme:
        print(f"\n⚠️  Found {len(students_without_programme)} student(s) without programme")
        print("\nAvailable Programmes:")
        programmes = Programme.objects.all()
        
        if not programmes.exists():
            print("❌ No programmes found! Please create programmes first.")
            return
        
        for i, prog in enumerate(programmes, 1):
            print(f"{i}. {prog.get_name_display()} (ID: {prog.id}, name: {prog.name})")
        
        print("\n" + "=" * 70)
        print("FIXING STUDENTS")
        print("=" * 70)
        
        # Assign first programme as default (you can modify this logic)
        default_programme = programmes.first()
        
        for student in students_without_programme:
            print(f"\nAssigning {default_programme.get_name_display()} to {student.user.username}...")
            student.programme = default_programme
            student.save()
            print(f"✅ Fixed! {student.user.username} now has programme: {default_programme.get_name_display()}")
    else:
        print("\n✅ All students have programmes assigned!")
    
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total Students: {students.count()}")
    print(f"Students Fixed: {len(students_without_programme)}")
    print("=" * 70)


if __name__ == '__main__':
    check_and_fix_students()
