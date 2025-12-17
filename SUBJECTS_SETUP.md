# Subjects Setup for Ghana SHS System

## Overview

This system implements the Ghana Senior High School (SHS) curriculum structure where:

1. **Core Subjects** - Available for ALL students regardless of programme
2. **Elective Subjects** - Specific to each programme

## Core Subjects (All Students)

All SHS students study these core subjects:

- English Language
- Mathematics (Core)
- Integrated Science
- Social Studies
- ICT/Computing

## Programmes and Their Elective Subjects

### 1. General Arts
**Focus:** Humanities and social sciences

**Electives:**
- Economics
- Geography
- History
- Elective Mathematics
- Literature-in-English
- French
- Government
- Christian Religious Studies

**Career Paths:** Law, social sciences, education, humanities

---

### 2. General Science
**Focus:** Science and technology fields

**Electives:**
- Physics
- Chemistry
- Biology
- Elective Mathematics
- Geography
- Elective ICT/Computing

**Career Paths:** Medicine, engineering, natural sciences, technology

---

### 3. Business
**Focus:** Commerce and business-related careers

**Electives:**
- Financial Accounting
- Business Management
- Economics
- Costing
- Elective Mathematics

**Career Paths:** Business, finance, accounting, entrepreneurship

---

### 4. Home Economics
**Focus:** Practical life and household management

**Electives:**
- Management in Living
- Food and Nutrition
- Clothing and Textiles
- Chemistry
- Biology

**Career Paths:** Hospitality, nutrition, fashion, home management

---

### 5. Visual Arts
**Focus:** Artistic skills and creative expression

**Electives:**
- Graphic Design
- General Knowledge in Art
- Textiles
- Ceramics
- Leather Work
- Economics

**Career Paths:** Design, fine arts, creative industries

---

### 6. Agricultural Science
**Focus:** Agricultural sciences and farming practices

**Electives:**
- General Agriculture
- Animal Husbandry
- Crop Science
- Agricultural Economics
- Elective Mathematics
- Chemistry

**Career Paths:** Agriculture, farming, agribusiness

---

## Setup Instructions

### 1. Populate the Database

Run the population script to create all subjects and assign them to programmes:

**On Windows:**
```bash
populate_subjects.bat
```

**On Linux/Mac:**
```bash
cd wacebackend
python populate_subjects.py
```

**On Railway (Production):**
```bash
railway run python wacebackend/populate_subjects.py
```

### 2. Verify the Setup

The script will show:
- Number of programmes created
- Number of core subjects created
- Number of elective subjects created
- Subject assignments per programme

### 3. Access Student Dashboard

Students can access their dashboard at:
```
GET /api/students/dashboard/
```

**Response includes:**
- Student information
- Programme details
- Core subjects (available to all)
- Elective subjects (specific to their programme)
- Progress tracking for each subject

## API Endpoints

### Get Student Dashboard
```http
GET /api/students/dashboard/
Authorization: Bearer <token>
```

**Response:**
```json
{
  "student": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone_number": "+233123456789",
    "index_number": "12345678",
    "enrollment_date": "2024-01-15T10:30:00Z"
  },
  "programme": {
    "id": 1,
    "name": "general_arts",
    "display_name": "General Arts",
    "description": "Arts and humanities...",
    "duration_months": 12
  },
  "subjects": {
    "core": [
      {
        "id": 1,
        "name": "English Language",
        "code": "ENG",
        "description": "Core English Language for all SHS students",
        "topics_count": 10,
        "is_required": true,
        "progress": {
          "current_grade": "B",
          "target_grade": "A",
          "progress_percentage": 45,
          "lessons_completed": 15,
          "total_lessons": 30
        }
      }
      // ... more core subjects
    ],
    "elective": [
      {
        "id": 6,
        "name": "Economics",
        "code": "ECON",
        "description": "Economics for General Arts",
        "topics_count": 8,
        "is_required": true,
        "progress": {
          "current_grade": "",
          "target_grade": "A",
          "progress_percentage": 0,
          "lessons_completed": 0,
          "total_lessons": 8
        }
      }
      // ... more elective subjects
    ]
  },
  "summary": {
    "total_subjects": 13,
    "core_subjects_count": 5,
    "elective_subjects_count": 8
  }
}
```

### Get All Programmes with Subjects
```http
GET /api/courses/programmes/
```

### Get Specific Programme Details
```http
GET /api/courses/programmes/<programme_id>/
```

### Get Subject Details
```http
GET /api/courses/subjects/<subject_id>/
```

## Database Models

### Subject
- `name`: Subject name
- `code`: Unique subject code
- `description`: Subject description
- `subject_type`: 'core' or 'elective'
- `is_active`: Boolean

### ProgrammeSubject
Links programmes to subjects with additional metadata:
- `programme`: Foreign key to Programme
- `subject`: Foreign key to Subject
- `is_required`: Boolean (always True for core subjects)
- `order`: Display order

### StudentProgress
Tracks student progress in each subject:
- `student`: Foreign key to Student
- `subject`: Subject name
- `current_grade`: Current grade
- `target_grade`: Target grade
- `progress_percentage`: 0-100
- `lessons_completed`: Number of completed lessons
- `total_lessons`: Total lessons in subject

## Frontend Integration

When displaying the student dashboard:

1. **Show Core Subjects Section**
   - Label: "Core Subjects (All Students)"
   - Display all subjects from `subjects.core`

2. **Show Elective Subjects Section**
   - Label: "Elective Subjects (Your Programme)"
   - Display all subjects from `subjects.elective`

3. **Display Progress**
   - Show progress bar for each subject
   - Display current grade and target grade
   - Show lessons completed / total lessons

## Notes

- Core subjects are automatically assigned to ALL programmes
- Each programme has its own set of elective subjects
- Students can only see subjects for their enrolled programme
- Progress tracking is optional and can be updated as students complete lessons
