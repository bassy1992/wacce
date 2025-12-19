from django.contrib import admin
from .models import Subject, ProgrammeSubject, Topic, Lesson, LessonResource, Announcement


class TopicInline(admin.TabularInline):
    model = Topic
    extra = 0
    fields = ['title', 'order', 'estimated_duration_hours', 'is_published']
    ordering = ['order']


class ProgrammeSubjectInline(admin.TabularInline):
    model = ProgrammeSubject
    extra = 0
    fields = ['programme', 'is_required', 'order']


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'subject_type', 'is_active']
    list_filter = ['subject_type', 'is_active', 'created_at']
    search_fields = ['name', 'code']
    ordering = ['subject_type', 'name']
    inlines = [TopicInline, ProgrammeSubjectInline]


@admin.register(ProgrammeSubject)
class ProgrammeSubjectAdmin(admin.ModelAdmin):
    list_display = ['programme', 'subject', 'is_required', 'order']
    list_filter = ['subject__subject_type', 'is_required']
    search_fields = ['programme__name', 'subject__name']
    ordering = ['programme', 'subject__subject_type', 'order']


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0
    fields = ['title', 'lesson_type', 'video_url', 'video_duration_minutes', 'order', 'is_free']
    ordering = ['order']


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ['title', 'subject', 'order', 'estimated_duration_hours', 'is_published']
    list_filter = ['subject__subject_type', 'subject', 'is_published']
    search_fields = ['title', 'subject__name']
    ordering = ['subject', 'order']
    inlines = [LessonInline]


class LessonResourceInline(admin.TabularInline):
    model = LessonResource
    extra = 0


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'topic', 'lesson_type', 'order', 'is_free', 'has_video']
    list_filter = ['lesson_type', 'is_free', 'topic__subject__subject_type']
    search_fields = ['title', 'topic__title']
    ordering = ['topic', 'order']
    inlines = [LessonResourceInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('topic', 'title', 'lesson_type', 'order', 'is_free')
        }),
        ('Video Content', {
            'fields': ('video_url', 'video_duration_minutes'),
            'description': 'Add video URL for video lessons'
        }),
        ('Text Content', {
            'fields': ('content',),
            'description': 'Add text content for reading materials'
        }),
        ('Lesson Notes', {
            'fields': ('notes',),
            'description': 'Add detailed notes that will appear alongside the video player'
        }),
    )
    
    def has_video(self, obj):
        return bool(obj.video_url)
    has_video.boolean = True
    has_video.short_description = 'Has Video'


@admin.register(LessonResource)
class LessonResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'lesson', 'resource_type']
    list_filter = ['resource_type']
    search_fields = ['title', 'lesson__title']


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'priority', 'is_active', 'created_at', 'expires_at']
    list_filter = ['priority', 'is_active', 'created_at']
    search_fields = ['title', 'message']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'message', 'priority')
        }),
        ('Status', {
            'fields': ('is_active', 'expires_at'),
            'description': 'Set expiration date if announcement should auto-expire'
        }),
    )
