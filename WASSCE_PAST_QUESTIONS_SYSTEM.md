# WASSCE Past Questions System

## Overview
A comprehensive system for managing and practicing WASSCE past questions spanning 20 years, with support for multiple choice and essay questions.

## Database Models Created

### 1. PastQuestionPaper
Main container for past papers
- Subject, Year, Paper Number
- Paper Type (Objective, Essay, Practical, Mixed)
- Duration, Total Marks
- Instructions

### 2. MultipleChoiceQuestion (MCQ)
Objective questions with 4-5 options
- Question text and optional image
- Options A, B, C, D, E
- Correct answer
- Explanation and marking scheme
- Difficulty level

### 3. EssayQuestion
Theory/Essay questions
- Question text and optional image
- Section (A, B, C, etc.)
- Marks allocation
- Marking scheme and sample answer
- Support for sub-questions

### 4. EssaySubQuestion
Sub-parts of essay questions (a, b, c, i, ii, etc.)
- Individual marks
- Marking scheme

### 5. StudentAttempt
Track student practice sessions
- Start/completion time
- Status (in progress, completed, abandoned)
- Total score and percentage
- Time spent

### 6. MCQAnswer & EssayAnswer
Store student responses
- Selected answers
- Auto-grading for MCQ
- Manual/AI grading for essays

### 7. QuestionBookmark
Allow students to save questions for review
- Notes and annotations

## Features

### For Students
✅ Browse past papers by subject and year (2004-2024)
✅ Practice with timed or untimed mode
✅ Instant feedback for MCQ
✅ Submit essays for grading
✅ Track progress and scores
✅ Bookmark difficult questions
✅ Review marking schemes
✅ View performance analytics

### For Administrators
✅ Add/edit past papers
✅ Upload questions with images
✅ Set marking schemes
✅ Grade essay answers
✅ View student performance
✅ Generate reports

## Admin Interface

Access at: `http://localhost:8000/admin/`

**Sections:**
- Past Question Papers
- Multiple Choice Questions
- Essay Questions
- Student Attempts
- Answers & Grading
- Bookmarks

## Next Steps

### 1. Create API Views (`past_questions/views.py`)
```python
- list_papers() - Get all papers by subject/year
- get_paper_detail() - Get specific paper with questions
- start_attempt() - Begin practice session
- submit_mcq_answer() - Submit MCQ answer
- submit_essay_answer() - Submit essay answer
- complete_attempt() - Finish and calculate score
- get_attempt_results() - View results
- bookmark_question() - Save question
```

### 2. Create URL Routes (`past_questions/urls.py`)
```python
/api/past-questions/papers/
/api/past-questions/papers/<id>/
/api/past-questions/attempts/
/api/past-questions/attempts/<id>/submit-mcq/
/api/past-questions/attempts/<id>/submit-essay/
/api/past-questions/attempts/<id>/complete/
/api/past-questions/bookmarks/
```

### 3. Frontend Pages

#### Main Page (`/past-questions`)
- Subject filter
- Year filter (2004-2024)
- Paper type filter
- Grid/List view of papers
- Start practice button

#### Practice Page (`/past-questions/practice/<id>`)
- Timer (optional)
- Question navigation
- MCQ with radio buttons
- Essay with text editor
- Bookmark button
- Submit button
- Progress indicator

#### Results Page (`/past-questions/results/<attempt_id>`)
- Score breakdown
- Correct/incorrect answers
- Marking scheme
- Time spent
- Performance chart
- Retry button

#### My Attempts Page (`/past-questions/my-attempts`)
- History of all attempts
- Scores and dates
- Continue incomplete attempts
- View past results

## Data Population

### Sample Command to Populate
```bash
python manage.py populate_past_questions
```

This will create:
- 20 years of papers (2004-2024)
- Core subjects (English, Math, Science, Social Studies)
- Elective subjects
- 40-60 MCQ per objective paper
- 8-12 essay questions per theory paper
- Marking schemes

## Database Schema

```
PastQuestionPaper (1) -----> (Many) MultipleChoiceQuestion
                  (1) -----> (Many) EssayQuestion
                                (1) -----> (Many) EssaySubQuestion

User (1) -----> (Many) StudentAttempt
                    (1) -----> (Many) MCQAnswer
                    (1) -----> (Many) EssayAnswer

User (1) -----> (Many) QuestionBookmark
```

## File Structure

```
wacebackend/
├── past_questions/
│   ├── __init__.py
│   ├── apps.py
│   ├── models.py          ✅ Created
│   ├── admin.py           ✅ Created
│   ├── views.py           ⏳ Next
│   ├── urls.py            ⏳ Next
│   ├── serializers.py     ⏳ Next
│   └── management/
│       └── commands/
│           └── populate_past_questions.py  ⏳ Next
│
wacefront/
└── client/
    └── pages/
        ├── PastQuestions.tsx          ⏳ Next
        ├── PastQuestionPractice.tsx   ⏳ Next
        ├── PastQuestionResults.tsx    ⏳ Next
        └── MyAttempts.tsx             ⏳ Next
```

## API Response Examples

### List Papers
```json
{
  "papers": [
    {
      "id": 1,
      "subject": "English Language",
      "year": 2024,
      "paper_number": 1,
      "paper_type": "objective",
      "title": "WASSCE 2024 English Language Paper 1",
      "duration_minutes": 90,
      "total_marks": 60,
      "question_count": 60
    }
  ]
}
```

### Paper Detail
```json
{
  "id": 1,
  "subject": "English Language",
  "year": 2024,
  "instructions": "Answer all questions...",
  "mcq_questions": [
    {
      "id": 1,
      "question_number": 1,
      "question_text": "Choose the correct option...",
      "option_a": "...",
      "option_b": "...",
      "option_c": "...",
      "option_d": "...",
      "marks": 1
    }
  ],
  "essay_questions": [
    {
      "id": 1,
      "question_number": 1,
      "section": "A",
      "question_text": "Write an essay on...",
      "marks": 20,
      "sub_questions": []
    }
  ]
}
```

## Grading System

### MCQ (Auto-graded)
- Instant feedback
- Correct answer shown
- Explanation provided

### Essay (Manual/AI-graded)
- Submitted for review
- Teacher grades based on marking scheme
- Feedback provided
- Score out of total marks

## Performance Tracking

Students can view:
- Overall success rate
- Subject-wise performance
- Year-wise trends
- Time management
- Weak areas
- Improvement over time

## Mobile Responsive
- Works on all devices
- Touch-friendly interface
- Offline capability (future)

---

**Status**: Database models created ✅
**Next**: Create API views and frontend pages
