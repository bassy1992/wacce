from django.contrib import admin
from .models import (
    QuestionTopic, PastQuestionPaper, MultipleChoiceQuestion, EssayQuestion, 
    EssaySubQuestion, StudentAttempt, MCQAnswer, EssayAnswer, QuestionBookmark
)


class MCQInline(admin.TabularInline):
    model = MultipleChoiceQuestion
    extra = 0
    fields = ['question_number', 'question_text', 'correct_answer', 'marks']


class EssayInline(admin.TabularInline):
    model = EssayQuestion
    extra = 0
    fields = ['question_number', 'section', 'question_text', 'marks']


@admin.register(PastQuestionPaper)
class PastQuestionPaperAdmin(admin.ModelAdmin):
    list_display = ['subject', 'year', 'paper_number', 'paper_type', 'is_published', 'total_marks']
    list_filter = ['subject', 'year', 'paper_type', 'is_published']
    search_fields = ['subject__name', 'title']
    ordering = ['-year', 'subject']
    inlines = [MCQInline, EssayInline]


class SubQuestionInline(admin.TabularInline):
    model = EssaySubQuestion
    extra = 0


@admin.register(QuestionTopic)
class QuestionTopicAdmin(admin.ModelAdmin):
    list_display = ['name', 'subject', 'order', 'question_count']
    list_filter = ['subject']
    search_fields = ['name', 'description']
    ordering = ['subject', 'order', 'name']
    
    def question_count(self, obj):
        mcq_count = obj.mcq_questions.count()
        essay_count = obj.essay_questions.count()
        return f"{mcq_count + essay_count} questions"
    question_count.short_description = 'Total Questions'


@admin.register(MultipleChoiceQuestion)
class MultipleChoiceQuestionAdmin(admin.ModelAdmin):
    list_display = ['paper', 'question_number', 'topic', 'correct_answer', 'difficulty', 'marks']
    list_filter = ['paper__subject', 'paper__year', 'topic', 'difficulty']
    search_fields = ['question_text', 'paper__subject__name', 'topic__name']
    ordering = ['paper', 'question_number']


@admin.register(EssayQuestion)
class EssayQuestionAdmin(admin.ModelAdmin):
    list_display = ['paper', 'question_number', 'topic', 'section', 'marks', 'difficulty']
    list_filter = ['paper__subject', 'paper__year', 'topic', 'difficulty', 'section']
    search_fields = ['question_text', 'paper__subject__name', 'topic__name']
    ordering = ['paper', 'section', 'question_number']
    inlines = [SubQuestionInline]


@admin.register(EssaySubQuestion)
class EssaySubQuestionAdmin(admin.ModelAdmin):
    list_display = ['essay_question', 'sub_number', 'marks']
    list_filter = ['essay_question__paper__subject']
    search_fields = ['question_text']


@admin.register(StudentAttempt)
class StudentAttemptAdmin(admin.ModelAdmin):
    list_display = ['student', 'paper', 'status', 'total_score', 'percentage', 'started_at']
    list_filter = ['status', 'paper__subject', 'paper__year']
    search_fields = ['student__username', 'paper__subject__name']
    readonly_fields = ['started_at', 'completed_at']
    ordering = ['-started_at']


@admin.register(MCQAnswer)
class MCQAnswerAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'question', 'selected_answer', 'is_correct']
    list_filter = ['is_correct', 'question__paper__subject']
    search_fields = ['attempt__student__username']


@admin.register(EssayAnswer)
class EssayAnswerAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'question', 'score', 'graded_by', 'graded_at']
    list_filter = ['question__paper__subject', 'graded_by']
    search_fields = ['attempt__student__username', 'answer_text']
    readonly_fields = ['answered_at']


@admin.register(QuestionBookmark)
class QuestionBookmarkAdmin(admin.ModelAdmin):
    list_display = ['student', 'paper', 'created_at']
    list_filter = ['paper__subject', 'paper__year']
    search_fields = ['student__username', 'notes']
    ordering = ['-created_at']
