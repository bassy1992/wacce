from django.contrib import admin
from .models import (
    Subject, ProgrammeSubject, Topic, Lesson, LessonResource, 
    Announcement, Instructor, InstructorSpecialty
)


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


class InstructorSpecialtyInline(admin.TabularInline):
    model = InstructorSpecialty
    extra = 1
    fields = ['subject', 'is_primary']


@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'position_title', 'years_experience', 'is_active', 'is_featured', 'display_order']
    list_filter = ['role', 'is_active', 'is_featured', 'title']
    search_fields = ['first_name', 'last_name', 'position_title', 'email']
    ordering = ['display_order', 'last_name']
    inlines = [InstructorSpecialtyInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'first_name', 'last_name', 'role', 'position_title')
        }),
        ('Qualifications', {
            'fields': ('highest_degree', 'institution', 'years_experience')
        }),
        ('Profile', {
            'fields': ('bio', 'photo', 'email')
        }),
        ('Display Settings', {
            'fields': ('display_order', 'is_active', 'is_featured'),
            'description': 'Control how and where this instructor appears'
        }),
    )
    
    def full_name(self, obj):
        return obj.full_name
    full_name.short_description = 'Name'


@admin.register(InstructorSpecialty)
class InstructorSpecialtyAdmin(admin.ModelAdmin):
    list_display = ['instructor', 'subject', 'is_primary']
    list_filter = ['is_primary', 'subject__subject_type']
    search_fields = ['instructor__first_name', 'instructor__last_name', 'subject__name']
    ordering = ['instructor', '-is_primary', 'subject']
