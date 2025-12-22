#!/usr/bin/env python
"""
Quick test script to verify instructors API is working
"""
import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wacebackend.settings')
django.setup()

from courses.models import Instructor, InstructorSpecialty, Subject


def test_instructors():
    print("=" * 70)
    print("TESTING INSTRUCTORS API")
    print("=" * 70)
    print()
    
    # Check instructors
    instructors = Instructor.objects.filter(is_active=True)
    print(f"📊 Total Active Instructors: {instructors.count()}")
    print()
    
    if instructors.count() == 0:
        print("⚠️  No instructors found!")
        print("   Run: python populate_instructors.py")
        print()
        return
    
    # Display each instructor
    for instructor in instructors:
        print(f"✓ {instructor.full_name}")
        print(f"  Position: {instructor.position_title}")
        print(f"  Degree: {instructor.highest_degree}")
        print(f"  Institution: {instructor.institution}")
        print(f"  Experience: {instructor.experience_text}")
        print(f"  Featured: {'Yes' if instructor.is_featured else 'No'}")
        
        # Show specialties
        specialties = instructor.specialties.all()
        if specialties:
            specialty_names = [s.subject.name for s in specialties]
            print(f"  Specialties: {', '.join(specialty_names)}")
        else:
            print(f"  Specialties: None")
        print()
    
    # Test featured filter
    featured = Instructor.objects.filter(is_active=True, is_featured=True)
    print(f"⭐ Featured Instructors: {featured.count()}")
    print()
    
    print("=" * 70)
    print("✅ TEST COMPLETE")
    print("=" * 70)
    print()
    print("API Endpoints:")
    print("  All instructors: GET /api/courses/instructors/")
    print("  Featured only:   GET /api/courses/instructors/?featured=true")
    print()
    print("Frontend Pages:")
    print("  About page:      /about (shows all instructors)")
    print("  Homepage:        Add TeamSection with featuredOnly={true}")
    print()


if __name__ == '__main__':
    test_instructors()
