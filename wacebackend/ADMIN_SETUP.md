# WACE Admin Panel Setup with Jazzmin

## Overview
The Django admin panel has been customized using **django-jazzmin** to provide a modern, user-friendly interface for managing the WACE Learning Platform.

## Admin Access
- **URL**: http://localhost:8000/admin/
- **Username**: admin
- **Password**: admin123

## Features Configured

### 🎨 Branding
- Site Title: "WACE Admin"
- Site Header: "WACE Learning Platform"
- Welcome Message: "Welcome to WACE Admin Portal"

### 📊 Dashboard
The admin dashboard provides quick access to:
- User Management
- Student Management
- Programme Management
- Course & Subject Management
- Payment Tracking

### 🔍 Search Functionality
Global search enabled for:
- Users
- Students
- Subjects

### 📱 Navigation

#### Top Menu Links
- Home (Dashboard)
- View Site (Opens frontend at http://localhost:8081)
- Quick access to Users
- Quick access to Students app

#### Side Menu Organization
Apps are organized in the following order:
1. **Authentication & Authorization**
   - Users
   - Groups

2. **Students**
   - Programmes
   - Students
   - Student Progress

3. **Courses**
   - Subjects
   - Programme Subjects (linking table)
   - Topics
   - Lessons
   - Lesson Resources

4. **Payments**
   - Payment records

### 🎯 Custom Icons
Each model has been assigned intuitive Font Awesome icons:
- 👤 Users: `fa-user`
- 🎓 Programmes: `fa-graduation-cap`
- 👨‍🎓 Students: `fa-user-graduate`
- 📚 Subjects: `fa-book`
- 🔖 Topics: `fa-bookmark`
- 🎥 Lessons: `fa-video`
- 💳 Payments: `fa-credit-card`

### 🎨 UI Theme
- **Navbar**: Dark primary theme
- **Sidebar**: Dark primary theme, fixed position
- **Layout**: Responsive, non-boxed
- **Forms**: Horizontal tabs for better organization

## Model Admin Customizations

### Subject Admin
- Displays: name, code, subject_type, is_active
- Filters: subject_type, is_active
- Search: name, code
- Inline editing: Topics and Programme assignments

### Programme Subject Admin
- Manages the many-to-many relationship between programmes and subjects
- Shows which subjects are assigned to which programmes
- Indicates if a subject is required

### Topic Admin
- Displays: title, subject, order, duration, published status
- Filters: subject type, subject, published status
- Inline editing: Lessons

### Lesson Admin
- Displays: title, topic, lesson type, order, free status
- Filters: lesson type, free status, subject type
- Inline editing: Lesson resources

### Student Admin
- Displays: user, programme, enrollment date, active status
- Filters: programme, active status, enrollment date
- Search: username, name, index number

## Database Structure

### Core Subjects (Shared across all programmes)
1. English Language (ENG) - 6 topics, 18 lessons
2. Mathematics (MATH) - 5 topics, 15 lessons
3. Integrated Science (ISCI) - 5 topics, 15 lessons
4. Social Studies (SOST) - 5 topics, 15 lessons

### Programme-Specific Electives
Each programme has 4 elective subjects with 3 topics each.

## Quick Actions

### Add New Student
1. Navigate to Students > Students
2. Click "Add Student"
3. Select user (or create new user first)
4. Choose programme
5. Fill in student details
6. Save

### Add New Subject Content
1. Navigate to Courses > Subjects
2. Select a subject
3. Use inline forms to add topics
4. Within topics, add lessons
5. Attach resources to lessons

### Manage Programme Subjects
1. Navigate to Courses > Programme Subjects
2. Add/remove subject assignments for programmes
3. Set whether subjects are required
4. Adjust display order

## Tips
- Use the search bar at the top for quick access to any record
- The sidebar can be collapsed for more screen space
- Forms use horizontal tabs for better organization
- Related objects can be edited inline without leaving the page

## Customization
To further customize the admin:
1. Edit `wace_api/settings.py`
2. Modify `JAZZMIN_SETTINGS` dictionary
3. Adjust `JAZZMIN_UI_TWEAKS` for theme changes
4. Restart the server to see changes

## Support
For Jazzmin documentation: https://django-jazzmin.readthedocs.io/
