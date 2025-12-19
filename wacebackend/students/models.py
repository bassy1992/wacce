from django.db import models
from django.contrib.auth.models import User

class Programme(models.Model):
    PROGRAMME_CHOICES = [
        ('general_science', 'General Science'),
        ('general_arts', 'General Arts'),
        ('business', 'Business'),
        ('visual_arts', 'Visual Arts'),
        ('home_economics', 'Home Economics'),
        ('agricultural_science', 'Agricultural Science'),
    ]
    
    name = models.CharField(max_length=100, choices=PROGRAMME_CHOICES, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_months = models.IntegerField(default=12)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.get_name_display()

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    date_of_birth = models.DateField()
    programme = models.ForeignKey(Programme, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    # Academic info
    previous_school = models.CharField(max_length=200)
    wassce_year = models.IntegerField()
    index_number = models.CharField(max_length=20, unique=True)
    
    # Email notification preferences
    email_course_updates = models.BooleanField(default=True)
    email_assignment_reminders = models.BooleanField(default=True)
    email_announcements = models.BooleanField(default=True)
    email_weekly_summary = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.programme.name}"

class StudentProgress(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='progress')
    subject = models.CharField(max_length=100)
    current_grade = models.CharField(max_length=2, blank=True)
    target_grade = models.CharField(max_length=2)
    progress_percentage = models.IntegerField(default=0)
    lessons_completed = models.IntegerField(default=0)
    total_lessons = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['student', 'subject']
    
    def __str__(self):
        return f"{self.student.user.username} - {self.subject}: {self.progress_percentage}%"