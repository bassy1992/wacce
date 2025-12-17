# Quick Setup Guide: Core & Elective Subjects

## What This Does

Sets up the Ghana SHS curriculum structure where:
- **Core subjects** (English, Math, Science, Social Studies, ICT) are available to ALL students
- **Elective subjects** are specific to each programme (General Arts, General Science, Business, etc.)
- Student dashboard shows both core and elective subjects based on their programme

## Setup Steps

### 1. Run the Population Script

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

### 2. What Gets Created

The script will:
- ✅ Create 5 core subjects (for ALL programmes)
- ✅ Create elective subjects for each programme
- ✅ Link core subjects to ALL programmes
- ✅ Link elective subjects to their specific programmes

### 3. Verify the Setup

After running, you should see:
```
📊 Database Summary:
   Total Programmes: 6
   Total Subjects: 35+
   Core Subjects: 5
   Elective Subjects: 30+
   Programme-Subject Links: 70+

📋 Subjects per Programme:
   General Arts: 5 core + 8 electives = 13 total
   General Science: 5 core + 6 electives = 11 total
   Business: 5 core + 5 electives = 10 total
   ...
```

## Student Dashboard

### API Endpoint
```
GET /api/students/dashboard/
```

### What Students See

1. **Core Subjects Section** (5 subjects - same for all students)
   - English Language
   - Mathematics (Core)
   - Integrated Science
   - Social Studies
   - ICT/Computing

2. **Elective Subjects Section** (varies by programme)
   - For General Arts: Economics, Geography, History, etc.
   - For General Science: Physics, Chemistry, Biology, etc.
   - For Business: Accounting, Business Management, etc.

### Frontend Display

The dashboard automatically:
- Shows core subjects with a "Core" badge
- Shows elective subjects with an "Elective" badge
- Displays progress for each subject
- Color-codes subjects by type (blue for core, purple for elective)

## Programme-Specific Electives

### General Arts (8 electives)
Economics, Geography, History, Elective Mathematics, Literature-in-English, French, Government, Christian Religious Studies

### General Science (6 electives)
Physics, Chemistry, Biology, Elective Mathematics, Geography, Elective ICT

### Business (5 electives)
Financial Accounting, Business Management, Economics, Costing, Elective Mathematics

### Home Economics (5 electives)
Management in Living, Food and Nutrition, Clothing and Textiles, Chemistry, Biology

### Visual Arts (6 electives)
Graphic Design, General Knowledge in Art, Textiles, Ceramics, Leather Work, Economics

### Agricultural Science (6 electives)
General Agriculture, Animal Husbandry, Crop Science, Agricultural Economics, Elective Mathematics, Chemistry

## Testing

1. **Login as a student** enrolled in any programme
2. **Navigate to dashboard** (`/dashboard`)
3. **Verify you see:**
   - 5 core subjects (marked as "Core")
   - Programme-specific electives (marked as "Elective")
   - Progress tracking for each subject

## Troubleshooting

### No subjects showing?
- Run the population script
- Check the console for errors
- Verify the student has a programme assigned

### Wrong subjects showing?
- Check the student's programme in the database
- Verify ProgrammeSubject links are correct
- Re-run the population script

### API errors?
- Check Django server is running
- Verify migrations are applied: `python manage.py migrate`
- Check authentication is working

## Files Modified

### Backend
- `wacebackend/populate_subjects.py` - Population script
- `wacebackend/students/views.py` - Added dashboard endpoint
- `wacebackend/students/urls.py` - Added dashboard URL

### Frontend
- `wacefront/shared/api.ts` - Added dashboard API types and endpoint
- `wacefront/client/pages/Dashboard.tsx` - Updated to use new API

### Documentation
- `SUBJECTS_SETUP.md` - Detailed documentation
- `SETUP_CORE_ELECTIVES.md` - This quick guide

## Next Steps

After setup:
1. ✅ Populate topics for each subject
2. ✅ Add lessons to topics
3. ✅ Create past questions
4. ✅ Set up progress tracking
5. ✅ Add study materials

---

**Need help?** Check `SUBJECTS_SETUP.md` for detailed documentation.
