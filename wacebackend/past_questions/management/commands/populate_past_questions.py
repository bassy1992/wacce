from django.core.management.base import BaseCommand
from courses.models import Subject
from past_questions.models import PastQuestionPaper, MultipleChoiceQuestion
import random


class Command(BaseCommand):
    help = 'Populate past questions for all subjects (1990-2025)'

    def handle(self, *args, **kwargs):
        self.stdout.write("=" * 70)
        self.stdout.write("POPULATING PAST QUESTIONS (1990-2025)")
        self.stdout.write("=" * 70)

        # Core subjects (same for all programmes)
        core_subjects = [
            'English Language',
            'Mathematics (Core)',
            'Integrated Science',
            'Social Studies',
            'ICT/Computing'
        ]

        # General Arts electives
        general_arts_electives = [
            'Economics',
            'Geography',
            'History',
            'Elective Mathematics',
            'Literature in English',
            'French',
            'Government',
            'Christian Religious Studies'
        ]

        all_subjects = core_subjects + general_arts_electives
        years = range(1990, 2026)  # 1990 to 2025
        
        total_created = 0
        total_skipped = 0

        for subject_name in all_subjects:
            try:
                subject = Subject.objects.get(name=subject_name)
                self.stdout.write(f"\n📚 Processing: {subject.name}")
                
                for year in years:
                    # Paper 1 - Objective (MCQ)
                    paper1, created = PastQuestionPaper.objects.get_or_create(
                        subject=subject,
                        year=year,
                        paper_number=1,
                        defaults={
                            'paper_type': 'objective',
                            'title': f'WASSCE {year} {subject.name} Paper 1',
                            'instructions': 'Answer all questions. Each question carries 1 mark.',
                            'duration_minutes': 90,
                            'total_marks': 50,
                            'is_published': True
                        }
                    )
                    
                    if created:
                        total_created += 1
                        # Create 50 MCQ questions for Paper 1
                        for q_num in range(1, 51):
                            MultipleChoiceQuestion.objects.create(
                                paper=paper1,
                                question_number=q_num,
                                question_text=f'Sample question {q_num} for {subject.name} {year}',
                                option_a='Option A',
                                option_b='Option B',
                                option_c='Option C',
                                option_d='Option D',
                                correct_answer=random.choice(['A', 'B', 'C', 'D']),
                                explanation=f'This is a sample question for {subject.name}.',
                                marks=1,
                                difficulty='medium'
                            )
                    else:
                        total_skipped += 1
                    
                    # Paper 2 - Essay/Theory
                    paper2, created = PastQuestionPaper.objects.get_or_create(
                        subject=subject,
                        year=year,
                        paper_number=2,
                        defaults={
                            'paper_type': 'essay',
                            'title': f'WASSCE {year} {subject.name} Paper 2',
                            'instructions': 'Answer all questions from Section A and any three from Section B.',
                            'duration_minutes': 180,
                            'total_marks': 100,
                            'is_published': True
                        }
                    )
                    
                    if created:
                        total_created += 1
                    else:
                        total_skipped += 1
                
                self.stdout.write(f"  ✅ Created papers for {subject.name} (1990-2025)")
                
            except Subject.DoesNotExist:
                self.stdout.write(f"  ⚠️  Subject not found: {subject_name}")
                continue

        self.stdout.write("\n" + "=" * 70)
        self.stdout.write("✅ PAST QUESTIONS POPULATION COMPLETE")
        self.stdout.write("=" * 70)
        self.stdout.write(f"\n📊 Summary:")
        self.stdout.write(f"  • Papers created: {total_created}")
        self.stdout.write(f"  • Papers skipped (already exist): {total_skipped}")
        self.stdout.write(f"  • Total subjects: {len(all_subjects)}")
        self.stdout.write(f"  • Years covered: 1990-2025 (36 years)")
        self.stdout.write(f"  • Papers per subject: 72 (2 papers × 36 years)")
        self.stdout.write(f"  • Total papers: {len(all_subjects) * 72}")
        self.stdout.write("")
