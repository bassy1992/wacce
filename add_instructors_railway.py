#!/usr/bin/env python
import os
import sys
import django

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'wacebackend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'wacebackend.settings')
django.setup()

from courses.models import Instructor, InstructorSpecialty, Subject

instructors_data = [
    {
        'title': 'dr', 'first_name': 'Kwame', 'last_name': 'Asante',
        'role': 'principal', 'position_title': 'Principal & Mathematics Specialist',
        'highest_degree': 'PhD Mathematics Education', 'institution': 'University of Ghana',
        'years_experience': 15, 'bio': 'Dr. Asante brings over 15 years of experience in mathematics education.',
        'photo': 'https://ui-avatars.com/api/?name=Kwame+Asante&size=200&background=00ADB5&color=fff',
        'email': 'k.asante@excelwassce.com', 'display_order': 1, 'is_featured': True,
        'specialties': ['Mathematics (Core)', 'Elective Mathematics', 'Physics']
    },
    {
        'title': 'mrs', 'first_name': 'Akosua', 'last_name': 'Mensah',
        'role': 'director', 'position_title': 'Academic Director & English Literature',
        'highest_degree': 'MA English Literature', 'institution': 'University of Cape Coast',
        'years_experience': 12, 'bio': 'Mrs. Mensah is passionate about literature and language arts.',
        'photo': 'https://ui-avatars.com/api/?name=Akosua+Mensah&size=200&background=00ADB5&color=fff',
        'email': 'a.mensah@excelwassce.com', 'display_order': 2, 'is_featured': True,
        'specialties': ['English Language', 'History', 'French']
    },
    {
        'title': 'mr', 'first_name': 'John', 'last_name': 'Boateng',
        'role': 'head', 'position_title': 'Science Department Head',
        'highest_degree': 'MSc Chemistry', 'institution': 'KNUST',
        'years_experience': 10, 'bio': 'Mr. Boateng leads our science department.',
        'photo': 'https://ui-avatars.com/api/?name=John+Boateng&size=200&background=00ADB5&color=fff',
        'email': 'j.boateng@excelwassce.com', 'display_order': 3, 'is_featured': True,
        'specialties': ['Integrated Science', 'Physics']
    },
    {
        'title': 'ms', 'first_name': 'Grace', 'last_name': 'Owusu',
        'role': 'coordinator', 'position_title': 'Business Studies Coordinator',
        'highest_degree': 'MBA', 'institution': 'University of Ghana Business School',
        'years_experience': 8, 'bio': 'Ms. Owusu brings real-world business experience.',
        'photo': 'https://ui-avatars.com/api/?name=Grace+Owusu&size=200&background=00ADB5&color=fff',
        'email': 'g.owusu@excelwassce.com', 'display_order': 4, 'is_featured': True,
        'specialties': ['Economics']
    },
]

print("Adding instructors...")
for data in instructors_data:
    specialties_names = data.pop('specialties')
    instructor, created = Instructor.objects.update_or_create(
        first_name=data['first_name'], last_name=data['last_name'], defaults=data
    )
    print(f"{'Created' if created else 'Updated'}: {instructor.full_name}")
    InstructorSpecialty.objects.filter(instructor=instructor).delete()
    for i, name in enumerate(specialties_names):
        try:
            subject = Subject.objects.get(name=name)
            InstructorSpecialty.objects.create(instructor=instructor, subject=subject, is_primary=(i==0))
            print(f"  + {subject.name}")
        except Subject.DoesNotExist:
            print(f"  - Subject not found: {name}")

print(f"\nDone! Total instructors: {Instructor.objects.count()}")
