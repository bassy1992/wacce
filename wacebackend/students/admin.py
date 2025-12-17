from django.contrib import admin
from .models import Programme, Student, StudentProgress
from courses.models import ProgrammeSubject


class ProgrammeSubjectInline(admin.TabularInline):
    model = ProgrammeSubject
    extra = 0
    fields = ['subject', 'is_required', 'order']
    ordering = ['subject__subject_type', 'order']


@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    list_display = ['get_name_display', 'price', 'duration_months', 'get_subjects_count', 'created_at']
    list_filter = ['name', 'created_at']
    search_fields = ['name']
    inlines = [ProgrammeSubjectInline]
    
    def get_name_display(self, obj):
        return obj.get_name_display()
    get_name_display.short_description = 'Programme Name'
    
    def get_subjects_count(self, obj):
        return obj.programme_subjects.count()
    get_subjects_count.short_description = 'Number of Subjects'


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'programme', 'enrollment_date', 'is_active']
    list_filter = ['programme', 'is_active', 'enrollment_date']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'index_number']
    readonly_fields = ['enrollment_date']


@admin.register(StudentProgress)
class StudentProgressAdmin(admin.ModelAdmin):
    list_display = ['student', 'subject', 'current_grade', 'target_grade', 'progress_percentage']
    list_filter = ['current_grade', 'target_grade', 'student__programme']
    search_fields = ['student__user__username', 'subject']
