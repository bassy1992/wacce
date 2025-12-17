from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from students.models import Student


class Command(BaseCommand):
    help = 'Check user and student data'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='User email to check')

    def handle(self, *args, **options):
        email = options['email']
        
        try:
            user = User.objects.get(email=email)
            self.stdout.write(self.style.SUCCESS(f"\n✅ User found: {user.username}"))
            self.stdout.write(f"   Name: {user.first_name} {user.last_name}")
            self.stdout.write(f"   Email: {user.email}")
            
            try:
                student = Student.objects.select_related('programme').get(user=user)
                self.stdout.write(self.style.SUCCESS(f"\n✅ Student profile found"))
                self.stdout.write(f"   Programme ID: {student.programme.id}")
                self.stdout.write(f"   Programme Name: {student.programme.name}")
                self.stdout.write(f"   Programme Display: {student.programme.get_name_display()}")
                self.stdout.write(f"   Phone: {student.phone_number}")
                self.stdout.write(f"   Enrollment Date: {student.enrollment_date}")
                
            except Student.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"\n❌ No student profile found for this user"))
                
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f"\n❌ User not found with email: {email}"))
