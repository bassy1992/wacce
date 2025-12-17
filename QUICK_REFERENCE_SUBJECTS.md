# Quick Reference: Core & Elective Subjects

## 🚀 Quick Start

```bash
# Windows
populate_subjects.bat

# Linux/Mac
cd wacebackend && python populate_subjects.py

# Railway
railway run python wacebackend/populate_subjects.py
```

## 📚 Core Subjects (All Students)

| Subject | Code | Description |
|---------|------|-------------|
| English Language | ENG | Core English for all SHS students |
| Mathematics (Core) | MATH_CORE | Core Mathematics for all SHS students |
| Integrated Science | INT_SCI | Integrated Science for all SHS students |
| Social Studies | SOC_STD | Social Studies for all SHS students |
| ICT/Computing | ICT | Information and Communication Technology |

## 🎯 Elective Subjects by Programme

### General Arts (8 electives)
Economics • Geography • History • Elective Mathematics • Literature-in-English • French • Government • Christian Religious Studies

### General Science (6 electives)
Physics • Chemistry • Biology • Elective Mathematics • Geography • Elective ICT

### Business (5 electives)
Financial Accounting • Business Management • Economics • Costing • Elective Mathematics

### Home Economics (5 electives)
Management in Living • Food and Nutrition • Clothing and Textiles • Chemistry • Biology

### Visual Arts (6 electives)
Graphic Design • General Knowledge in Art • Textiles • Ceramics • Leather Work • Economics

### Agricultural Science (6 electives)
General Agriculture • Animal Husbandry • Crop Science • Agricultural Economics • Elective Mathematics • Chemistry

## 🔗 API Endpoints

### Get Student Dashboard
```http
GET /api/students/dashboard/
Authorization: Bearer <token>
```

**Returns:**
- Student info
- Programme details
- Core subjects (5)
- Elective subjects (programme-specific)
- Progress for each subject

### Get All Programmes
```http
GET /api/courses/programmes/
```

### Get Programme Details
```http
GET /api/courses/programmes/<id>/
```

## 💻 Frontend Usage

```typescript
import { studentsAPI } from "../../shared/api";

// Get dashboard data
const dashboardData = await studentsAPI.getDashboard();

// Access core subjects
const coreSubjects = dashboardData.subjects.core;

// Access elective subjects
const electiveSubjects = dashboardData.subjects.elective;
```

## 🎨 Dashboard Display

### Core Subjects
- Badge: Blue "Core"
- Icon: 📚
- Available to: All students

### Elective Subjects
- Badge: Purple "Elective"
- Icon: 🎯
- Available to: Programme-specific

### Progress Status
- **Excellent:** 80%+ (Green)
- **Good:** 60-79% (Blue)
- **On Track:** 40-59% (Yellow)
- **Needs Focus:** <40% (Red)

## 📊 Expected Results

After population:
```
✅ 6 Programmes
✅ 5 Core Subjects (linked to all programmes)
✅ 30+ Elective Subjects (programme-specific)
✅ 70+ Programme-Subject Links

General Arts: 5 core + 8 electives = 13 total
General Science: 5 core + 6 electives = 11 total
Business: 5 core + 5 electives = 10 total
Home Economics: 5 core + 5 electives = 10 total
Visual Arts: 5 core + 6 electives = 11 total
Agricultural Science: 5 core + 6 electives = 11 total
```

## 🔍 Verification

### Check Database
```python
# Django shell
python manage.py shell

from courses.models import Subject, ProgrammeSubject
from students.models import Programme

# Count subjects
print(f"Core: {Subject.objects.filter(subject_type='core').count()}")
print(f"Elective: {Subject.objects.filter(subject_type='elective').count()}")

# Check programme subjects
for prog in Programme.objects.all():
    core = prog.programme_subjects.filter(subject__subject_type='core').count()
    elec = prog.programme_subjects.filter(subject__subject_type='elective').count()
    print(f"{prog.get_name_display()}: {core} core + {elec} electives")
```

### Test Dashboard
1. Login as student
2. Go to `/dashboard`
3. Verify:
   - ✅ 5 core subjects visible
   - ✅ Programme-specific electives visible
   - ✅ Badges show "Core" and "Elective"
   - ✅ Progress bars display
   - ✅ Status indicators work

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| No subjects showing | Run `populate_subjects.py` |
| Wrong subjects | Check student's programme |
| API errors | Verify authentication |
| Progress not updating | Check StudentProgress model |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `wacebackend/populate_subjects.py` | Population script |
| `wacebackend/students/views.py` | Dashboard API |
| `wacefront/shared/api.ts` | API types & endpoints |
| `wacefront/client/pages/Dashboard.tsx` | Dashboard UI |

## 🎓 Ghana SHS Compliance

✅ Follows Ghana Education Service curriculum structure  
✅ Core subjects mandatory for all students  
✅ Electives aligned with programme requirements  
✅ Supports WASSCE preparation  

---

**Quick Links:**
- Detailed docs: `SUBJECTS_SETUP.md`
- Setup guide: `SETUP_CORE_ELECTIVES.md`
- Implementation: `IMPLEMENTATION_SUMMARY.md`
