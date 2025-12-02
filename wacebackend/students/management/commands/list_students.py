from django.core.management.base import BaseCommand
from students.models import Student


class Command(BaseCommand):
    help = 'List all students and their programmes'

    def handle(self, *args, **options):
        students = Student.objects.select_related('user', 'programme').all()
        
        if not students:
            self.stdout.write('No students found.')
            return
        
        self.stdout.write(
            self.style.SUCCESS('📚 Students and their Programmes:\n')
        )
        
        for student in students:
            self.stdout.write(
                f'👤 {student.user.username} ({student.user.first_name} {student.user.last_name})'
            )
            self.stdout.write(
                f'   📖 Programme: {student.programme.get_name_display()}'
            )
            self.stdout.write(
                f'   📧 Email: {student.user.email}'
            )
            self.stdout.write(
                f'   📅 Enrolled: {student.enrollment_date.strftime("%B %d, %Y")}'
            )
            self.stdout.write('')
        
        self.stdout.write(
            self.style.SUCCESS(f'Total students: {students.count()}')
        )