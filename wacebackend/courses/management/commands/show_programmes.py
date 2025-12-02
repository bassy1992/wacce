from django.core.management.base import BaseCommand
from django.db import models
from students.models import Programme
from courses.models import Subject


class Command(BaseCommand):
    help = 'Display all programmes with their subjects and topics'

    def add_arguments(self, parser):
        parser.add_argument(
            '--detailed',
            action='store_true',
            help='Show topics for each subject',
        )

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.SUCCESS('🎓 WACE Online Senior High School Programmes\n')
        )
        
        for i, programme in enumerate(Programme.objects.all(), 1):
            # Programme header
            self.stdout.write(f"{i}️⃣ {programme.get_name_display()}")
            self.stdout.write(f"{programme.description}\n")
            
            # Core subjects
            core_subjects = Subject.objects.filter(
                programme=programme, 
                subject_type='core'
            ).prefetch_related('topics').order_by('order')
            
            if core_subjects:
                self.stdout.write(self.style.WARNING("Core Subjects:"))
                for subject in core_subjects:
                    topics_count = subject.topics.count()
                    self.stdout.write(f"  • {subject.name} ({topics_count} topics)")
                    
                    if options['detailed'] and topics_count > 0:
                        for topic in subject.topics.all()[:3]:  # Show first 3 topics
                            self.stdout.write(f"    - {topic.title}")
                        if topics_count > 3:
                            self.stdout.write(f"    ... and {topics_count - 3} more")
                self.stdout.write("")
            
            # Elective subjects
            elective_subjects = Subject.objects.filter(
                programme=programme, 
                subject_type='elective'
            ).prefetch_related('topics').order_by('order')
            
            if elective_subjects:
                self.stdout.write(self.style.WARNING("Electives:"))
                for subject in elective_subjects:
                    topics_count = subject.topics.count()
                    self.stdout.write(f"  • {subject.name} ({topics_count} topics)")
                    
                    if options['detailed'] and topics_count > 0:
                        for topic in subject.topics.all()[:3]:  # Show first 3 topics
                            self.stdout.write(f"    - {topic.title}")
                        if topics_count > 3:
                            self.stdout.write(f"    ... and {topics_count - 3} more")
                self.stdout.write("")
            
            self.stdout.write("-" * 50)
        
        # Summary
        total_programmes = Programme.objects.count()
        total_subjects = Subject.objects.count()
        total_topics = Subject.objects.aggregate(
            total=models.Count('topics')
        )['total'] or 0
        
        self.stdout.write(
            self.style.SUCCESS(f"\n📊 Summary:")
        )
        self.stdout.write(f"Total Programmes: {total_programmes}")
        self.stdout.write(f"Total Subjects: {total_subjects}")
        self.stdout.write(f"Total Topics: {total_topics}")
        
        if not options['detailed']:
            self.stdout.write(f"\nUse --detailed to see topics for each subject")