# Testing Guide: Core & Elective Subjects System

## Pre-Testing Setup

### 1. Run Population Script

```bash
# Windows
populate_subjects.bat

# Linux/Mac
cd wacebackend
python populate_subjects.py

# Railway
railway run python wacebackend/populate_subjects.py
```

### 2. Verify Database Population

Expected output:
```
✅ Created core subject: English Language
✅ Created core subject: Mathematics (Core)
✅ Created core subject: Integrated Science
✅ Created core subject: Social Studies
✅ Created core subject: ICT/Computing

✅ Created elective: Economics
✅ Created elective: Geography
... (more electives)

✅ Assigned English Language to General Arts
✅ Assigned Mathematics (Core) to General Arts
... (more assignments)

📊 Database Summary:
   Total Programmes: 6
   Total Subjects: 35+
   Core Subjects: 5
   Elective Subjects: 30+
   Programme-Subject Links: 66+
```

## Test Cases

### Test 1: Core Subjects for All Programmes

**Objective:** Verify all programmes have the same 5 core subjects

**Steps:**
1. Create test students for each programme
2. Login as each student
3. Navigate to `/dashboard`
4. Verify core subjects section shows:
   - English Language
   - Mathematics (Core)
   - Integrated Science
   - Social Studies
   - ICT/Computing

**Expected Result:** ✅ All students see the same 5 core subjects

---

### Test 2: Programme-Specific Electives

**Objective:** Verify each programme shows correct elective subjects

#### Test 2a: General Arts Student

**Steps:**
1. Login as General Arts student
2. Navigate to `/dashboard`
3. Check elective subjects section

**Expected Electives (8):**
- Economics
- Geography
- History
- Elective Mathematics
- Literature-in-English
- French
- Government
- Christian Religious Studies

**Expected Result:** ✅ Shows 8 electives specific to General Arts

---

#### Test 2b: General Science Student

**Steps:**
1. Login as General Science student
2. Navigate to `/dashboard`
3. Check elective subjects section

**Expected Electives (6):**
- Physics
- Chemistry
- Biology
- Elective Mathematics
- Geography
- Elective ICT

**Expected Result:** ✅ Shows 6 electives specific to General Science

---

#### Test 2c: Business Student

**Steps:**
1. Login as Business student
2. Navigate to `/dashboard`
3. Check elective subjects section

**Expected Electives (5):**
- Financial Accounting
- Business Management
- Economics
- Costing
- Elective Mathematics

**Expected Result:** ✅ Shows 5 electives specific to Business

---

### Test 3: Subject Badges and Visual Indicators

**Objective:** Verify visual distinction between core and elective subjects

**Steps:**
1. Login as any student
2. Navigate to `/dashboard`
3. Check subject cards

**Expected Results:**
- ✅ Core subjects have blue "Core" badge
- ✅ Core subjects show 📚 emoji
- ✅ Elective subjects have purple "Elective" badge
- ✅ Elective subjects show 🎯 emoji
- ✅ Hover effects work (scale up, shadow increase)

---

### Test 4: Progress Tracking

**Objective:** Verify progress bars and status indicators work

**Steps:**
1. Login as student
2. Navigate to `/dashboard`
3. Check each subject card

**Expected Results:**
- ✅ Progress bar displays (0-100%)
- ✅ Status badge shows:
  - Green "Excellent" for 80%+
  - Blue "Good" for 60-79%
  - Yellow "On Track" for 40-59%
  - Red "Needs Focus" for <40%
- ✅ Grade displays (or "N/A" if not set)

---

### Test 5: Dashboard API Response

**Objective:** Verify API returns correct data structure

**Steps:**
1. Get authentication token
2. Make API request:
```bash
curl -X GET http://localhost:8000/api/students/dashboard/ \
  -H "Authorization: Bearer <token>"
```

**Expected Response Structure:**
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
    "description": "...",
    "duration_months": 12
  },
  "subjects": {
    "core": [
      {
        "id": 1,
        "name": "English Language",
        "code": "ENG",
        "description": "...",
        "topics_count": 0,
        "is_required": true,
        "progress": {
          "current_grade": "",
          "target_grade": "",
          "progress_percentage": 0,
          "lessons_completed": 0,
          "total_lessons": 0
        }
      }
      // ... 4 more core subjects
    ],
    "elective": [
      // ... programme-specific electives
    ]
  },
  "summary": {
    "total_subjects": 13,
    "core_subjects_count": 5,
    "elective_subjects_count": 8
  }
}
```

**Expected Result:** ✅ API returns correct structure with all fields

---

### Test 6: Subject Count Verification

**Objective:** Verify correct number of subjects per programme

**Steps:**
1. Login as student from each programme
2. Check dashboard summary

**Expected Counts:**
- General Arts: 5 core + 8 electives = 13 total
- General Science: 5 core + 6 electives = 11 total
- Business: 5 core + 5 electives = 10 total
- Home Economics: 5 core + 5 electives = 10 total
- Visual Arts: 5 core + 6 electives = 11 total
- Agricultural Science: 5 core + 6 electives = 11 total

**Expected Result:** ✅ Each programme shows correct subject count

---

### Test 7: Authentication & Authorization

**Objective:** Verify security and access control

**Steps:**
1. Try accessing dashboard without login
2. Try accessing another student's dashboard

**Expected Results:**
- ✅ Unauthenticated users redirected to login
- ✅ Students can only see their own dashboard
- ✅ API returns 401 for unauthenticated requests
- ✅ API returns 403 for unauthorized access

---

### Test 8: Subject Navigation

**Objective:** Verify clicking subjects navigates correctly

**Steps:**
1. Login as student
2. Navigate to `/dashboard`
3. Click on any subject card

**Expected Results:**
- ✅ Navigates to subject detail page
- ✅ URL format: `/subject/<subject-name>`
- ✅ Subject name is URL-friendly (lowercase, hyphens)

---

### Test 9: Responsive Design

**Objective:** Verify dashboard works on different screen sizes

**Steps:**
1. Login as student
2. Navigate to `/dashboard`
3. Test on different viewports:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)

**Expected Results:**
- ✅ Subject cards stack properly on mobile
- ✅ 2-column grid on desktop
- ✅ All elements readable and accessible
- ✅ No horizontal scrolling

---

### Test 10: Error Handling

**Objective:** Verify graceful error handling

**Test 10a: No Programme Assigned**
1. Create student without programme
2. Login and navigate to dashboard

**Expected:** ✅ Shows error message with troubleshooting steps

**Test 10b: API Failure**
1. Stop backend server
2. Try loading dashboard

**Expected:** ✅ Shows error message with retry option

**Test 10c: No Subjects Populated**
1. Clear ProgrammeSubject table
2. Try loading dashboard

**Expected:** ✅ Shows empty state or error message

---

## Database Verification Tests

### Test 11: Check Core Subject Links

**SQL Query:**
```sql
SELECT 
    p.name as programme,
    COUNT(ps.id) as core_subjects
FROM students_programme p
LEFT JOIN courses_programmesubject ps ON ps.programme_id = p.id
LEFT JOIN courses_subject s ON s.id = ps.subject_id
WHERE s.subject_type = 'core'
GROUP BY p.name;
```

**Expected Result:** Each programme has 5 core subjects

---

### Test 12: Check Elective Subject Links

**SQL Query:**
```sql
SELECT 
    p.name as programme,
    COUNT(ps.id) as elective_subjects
FROM students_programme p
LEFT JOIN courses_programmesubject ps ON ps.programme_id = p.id
LEFT JOIN courses_subject s ON s.id = ps.subject_id
WHERE s.subject_type = 'elective'
GROUP BY p.name;
```

**Expected Results:**
- general_arts: 8
- general_science: 6
- business: 5
- home_economics: 5
- visual_arts: 6
- agricultural_science: 6

---

### Test 13: Check for Duplicate Links

**SQL Query:**
```sql
SELECT 
    programme_id,
    subject_id,
    COUNT(*) as count
FROM courses_programmesubject
GROUP BY programme_id, subject_id
HAVING COUNT(*) > 1;
```

**Expected Result:** No duplicates (empty result set)

---

## Performance Tests

### Test 14: Dashboard Load Time

**Objective:** Verify dashboard loads quickly

**Steps:**
1. Login as student
2. Navigate to `/dashboard`
3. Measure load time

**Expected Result:** ✅ Dashboard loads in < 2 seconds

---

### Test 15: API Response Time

**Objective:** Verify API responds quickly

**Steps:**
1. Make API request to `/api/students/dashboard/`
2. Measure response time

**Expected Result:** ✅ API responds in < 500ms

---

## Integration Tests

### Test 16: End-to-End User Flow

**Objective:** Test complete user journey

**Steps:**
1. User signs up with programme selection
2. User logs in
3. User navigates to dashboard
4. User sees core and elective subjects
5. User clicks on a subject
6. User views subject details

**Expected Result:** ✅ Complete flow works without errors

---

## Regression Tests

### Test 17: Existing Functionality

**Objective:** Verify existing features still work

**Tests:**
- ✅ Login/Logout works
- ✅ Signup works
- ✅ Profile page works
- ✅ Other pages load correctly
- ✅ Navigation works

---

## Test Checklist

Use this checklist to track testing progress:

- [ ] Test 1: Core subjects for all programmes
- [ ] Test 2a: General Arts electives
- [ ] Test 2b: General Science electives
- [ ] Test 2c: Business electives
- [ ] Test 3: Subject badges and visual indicators
- [ ] Test 4: Progress tracking
- [ ] Test 5: Dashboard API response
- [ ] Test 6: Subject count verification
- [ ] Test 7: Authentication & authorization
- [ ] Test 8: Subject navigation
- [ ] Test 9: Responsive design
- [ ] Test 10a: No programme assigned error
- [ ] Test 10b: API failure error
- [ ] Test 10c: No subjects populated error
- [ ] Test 11: Core subject links in database
- [ ] Test 12: Elective subject links in database
- [ ] Test 13: No duplicate links
- [ ] Test 14: Dashboard load time
- [ ] Test 15: API response time
- [ ] Test 16: End-to-end user flow
- [ ] Test 17: Existing functionality regression

---

## Bug Reporting Template

If you find issues, report them using this template:

```
**Test Case:** Test X - [Test Name]
**Expected:** [What should happen]
**Actual:** [What actually happened]
**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Environment:**
- Browser: [Chrome/Firefox/Safari]
- OS: [Windows/Mac/Linux]
- Backend: [Local/Railway]

**Screenshots:** [If applicable]
**Console Errors:** [If any]
```

---

## Success Criteria

All tests pass when:
- ✅ All students see 5 core subjects
- ✅ Each programme shows correct electives
- ✅ Visual indicators work correctly
- ✅ Progress tracking displays properly
- ✅ API returns correct data structure
- ✅ Authentication and authorization work
- ✅ No database errors or duplicates
- ✅ Performance meets requirements
- ✅ Responsive design works on all devices
- ✅ Error handling is graceful

---

**Testing Status:** Ready for Testing  
**Last Updated:** December 17, 2025
