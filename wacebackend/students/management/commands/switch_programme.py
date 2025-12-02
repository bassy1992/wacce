from django.core.management.base import BaseCommand
from students.models import Student, Programme


class Command(BaseCommand):
    help = 'Switch a student to a different programme'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str, help='Username of the student')
        parser.add_argument('programme', type=str, help='Programme name (e.g., general_arts, general_science)')

    def handle(self, *args, **options):
        username = options['username']
        programme_name = options['programme']
        
        try:
            # Get the student
            student = Student.objects.get(user__username=username)
            old_programme = student.programme.get_name_display()
            
            # Get the new programme
            programme = Programme.objects.get(name=programme_name)
            
            # Update the student's programme
            student.programme = programme
            student.save()
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully switched {username} from {old_programme} to {programme.get_name_display()}'
                )
            )
            
        except Student.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(f'Student with username "{username}" not found')
            )
        except Programme.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(f'Programme "{programme_name}" not found')
            )
            self.stdout.write('Available programmes:')
            for prog in Programme.objects.all():
                self.stdout.write(f'  - {prog.name} ({prog.get_name_display()})')
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error: {str(e)}')
            )