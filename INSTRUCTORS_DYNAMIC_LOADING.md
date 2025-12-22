# Dynamic Instructor Loading - Complete Setup

## ✅ What's Been Done

The instructor/team section now loads dynamically from the database instead of being hardcoded!

### Backend (Already Complete)
- ✅ `Instructor` model exists in `wacebackend/courses/models.py`
- ✅ `InstructorSpecialty` model for linking instructors to subjects
- ✅ API endpoint: `/api/courses/instructors/` (with optional `?featured=true`)
- ✅ Returns full instructor data with specialties

### Frontend (Just Updated)
- ✅ `TeamSection` component loads from API
- ✅ `About.tsx` page now uses dynamic `TeamSection` component
- ✅ API types defined in `shared/api.ts`
- ✅ Loading states and error handling included

## 🚀 How to Use

### 1. Populate Instructors (First Time)

Run the populate script to add instructors to your database:

```bash
# Local development
python populate_instructors.py

# Or on Railway
python wacebackend/populate_instructors.py
```

This will create 4 sample instructors:
- Dr. Kwame Asante (Principal & Mathematics)
- Mrs. Akosua Mensah (Academic Director & English)
- Mr. John Boateng (Science Department Head)
- Ms. Grace Owusu (Business Studies Coordinator)

### 2. Manage Instructors via Django Admin

Go to: `http://localhost:8000/admin/courses/instructor/`

You can:
- Add new instructors
- Edit existing ones
- Upload photos
- Set display order
- Mark as featured (for homepage)
- Add/remove specialties

### 3. Test the API

```bash
# Get all instructors
curl http://localhost:8000/api/courses/instructors/

# Get only featured instructors
curl http://localhost:8000/api/courses/instructors/?featured=true
```

### 4. View on Frontend

The team section appears on:
- **About Page**: `/about` - Shows all instructors
- **Homepage** (if you add TeamSection): Shows only featured instructors

## 📊 Instructor Model Fields

```python
# Basic Info
- title: Dr., Prof., Mr., Mrs., Ms.
- first_name
- last_name
- role: Principal, Director, Head, Coordinator, Lecturer, Tutor
- position_title: "Principal & Mathematics Specialist"

# Qualifications
- highest_degree: "PhD Mathematics Education"
- institution: "University of Ghana"
- years_experience: 15

# Profile
- bio: Brief biography
- photo: URL to photo
- email: Contact email

# Display
- display_order: Order on page (lower = first)
- is_active: Show/hide instructor
- is_featured: Show on homepage
```

## 🎨 Customization

### Add TeamSection to Homepage

Edit `wacefront/client/pages/Home.tsx`:

```tsx
import TeamSection from "../components/TeamSection";

// Add this section
<TeamSection 
  featuredOnly={true}
  title="Meet Our Expert Team"
  subtitle="Experienced educators dedicated to your success"
/>
```

### Customize TeamSection Appearance

Edit `wacefront/client/components/TeamSection.tsx` to:
- Change card styling
- Modify layout (grid columns)
- Add/remove fields
- Change colors

### Add More Instructors

Via Django Admin or Python script:

```python
from courses.models import Instructor, InstructorSpecialty, Subject

# Create instructor
instructor = Instructor.objects.create(
    title='dr',
    first_name='Ama',
    last_name='Mensah',
    role='lecturer',
    position_title='Senior Biology Lecturer',
    highest_degree='PhD Biology',
    institution='University of Ghana',
    years_experience=8,
    bio='Specialist in molecular biology...',
    photo='https://example.com/photo.jpg',
    email='a.mensah@school.com',
    display_order=5,
    is_active=True,
    is_featured=False
)

# Add specialties
biology = Subject.objects.get(name='Biology')
InstructorSpecialty.objects.create(
    instructor=instructor,
    subject=biology,
    is_primary=True
)
```

## 🔧 Troubleshooting

### No instructors showing?
1. Check database: `python manage.py shell`
   ```python
   from courses.models import Instructor
   print(Instructor.objects.filter(is_active=True).count())
   ```
2. Run populate script: `python populate_instructors.py`
3. Check API: `curl http://localhost:8000/api/courses/instructors/`

### Photos not showing?
- Use full URLs (https://...)
- Or use placeholder service: `https://ui-avatars.com/api/?name=First+Last`
- Upload to static files and use `/static/instructors/photo.jpg`

### Specialties not appearing?
- Make sure subjects exist in database
- Link via Django admin: Instructor → Specialties → Add
- Or use `InstructorSpecialty.objects.create()`

## 📝 API Response Example

```json
{
  "instructors": [
    {
      "id": 1,
      "title": "Dr.",
      "first_name": "Kwame",
      "last_name": "Asante",
      "full_name": "Dr. Kwame Asante",
      "role": "Principal",
      "position_title": "Principal & Mathematics Specialist",
      "highest_degree": "PhD Mathematics Education",
      "institution": "University of Ghana",
      "years_experience": 15,
      "experience_text": "15+ years",
      "bio": "Dr. Asante brings over 15 years...",
      "photo": "https://...",
      "email": "k.asante@school.com",
      "specialties": [
        {
          "id": 1,
          "name": "Mathematics (Core)",
          "is_primary": true
        },
        {
          "id": 2,
          "name": "Physics",
          "is_primary": false
        }
      ],
      "is_featured": true
    }
  ],
  "total_count": 4
}
```

## ✨ Benefits

1. **Easy Updates**: Change instructor info in admin, no code changes needed
2. **Scalable**: Add unlimited instructors
3. **Flexible**: Show different instructors on different pages
4. **Professional**: Real photos, bios, and credentials
5. **SEO Friendly**: Dynamic content indexed by search engines

## 🎯 Next Steps

1. Run `python populate_instructors.py` to add sample data
2. Visit `/about` page to see dynamic team section
3. Customize instructors in Django admin
4. Add real photos and detailed bios
5. Optionally add TeamSection to homepage with `featuredOnly={true}`

---

**Note**: The About page now uses the dynamic TeamSection component. All instructor data is loaded from the database via the API endpoint.
