#!/usr/bin/env python
"""
Script to load initial data into Railway database
Run with: railway run python load_initial_data.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wace_api.settings_production')
django.setup()

from students.models import Programme
from courses.models import Subject

def create_programmes():
    """Create initial programmes"""
    programmes_data = [
        {
            'name': 'science',
            'display_name': 'Science Programme',
            'description': 'Comprehensive science education covering Physics, Chemistry, Biology, and Mathematics',
            'price': 500.00,
            'duration_months': 12,
        },
        {
            'name': 'business',
            'display_name': 'Business Programme',
            'description': 'Business studies including Economics, Accounting, and Business Management',
            'price': 500.00,
            'duration_months': 12,
        },
        {
            'name': 'general_arts',
            'display_name': 'General Arts Programme',
            'description': 'Arts and humanities including Literature, History, and Government',
            'price': 500.00,
            'duration_months': 12,
        },
        {
            'name': 'visual_arts',
            'display_name': 'Visual Arts Programme',
            'description': 'Creative arts including Graphic Design, Painting, and Sculpture',
            'price': 500.00,
            'duration_months': 12,
        },
        {
            'name': 'home_economics',
            'display_name': 'Home Economics Programme',
            'description': 'Home Economics including Food and Nutrition, Clothing and Textiles',
            'price': 500.00,
            'duration_months': 12,
        },
        {
            'name': 'agriculture',
            'display_name': 'Agriculture Programme',
            'description': 'Agricultural science and practices',
            'price': 500.00,
            'duration_months': 12,
        },
    ]
    
    created_count = 0
    for prog_data in programmes_data:
        programme, created = Programme.objects.get_or_create(
            name=prog_data['name'],
            defaults=prog_data
        )
        if created:
            created_count += 1
            print(f"✅ Created: {programme.display_name}")
        else:
            print(f"⏭️  Already exists: {programme.display_name}")
    
    return created_count

def create_core_subjects():
    """Create core subjects"""
    core_subjects = [
        {
            'name': 'English Language',
            'code': 'ENG',
            'description': 'Core English Language',
            'subject_type': 'core',
        },
        {
            'name': 'Mathematics (Core)',
            'code': 'MATH_CORE',
            'description': 'Core Mathematics',
            'subject_type': 'core',
        },
        {
            'name': 'Integrated Science',
            'code': 'INT_SCI',
            'description': 'Integrated Science',
            'subject_type': 'core',
        },
        {
            'name': 'Social Studies',
            'code': 'SOC_STD',
            'description': 'Social Studies',
            'subject_type': 'core',
        },
    ]
    
    created_count = 0
    for subj_data in core_subjects:
        subject, created = Subject.objects.get_or_create(
            code=subj_data['code'],
            defaults=subj_data
        )
        if created:
            created_count += 1
            print(f"✅ Created: {subject.name}")
        else:
            print(f"⏭️  Already exists: {subject.name}")
    
    return created_count

def main():
    print("=" * 60)
    print("Loading Initial Data into Railway Database")
    print("=" * 60)
    
    print("\n📚 Creating Programmes...")
    prog_count = create_programmes()
    
    print("\n📖 Creating Core Subjects...")
    subj_count = create_core_subjects()
    
    print("\n" + "=" * 60)
    print(f"✅ Done! Created {prog_count} programmes and {subj_count} subjects")
    print("=" * 60)
    
    # Show summary
    print(f"\n📊 Database Summary:")
    print(f"   Total Programmes: {Programme.objects.count()}")
    print(f"   Total Subjects: {Subject.objects.count()}")

if __name__ == '__main__':
    main()
