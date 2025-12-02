from django.db import models
from students.models import Programme


class Subject(models.Model):
    SUBJECT_TYPES = [
        ('core', 'Core Subject'),
        ('elective', 'Elective Subject'),
    ]
    
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField()
    subject_type = models.CharField(max_length=10, choices=SUBJECT_TYPES, default='elective')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['subject_type', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.get_subject_type_display()})"


class ProgrammeSubject(models.Model):
    """Many-to-many relationship between programmes and subjects with additional fields"""
    programme = models.ForeignKey(Programme, on_delete=models.CASCADE, related_name='programme_subjects')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='programme_subjects')
    is_required = models.BooleanField(default=True)  # For core subjects, this is always True
    order = models.IntegerField(default=0)  # For ordering subjects within a programme
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['programme', 'subject']
        ordering = ['programme', 'subject__subject_type', 'order']
    
    def __str__(self):
        return f"{self.programme.get_name_display()} - {self.subject.name}"


class Topic(models.Model):
    """Topics are like chapters or lesson titles within a subject"""
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)  # For ordering topics within a subject
    estimated_duration_hours = models.IntegerField(default=1)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['subject', 'order']
        unique_together = ['subject', 'order']
    
    def __str__(self):
        return f"{self.subject.name} - {self.title}"


class Lesson(models.Model):
    """Individual lessons within a topic"""
    LESSON_TYPES = [
        ('video', 'Video Lesson'),
        ('reading', 'Reading Material'),
        ('quiz', 'Quiz'),
        ('assignment', 'Assignment'),
        ('exercise', 'Exercise'),
    ]
    
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    lesson_type = models.CharField(max_length=20, choices=LESSON_TYPES)
    content = models.TextField(blank=True)  # For reading materials
    video_url = models.URLField(blank=True)  # For video lessons
    video_duration_minutes = models.IntegerField(null=True, blank=True)
    order = models.IntegerField(default=0)
    is_free = models.BooleanField(default=False)  # Some lessons can be free previews
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['topic', 'order']
        unique_together = ['topic', 'order']
    
    def __str__(self):
        return f"{self.topic.title} - {self.title}"


class LessonResource(models.Model):
    """Resources attached to lessons"""
    RESOURCE_TYPES = [
        ('pdf', 'PDF Document'),
        ('image', 'Image'),
        ('audio', 'Audio File'),
        ('link', 'External Link'),
        ('video', 'Video File'),
    ]
    
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='resources')
    title = models.CharField(max_length=200)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    file = models.FileField(upload_to='lesson_resources/', blank=True)
    url = models.URLField(blank=True)  # For external links
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.lesson.title} - {self.title}"