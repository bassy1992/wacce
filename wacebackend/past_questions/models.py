from django.db import models
from django.contrib.auth.models import User
from courses.models import Subject, Topic


class QuestionTopic(models.Model):
    """Topics/Categories for organizing past questions"""
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='question_topics')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['subject', 'order', 'name']
        unique_together = ['subject', 'name']
    
    def __str__(self):
        return f"{self.subject.name} - {self.name}"


class PastQuestionPaper(models.Model):
    """WASSCE Past Question Papers"""
    PAPER_TYPES = [
        ('objective', 'Objective (Multiple Choice)'),
        ('essay', 'Essay'),
        ('practical', 'Practical'),
        ('mixed', 'Mixed (Objective + Essay)'),
    ]
    
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='past_papers')
    year = models.IntegerField()
    paper_number = models.IntegerField(default=1)  # Paper 1, Paper 2, etc.
    paper_type = models.CharField(max_length=20, choices=PAPER_TYPES)
    title = models.CharField(max_length=200)
    instructions = models.TextField(blank=True)
    duration_minutes = models.IntegerField(default=180)  # 3 hours default
    total_marks = models.IntegerField(default=100)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-year', 'subject', 'paper_number']
        unique_together = ['subject', 'year', 'paper_number']
    
    def __str__(self):
        return f"{self.subject.name} {self.year} - Paper {self.paper_number}"


class MultipleChoiceQuestion(models.Model):
    """Multiple Choice Questions (Objective)"""
    paper = models.ForeignKey(PastQuestionPaper, on_delete=models.CASCADE, related_name='mcq_questions')
    topic = models.ForeignKey(QuestionTopic, on_delete=models.SET_NULL, null=True, blank=True, related_name='mcq_questions')
    question_number = models.IntegerField()
    question_text = models.TextField()
    question_image = models.ImageField(upload_to='questions/images/', blank=True, null=True)
    
    option_a = models.TextField()
    option_b = models.TextField()
    option_c = models.TextField()
    option_d = models.TextField()
    option_e = models.TextField(blank=True)  # Some questions have 5 options
    
    correct_answer = models.CharField(max_length=1, choices=[
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
        ('E', 'Option E'),
    ])
    
    explanation = models.TextField(blank=True)
    marks = models.IntegerField(default=1)
    difficulty = models.CharField(max_length=20, choices=[
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ], default='medium')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['paper', 'question_number']
        unique_together = ['paper', 'question_number']
    
    def __str__(self):
        return f"{self.paper} - Q{self.question_number}"


class EssayQuestion(models.Model):
    """Essay Questions (Theory)"""
    paper = models.ForeignKey(PastQuestionPaper, on_delete=models.CASCADE, related_name='essay_questions')
    topic = models.ForeignKey(QuestionTopic, on_delete=models.SET_NULL, null=True, blank=True, related_name='essay_questions')
    question_number = models.IntegerField()
    section = models.CharField(max_length=50, blank=True)  # Section A, B, C, etc.
    question_text = models.TextField()
    question_image = models.ImageField(upload_to='questions/images/', blank=True, null=True)
    
    # Sub-questions (a, b, c, etc.)
    has_sub_questions = models.BooleanField(default=False)
    
    marks = models.IntegerField(default=10)
    suggested_time_minutes = models.IntegerField(default=15)
    
    # Marking scheme
    marking_scheme = models.TextField(blank=True, help_text="Key points for marking")
    sample_answer = models.TextField(blank=True)
    
    difficulty = models.CharField(max_length=20, choices=[
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ], default='medium')
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['paper', 'section', 'question_number']
        unique_together = ['paper', 'question_number']
    
    def __str__(self):
        return f"{self.paper} - Q{self.question_number}"


class EssaySubQuestion(models.Model):
    """Sub-questions for essay questions (a, b, c, etc.)"""
    essay_question = models.ForeignKey(EssayQuestion, on_delete=models.CASCADE, related_name='sub_questions')
    sub_number = models.CharField(max_length=5)  # a, b, c, i, ii, etc.
    question_text = models.TextField()
    marks = models.IntegerField(default=5)
    marking_scheme = models.TextField(blank=True)
    
    class Meta:
        ordering = ['essay_question', 'sub_number']
    
    def __str__(self):
        return f"{self.essay_question} ({self.sub_number})"


class StudentAttempt(models.Model):
    """Track student attempts at past papers"""
    ATTEMPT_STATUS = [
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('abandoned', 'Abandoned'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='past_paper_attempts')
    paper = models.ForeignKey(PastQuestionPaper, on_delete=models.CASCADE, related_name='attempts')
    
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=ATTEMPT_STATUS, default='in_progress')
    
    # Scoring
    total_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    # Time tracking
    time_spent_minutes = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.paper} ({self.status})"


class MCQAnswer(models.Model):
    """Student answers for multiple choice questions"""
    attempt = models.ForeignKey(StudentAttempt, on_delete=models.CASCADE, related_name='mcq_answers')
    question = models.ForeignKey(MultipleChoiceQuestion, on_delete=models.CASCADE)
    selected_answer = models.CharField(max_length=1, choices=[
        ('A', 'Option A'),
        ('B', 'Option B'),
        ('C', 'Option C'),
        ('D', 'Option D'),
        ('E', 'Option E'),
    ])
    is_correct = models.BooleanField(default=False)
    answered_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['attempt', 'question']
    
    def save(self, *args, **kwargs):
        self.is_correct = (self.selected_answer == self.question.correct_answer)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.attempt.student.username} - Q{self.question.question_number}: {self.selected_answer}"


class EssayAnswer(models.Model):
    """Student answers for essay questions"""
    attempt = models.ForeignKey(StudentAttempt, on_delete=models.CASCADE, related_name='essay_answers')
    question = models.ForeignKey(EssayQuestion, on_delete=models.CASCADE)
    answer_text = models.TextField()
    
    # Grading (can be done by teacher or AI)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    feedback = models.TextField(blank=True)
    graded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='graded_essays')
    graded_at = models.DateTimeField(null=True, blank=True)
    
    answered_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['attempt', 'question']
    
    def __str__(self):
        return f"{self.attempt.student.username} - Q{self.question.question_number}"


class QuestionBookmark(models.Model):
    """Allow students to bookmark questions for review"""
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarked_questions')
    paper = models.ForeignKey(PastQuestionPaper, on_delete=models.CASCADE)
    mcq_question = models.ForeignKey(MultipleChoiceQuestion, on_delete=models.CASCADE, null=True, blank=True)
    essay_question = models.ForeignKey(EssayQuestion, on_delete=models.CASCADE, null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.paper}"
