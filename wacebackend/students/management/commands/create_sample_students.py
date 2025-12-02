from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from students.models import Programme, Student
from datetime import date


class Command(BaseCommand):
    help = 'Create sample students for testing'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample students...')
        
        # Get programmes
        programmes = Programme.objects.all()
        
        sample_students = [
            {
                'username': 'john_doe',
                'email': 'john@example.com',
                'first_name': 'John',
                'last_name': 'Doe',
                'programme': 'general_science',
                'phone_number': '+233241234567',
                'date_of_birth': '2005-03-15',
                'previous_school': 'Accra High School',
                'wassce_year': 2023,
                'index_number': 'GH2023001'
            },
            {
                'username': 'jane_smith',
                'email': 'jane@example.com',
                'first_name': 'Jane',
                'last_name': 'Smith',
                'programme': 'general_arts',
                'phone_number': '+233241234568',
                'date_of_birth': '2004-07-22',
                'previous_school': 'Kumasi Girls School',
                'wassce_year': 2022,
                'index_number': 'GH2022002'
            },
            {
                'username': 'kwame_asante',
                'email': 'kwame@example.com',
                'first_name': 'Kwame',
                'last_name': 'Asante',
                'programme': 'business',
                'phone_number': '+233241234569',
                'date_of_birth': '2005-11-08',
                'previous_school': 'Cape Coast Technical',
                'wassce_year': 2023,
                'index_number': 'GH2023003'
            },
            {
                'username': 'akosua_mensah',
                'email': 'akosua@example.com',
                'first_name': 'Akosua',
                'last_name': 'Mensah',
                'programme': 'visual_arts',
                'phone_number': '+233241234570',
                'date_of_birth': '2005-01-12',
                'previous_school': 'Tema Art School',
                'wassce_year': 2023,
                'index_number': 'GH2023004'
            }
        ]
        
        for student_data in sample_students:
            # Create user
            user, user_created = User.objects.get_or_create(
                username=student_data['username'],
                defaults={
                    'email': student_data['email'],
                    'first_name': student_data['first_name'],
                    'last_name': student_data['last_name'],
                }
            )
            
            if user_created:
                user.set_password('password123')  # Default password for all test users
                user.save()
                self.stdout.write(f'Created user: {user.username}')
            
            # Get programme
            programme = Programme.objects.get(name=student_data['programme'])
            
            # Create student profile
            student, student_created = Student.objects.get_or_create(
                user=user,
                defaults={
                    'programme': programme,
                    'phone_number': student_data['phone_number'],
                    'date_of_birth': student_data['date_of_birth'],
                    'previous_school': student_data['previous_school'],
                    'wassce_year': student_data['wassce_year'],
                    'index_number': student_data['index_number'],
                    'is_active': True
                }
            )
            
            if student_created:
                self.stdout.write(f'Created student: {student.user.get_full_name()} - {programme.get_name_display()}')
        
        self.stdout.write(self.style.SUCCESS('\nSample students created successfully!'))
        self.stdout.write('\nLogin credentials for testing:')
        self.stdout.write('Username: john_doe, Password: password123 (General Science)')
        self.stdout.write('Username: jane_smith, Password: password123 (General Arts)')
        self.stdout.write('Username: kwame_asante, Password: password123 (Business)')
        self.stdout.write('Username: akosua_mensah, Password: password123 (Visual Arts)')
        self.stdout.write('\nAdmin login:')
        self.stdout.write('Username: admin, Password: admin123')