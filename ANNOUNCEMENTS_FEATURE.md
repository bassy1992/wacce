# Announcements Feature

## Overview
Added an announcements system to display important updates and notifications to students.

## Database Model

### Announcement Model
Located in `wacebackend/courses/models.py`

Fields:
- `title` - Announcement title (max 200 chars)
- `message` - Full announcement message (text)
- `priority` - Priority level: low, normal, high, urgent
- `is_active` - Whether announcement is currently active
- `created_at` - Auto-generated timestamp
- `updated_at` - Auto-updated timestamp
- `expires_at` - Optional expiration date (nullable)

## API Endpoint

### GET /api/courses/announcements/
Returns all active, non-expired announcements.

**Authentication:** Not required (public endpoint)

**Response:**
```json
{
  "announcements": [
    {
      "id": 1,
      "title": "New WASSCE Past Questions Added",
      "message": "2023 past questions now available in your study materials",
      "priority": "high",
      "created_at": "2025-12-17T23:49:44.716456+00:00",
      "time_ago": "1 day ago"
    }
  ],
  "total_count": 2
}
```

**Features:**
- Filters out inactive announcements
- Filters out expired announcements
- Orders by priority (urgent → high → normal → low) then by date
- Includes human-readable "time_ago" field

## Admin Interface

Announcements can be managed through Django admin at `/admin/courses/announcement/`

Admin features:
- List view shows title, priority, status, and dates
- Filter by priority, active status, and creation date
- Search by title and message
- Set expiration dates for auto-expiring announcements

## Usage

### Adding Announcements via Admin
1. Go to Django admin
2. Navigate to Courses → Announcements
3. Click "Add Announcement"
4. Fill in title, message, and priority
5. Optionally set an expiration date
6. Save

### Adding Announcements via Script
Use the `add_sample_announcements.py` script as a template.

## Sample Data
Two sample announcements have been created:
1. "New WASSCE Past Questions Added" (high priority, 1 day ago)
2. "Mock Exam Schedule Released" (normal priority, 3 days ago)

## Next Steps
- Integrate with frontend dashboard
- Add notification badges for unread announcements
- Consider adding user-specific announcement read tracking
