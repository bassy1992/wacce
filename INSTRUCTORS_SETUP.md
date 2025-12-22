# Dynamic Instructors/Team System

## Overview
Your team members are now loaded dynamically from the database instead of being hardcoded. This allows you to easily add, edit, or remove instructors through the Django admin panel.

## What's Been Implemented

### Backend

1. **Models** (`wacebackend/courses/models.py`)
   - `Instructor` - Stores instructor information
   - `InstructorSpecialty` - Links instructors to subjects they teach

2. **API Endpoint** (`wacebackend/courses/views.py`)
   - `GET /api/courses/instructors/` - Returns all active instructors
   - `GET /api/courses/instructors/?featured=true` - Returns only featured instructors

3. **Admin Panel** (`wacebackend/courses/admin.py`)
   - Full admin interface for managing instructors
   - Inline editing of specialties
   - Filtering and search capabilities

### Frontend

1. **API Client** (`wacefront/shared/api.ts`)
   - `instructorsAPI.getInstructors(featured?)` - Fetch instructors

2. **Component** (`wacefront/client/components/TeamSection.tsx`)
   - Reusable team section component
   - Displays instructor cards with photos, qualifications, and specialties
   - Loading states and error handling

## Setup Instructions

### Step 1: Run Migration

```bash
cd wacebackend
python manage.py migrate
```

### Step 2: Populate Sample Instructors

```bash
python populate_instructors.py
```

This will create 4 sample instructors:
- Dr. Kwame Asante (Principal & Mathematics Specialist)
- Mrs. Akosua Mensah (Academic Director & English Literature)
- Mr. John Boateng (Science Department Head)
- Ms. Grace Owusu (Business Studies Coordinator)

### Step 3: Customize in Admin Panel

1. Go to http://localhost:8000/admin/courses/instructor/
2. Click on an instructor to edit
3. Update:
   - Photo URL (use real photos or keep placeholder)
   - Bio
   - Qualifications
   - Specialties
   - Display order

### Step 4: Use in Your Pages

Add the TeamSection component to any page:

```tsx
import TeamSection from "../components/TeamSection";

// In your component
<TeamSection />

// Or show only featured instructors
<TeamSection featuredOnly={true} />

// Or customize title
<TeamSection 
  title="Our Expert Tutors"
  subtitle="Learn from the best"
/>
```

## Instructor Model Fields

### Basic Information
- **Title**: Dr., Prof., Mr., Mrs., Ms.
- **First Name**: Instructor's first name
- **Last Name**: Instructor's last name
- **Role**: Principal, Director, Head, Coordinator, Lecturer, Tutor
- **Position Title**: Full position description

### Qualifications
- **Highest Degree**: PhD, MSc, MA, MBA, etc.
- **Institution**: University name
- **Years Experience**: Number of years teaching

### Profile
- **Bio**: Brief biography (optional)
- **Photo**: URL to photo (use DigitalOcean Spaces or external URL)
- **Email**: Contact email (optional)

### Display Settings
- **Display Order**: Order to show on page (lower numbers first)
- **Is Active**: Show/hide instructor
- **Is Featured**: Show on homepage

### Specialties
- Link instructors to subjects they teach
- Mark primary specialty
- Multiple specialties per instructor

## API Response Example

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
      "email": "k.asante@excelwassce.com",
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

## Usage Examples

### Homepage - Featured Instructors Only

```tsx
import TeamSection from "../components/TeamSection";

export default function Home() {
  return (
    <div>
      {/* Other sections */}
      
      <TeamSection 
        featuredOnly={true}
        title="Meet Our Expert Team"
        subtitle="Experienced educators dedicated to your success"
      />
      
      {/* Other sections */}
    </div>
  );
}
```

### About Page - All Instructors

```tsx
import TeamSection from "../components/TeamSection";

export default function About() {
  return (
    <div>
      <TeamSection 
        title="Our Teaching Staff"
        subtitle="Meet all our qualified instructors"
      />
    </div>
  );
}
```

### Custom Implementation

```tsx
import { useState, useEffect } from "react";
import { instructorsAPI, Instructor } from "../../shared/api";

export default function CustomTeam() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      const data = await instructorsAPI.getInstructors();
      setInstructors(data.instructors);
    };
    fetchInstructors();
  }, []);

  return (
    <div>
      {instructors.map(instructor => (
        <div key={instructor.id}>
          <h3>{instructor.full_name}</h3>
          <p>{instructor.position_title}</p>
        </div>
      ))}
    </div>
  );
}
```

## Adding Photos

### Option 1: Use DigitalOcean Spaces

1. Upload photos to your DigitalOcean Spaces bucket
2. Get the public URL
3. Add to instructor photo field

### Option 2: Use External URLs

Use services like:
- Gravatar
- UI Avatars (placeholder): `https://ui-avatars.com/api/?name=John+Doe&size=200`
- Unsplash (stock photos)
- Your own CDN

### Option 3: Use Django Media Files

1. Configure Django media settings
2. Upload via admin panel
3. Photos stored on server

## Managing Instructors

### Add New Instructor

1. Go to admin: `/admin/courses/instructor/add/`
2. Fill in all required fields
3. Add specialties (subjects they teach)
4. Set display order
5. Mark as featured if should appear on homepage
6. Save

### Edit Instructor

1. Go to admin: `/admin/courses/instructor/`
2. Click on instructor name
3. Update fields
4. Save

### Reorder Instructors

Change the `display_order` field:
- Lower numbers appear first
- Same number = alphabetical by last name

### Hide Instructor

Uncheck `is_active` instead of deleting

## Testing

### Test API Endpoint

```bash
# All instructors
curl http://localhost:8000/api/courses/instructors/

# Featured only
curl http://localhost:8000/api/courses/instructors/?featured=true
```

### Test Frontend

1. Start backend: `cd wacebackend && python manage.py runserver`
2. Start frontend: `cd wacefront && npm run dev`
3. Add TeamSection to a page
4. Visit the page

## Deployment

### Railway (Backend)

```bash
git add .
git commit -m "Add dynamic instructors system"
git push
```

Railway will:
1. Run migrations automatically
2. Deploy new code

Then run the populate script on Railway:
```bash
railway run python populate_instructors.py
```

### Vercel (Frontend)

```bash
cd wacefront
vercel --prod
```

## Troubleshooting

### Instructors Not Loading

**Problem**: API returns empty array

**Solutions**:
1. Check instructors exist: `/admin/courses/instructor/`
2. Check `is_active` is True
3. Check API endpoint: `curl http://localhost:8000/api/courses/instructors/`

### Photos Not Showing

**Problem**: Broken image icons

**Solutions**:
1. Verify photo URL is accessible
2. Check CORS if using external URLs
3. Use placeholder: `https://ui-avatars.com/api/?name=Name&size=200`

### Specialties Not Showing

**Problem**: No subjects listed

**Solutions**:
1. Check InstructorSpecialty records exist
2. Verify subjects are linked in admin
3. Check subject names match database

## Files Created/Modified

### Backend
- `wacebackend/courses/models.py` - Added Instructor and InstructorSpecialty models
- `wacebackend/courses/admin.py` - Added admin interfaces
- `wacebackend/courses/views.py` - Added get_instructors endpoint
- `wacebackend/courses/urls.py` - Added instructors route
- `wacebackend/courses/migrations/0003_add_instructors.py` - Migration

### Frontend
- `wacefront/shared/api.ts` - Added instructorsAPI
- `wacefront/client/components/TeamSection.tsx` - Team component

### Scripts
- `populate_instructors.py` - Populate sample data
- `INSTRUCTORS_SETUP.md` - This file

## Next Steps

1. Run migration
2. Populate sample instructors
3. Customize in admin panel
4. Add real photos
5. Add TeamSection to your pages
6. Deploy to production
