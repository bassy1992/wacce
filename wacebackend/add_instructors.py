"""
Add sample instructors - Run with: python manage.py shell < add_instructors.py
"""
from courses.models import Instructor, InstructorSpecialty, Subject

print("=" * 70)
print("POPULATING INSTRUCTORS")
print("=" * 70)
print()

# Sample instructors data
instructors_data = [
    {
        'title': 'dr',
        'first_name': 'Kwame',
        'last_name': 'Asante',
        'role': 'principal',
        'position_title': 'Principal & Mathematics Specialist',
        'highest_degree': 'PhD Mathematics Education',
        'institution': 'University of Ghana',
        'years_experience': 15,
        'bio': 'Dr. Asante brings over 15 years of experience in mathematics education, specializing in innovative teaching methods that make complex concepts accessible to all students.',
        'photo': 'https://ui-avatars.com/api/?name=Kwame+Asante&size=200&background=00ADB5&color=fff',
        'email': 'k.asante@excelwassce.com',
        'display_order': 1,
        'is_featured': True,
        'specialties': ['Mathematics (Core)', 'Elective Mathematics', 'Physics']
    },
    {
        'title': 'mrs',
        'first_name': 'Akosua',
        'last_name': 'Mensah',
        'role': 'director',
        'position_title': 'Academic Director & English Literature',
        'highest_degree': 'MA English Literature',
        'institution': 'University of Cape Coast',
        'years_experience': 12,
        'bio': 'Mrs. Mensah is passionate about literature and language arts, helping students develop critical thinking and communication skills essential for academic success.',
        'photo': 'https://ui-avatars.com/api/?name=Akosua+Mensah&size=200&background=00ADB5&color=fff',
        'email': 'a.mensah@excelwassce.com',
        'display_order': 2,
        'is_featured': True,
        'specialties': ['English Language', 'History', 'French']
    },
    {
        'title': 'mr',
        'first_name': 'John',
        'last_name': 'Boateng',
        'role': 'head',
        'position_title': 'Science Department Head',
        'highest_degree': 'MSc Chemistry',
        'institution': 'KNUST',
        'years_experience': 10,
        'bio': 'Mr. Boateng leads our science department with a focus on practical, hands-on learning that prepares students for real-world applications of scientific principles.',
        'photo': 'https://ui-avatars.com/api/?name=John+Boateng&size=200&background=00ADB5&color=fff',
        'email': 'j.boateng@excelwassce.com',
        'display_order': 3,
        'is_featured': True,
        'specialties': ['Integrated Science', 'Physics']
    },
    {
        'title': 'ms',
        'first_name': 'Grace',
        'last_name': 'Owusu',
        'role': 'coordinator',
        'position_title': 'Business Studies Coordinator',
        'highest_degree': 'MBA',
        'institution': 'University of Ghana Business School',
        'years_experience': 8,
        'bio': 'Ms. Owusu brings real-world business experience to the classroom, helping students understand the practical applications of business concepts.',
        'photo': 'https://ui-avatars.com/api/?name=Grace+Owusu&size=200&background=00ADB5&color=fff',
        'email': 'g.owusu@excelwassce.com',
        'display_order': 4,
        'is_featured': True,
        'specialties': ['Economics']
    },
]

created_count = 0
updated_count = 0

for data in instructors_data:
    specialties_names = data.pop('specialties')
    
    # Create or update instructor
    instructor, created = Instructor.objects.update_or_create(
        first_name=data['first_name'],
        last_name=data['last_name'],
        defaults=data
    )
    
    if created:
        created_count += 1
        print(f"✓ Created: {instructor.full_name}")
    else:
        updated_count += 1
        print(f"↻ Updated: {instructor.full_name}")
    
    # Add specialties
    for i, specialty_name in enumerate(specialties_names):
        try:
            subject = Subject.objects.get(name=specialty_name)
            specialty, created = InstructorSpecialty.objects.get_or_create(
                instructor=instructor,
                subject=subject,
                defaults={'is_primary': i == 0}  # First specialty is primary
            )
            print(f"  - Specialty: {subject.name}")
        except Subject.DoesNotExist:
            print(f"  ⚠ Subject not found: {specialty_name}")

print()
print("=" * 70)
print(f"✅ INSTRUCTORS POPULATED!")
print(f"   Created: {created_count}")
print(f"   Updated: {updated_count}")
print(f"   Total: {Instructor.objects.count()}")
print("=" * 70)
