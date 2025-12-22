# Instructors - Quick Reference

## 🚀 Quick Start

```bash
# 1. Populate sample instructors
python populate_instructors.py

# 2. Test the setup
python test_instructors_api.py

# 3. View on frontend
# Visit: http://localhost:5173/about
```

## 📍 Key Files

### Backend
- **Model**: `wacebackend/courses/models.py` (Instructor, InstructorSpecialty)
- **API View**: `wacebackend/courses/views.py` (get_instructors function)
- **URL**: `wacebackend/courses/urls.py` (instructors/ endpoint)

### Frontend
- **Component**: `wacefront/client/components/TeamSection.tsx`
- **Page**: `wacefront/client/pages/About.tsx`
- **API Types**: `wacefront/shared/api.ts` (Instructor, instructorsAPI)

## 🔧 Common Tasks

### Add New Instructor (Django Admin)
1. Go to `/admin/courses/instructor/`
2. Click "Add Instructor"
3. Fill in details
4. Save
5. Add specialties in "Instructor Specialties" section

### Add New Instructor (Python)
```python
from courses.models import Instructor, InstructorSpecialty, Subject

instructor = Instructor.objects.create(
    title='dr',
    first_name='Ama',
    last_name='Kofi',
    role='lecturer',
    position_title='Senior Chemistry Lecturer',
    highest_degree='PhD Chemistry',
    institution='University of Ghana',
    years_experience=10,
    bio='Expert in organic chemistry...',
    photo='https://ui-avatars.com/api/?name=Ama+Kofi',
    email='a.kofi@school.com',
    display_order=5,
    is_active=True,
    is_featured=True
)

# Add specialty
chemistry = Subject.objects.get(name='Chemistry')
InstructorSpecialty.objects.create(
    instructor=instructor,
    subject=chemistry,
    is_primary=True
)
```

### Update Instructor Photo
```python
instructor = Instructor.objects.get(id=1)
instructor.photo = 'https://example.com/new-photo.jpg'
instructor.save()
```

### Feature/Unfeature Instructor
```python
instructor = Instructor.objects.get(id=1)
instructor.is_featured = True  # or False
instructor.save()
```

### Change Display Order
```python
# Lower numbers appear first
instructor = Instructor.objects.get(id=1)
instructor.display_order = 1  # First position
instructor.save()
```

## 🎨 Frontend Usage

### Show All Instructors
```tsx
<TeamSection 
  title="Meet Our Expert Team"
  subtitle="Experienced educators"
/>
```

### Show Only Featured
```tsx
<TeamSection 
  featuredOnly={true}
  title="Our Lead Instructors"
  subtitle="Meet our senior team"
/>
```

### Custom Styling
```tsx
<TeamSection 
  title="Custom Title"
  subtitle="Custom subtitle"
/>
```

## 📊 API Endpoints

### Get All Instructors
```bash
GET /api/courses/instructors/
```

Response:
```json
{
  "instructors": [...],
  "total_count": 4
}
```

### Get Featured Only
```bash
GET /api/courses/instructors/?featured=true
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| No instructors showing | Run `python populate_instructors.py` |
| API returns empty | Check `is_active=True` in database |
| Photos not loading | Use full URLs (https://...) |
| Specialties missing | Link subjects via Django admin |
| Wrong order | Set `display_order` field (lower = first) |

## 📝 Field Reference

| Field | Type | Example |
|-------|------|---------|
| title | Choice | 'dr', 'prof', 'mr', 'mrs', 'ms' |
| first_name | String | 'Kwame' |
| last_name | String | 'Asante' |
| role | Choice | 'principal', 'director', 'head', 'coordinator' |
| position_title | String | 'Principal & Mathematics Specialist' |
| highest_degree | String | 'PhD Mathematics Education' |
| institution | String | 'University of Ghana' |
| years_experience | Integer | 15 |
| bio | Text | 'Dr. Asante brings...' |
| photo | URL | 'https://...' |
| email | Email | 'k.asante@school.com' |
| display_order | Integer | 1 (lower = first) |
| is_active | Boolean | True/False |
| is_featured | Boolean | True/False |

## 🎯 Best Practices

1. **Photos**: Use consistent size (200x200px recommended)
2. **Display Order**: Use increments of 10 (10, 20, 30...) for easy reordering
3. **Featured**: Mark 3-4 key instructors as featured for homepage
4. **Specialties**: Link to actual subjects in database
5. **Bio**: Keep under 200 characters for card display
6. **Email**: Use professional school email addresses

## 🔗 Related Documentation

- Full guide: `INSTRUCTORS_DYNAMIC_LOADING.md`
- Setup guide: `INSTRUCTORS_SETUP.md`
- Model reference: `wacebackend/courses/models.py`
