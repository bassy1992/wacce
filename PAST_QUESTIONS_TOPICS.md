# Past Questions Topic Categorization

## Overview
Past questions are now organized by topics, allowing students to:
- Practice specific topics they're weak in
- See which topics appear most frequently
- Track performance by topic across different years
- Identify patterns in exam questions

## Database Structure

### QuestionTopic Model
Organizes questions into subject-specific topics

**Fields:**
- `subject` - Links to Subject (e.g., English Language)
- `name` - Topic name (e.g., "Grammar and Syntax")
- `description` - Detailed description
- `order` - Display order

**Example Topics for English Language:**
1. Grammar and Syntax
2. Vocabulary and Word Usage
3. Reading Comprehension
4. Literature and Poetry
5. Essay Writing
6. Oral Communication

### Updated Models

**MultipleChoiceQuestion**
- Added `topic` field (ForeignKey to QuestionTopic)
- Questions can now be filtered by topic

**EssayQuestion**
- Added `topic` field (ForeignKey to QuestionTopic)
- Essays categorized by topic

## Benefits for Students

### 1. Targeted Practice
Students can focus on specific topics:
```
"I'm weak in Grammar → Practice only Grammar questions from all years"
```

### 2. Topic Analysis
See which topics appear most frequently:
```
Grammar: 15 questions (2022-2024)
Vocabulary: 12 questions (2022-2024)
Reading: 10 questions (2022-2024)
```

### 3. Year-by-Year Comparison
Track how topics evolve:
```
2024: Grammar (5 questions), Vocabulary (3 questions)
2023: Grammar (6 questions), Vocabulary (4 questions)
2022: Grammar (4 questions), Vocabulary (5 questions)
```

### 4. Performance Tracking
Monitor improvement by topic:
```
Grammar: 60% → 75% → 85% (improving!)
Vocabulary: 80% → 78% → 82% (consistent)
Reading: 50% → 55% → 60% (needs work)
```

## Admin Interface

### Managing Topics
1. Go to Admin → Past Questions → Question Topics
2. Add topics for each subject
3. Set order for display
4. Add descriptions

### Assigning Topics to Questions
1. Edit any MCQ or Essay question
2. Select topic from dropdown
3. Save

### Viewing by Topic
- Filter questions by topic
- See question count per topic
- Analyze topic distribution

## Frontend Features (To Implement)

### Browse by Topic
```
English Language
├── Grammar and Syntax (15 questions, 2022-2024)
├── Vocabulary (12 questions, 2022-2024)
├── Reading Comprehension (10 questions, 2022-2024)
└── Essay Writing (8 questions, 2022-2024)
```

### Topic Performance Dashboard
```
Your Performance by Topic:
┌─────────────────────┬──────────┬──────────┐
│ Topic               │ Attempts │ Avg Score│
├─────────────────────┼──────────┼──────────┤
│ Grammar             │    5     │   85%    │
│ Vocabulary          │    3     │   78%    │
│ Reading             │    4     │   65%    │
└─────────────────────┴──────────┴──────────┘
```

### Smart Recommendations
```
Based on your performance:
✅ Strong: Grammar and Syntax (85%)
⚠️  Needs Practice: Reading Comprehension (65%)
📚 Recommended: Practice 10 more Reading questions
```

## API Endpoints (To Create)

### Get Topics by Subject
```
GET /api/past-questions/topics/?subject=english
Response: [
  {
    "id": 1,
    "name": "Grammar and Syntax",
    "description": "...",
    "question_count": 15,
    "years_covered": [2022, 2023, 2024]
  }
]
```

### Get Questions by Topic
```
GET /api/past-questions/questions/?topic=1&year=2024
Response: [
  {
    "id": 1,
    "question_text": "...",
    "topic": "Grammar and Syntax",
    "year": 2024,
    "paper": "Paper 1"
  }
]
```

### Topic Performance
```
GET /api/past-questions/performance/topics/
Response: [
  {
    "topic": "Grammar and Syntax",
    "attempts": 5,
    "avg_score": 85,
    "trend": "improving"
  }
]
```

## Sample Data

### English Language Topics
1. **Grammar and Syntax** - Sentence structure, parts of speech
2. **Vocabulary and Word Usage** - Synonyms, antonyms, context
3. **Reading Comprehension** - Passages, inference, analysis
4. **Literature and Poetry** - Literary devices, themes
5. **Essay Writing** - Composition, argumentation
6. **Oral Communication** - Speech, presentation

### Mathematics Topics
1. **Algebra** - Equations, expressions, factorization
2. **Geometry** - Shapes, angles, theorems
3. **Trigonometry** - Ratios, identities, applications
4. **Statistics** - Data analysis, probability
5. **Calculus** - Differentiation, integration

### Science Topics
1. **Matter and Energy** - States, changes, conservation
2. **Living Systems** - Biology, ecology
3. **Chemical Reactions** - Equations, stoichiometry
4. **Forces and Motion** - Mechanics, dynamics
5. **Electricity** - Circuits, current, voltage

## Usage Examples

### For Students
```python
# Practice specific topic
topic = "Grammar and Syntax"
questions = get_questions_by_topic(topic, years=[2022, 2023, 2024])
practice_session = start_practice(questions)

# View topic performance
performance = get_topic_performance(student_id, subject="English")
weak_topics = [t for t in performance if t.score < 70]
```

### For Teachers
```python
# Analyze topic difficulty
topic_stats = analyze_topic_difficulty("Grammar and Syntax")
# Shows: avg_score, pass_rate, common_mistakes

# Create targeted assignments
weak_students = get_students_weak_in_topic("Reading Comprehension")
assignment = create_assignment(topic, students=weak_students)
```

## Migration Applied
✅ Created QuestionTopic model
✅ Added topic field to MultipleChoiceQuestion
✅ Added topic field to EssayQuestion
✅ Updated admin interface
✅ Created sample data with topics

## Next Steps

### Backend
1. Create API views for topic filtering
2. Add topic performance analytics
3. Implement smart recommendations

### Frontend
1. Add topic filter to past questions page
2. Create topic performance dashboard
3. Show topic tags on questions
4. Add "Practice by Topic" feature

### Analytics
1. Track topic performance over time
2. Identify trending topics
3. Generate topic-based reports
4. Predict weak areas

---

**Status**: Database models updated ✅
**Sample Data**: 6 topics, 24 questions created ✅
**Next**: Create frontend topic browsing interface
