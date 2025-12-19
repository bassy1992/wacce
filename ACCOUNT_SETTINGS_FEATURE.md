# Account Settings Feature

## Overview
Implemented comprehensive account settings functionality including password management, email notification preferences, profile updates, and account deletion.

## Features Implemented

### 1. Change Password
- Secure password change with current password verification
- Password strength validation (min 8 chars, letters + numbers)
- Confirmation field to prevent typos
- Session maintained after password change
- Real-time error feedback

### 2. Email Notifications
- Granular control over email preferences:
  - **Course Updates**: New lessons and materials
  - **Assignment Reminders**: Upcoming deadlines
  - **Announcements**: Important updates
  - **Weekly Summary**: Progress reports
- Toggle switches for easy management
- Preferences saved to database

### 3. Profile Updates
- Edit personal information:
  - First name
  - Last name
  - Email address
  - Phone number
- Email uniqueness validation
- Phone number format validation
- Real-time success/error feedback

### 4. Account Deletion
- Permanent account deletion with safeguards:
  - Password confirmation required
  - Must type "DELETE" to confirm
  - Clear warning about data loss
  - Lists all data that will be deleted
- Automatic logout after deletion
- Cascade deletion of related data

## Backend Implementation

### New Endpoints

#### 1. Change Password
```
POST /api/auth/change-password/
```
**Request:**
```json
{
  "current_password": "oldpass123",
  "new_password": "newpass456",
  "confirm_password": "newpass456"
}
```
**Response:**
```json
{
  "message": "Password changed successfully"
}
```

#### 2. Email Notifications
```
GET /api/auth/email-notifications/
POST /api/auth/email-notifications/
```
**GET Response:**
```json
{
  "email_notifications": {
    "course_updates": true,
    "assignment_reminders": true,
    "announcements": true,
    "weekly_summary": true
  }
}
```
**POST Request:**
```json
{
  "course_updates": true,
  "assignment_reminders": false,
  "announcements": true,
  "weekly_summary": true
}
```

#### 3. Update Profile
```
PUT /api/auth/profile/update/
```
**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone_number": "+233123456789"
}
```

#### 4. Delete Account
```
POST /api/auth/delete-account/
```
**Request:**
```json
{
  "password": "userpassword",
  "confirmation": "DELETE"
}
```

### Database Changes

#### Student Model Updates
Added email notification preference fields:
- `email_course_updates` (BooleanField, default=True)
- `email_assignment_reminders` (BooleanField, default=True)
- `email_announcements` (BooleanField, default=True)
- `email_weekly_summary` (BooleanField, default=True)

**Migration:** `students/migrations/0002_student_email_announcements_and_more.py`

### Security Features

1. **Password Validation**
   - Minimum 8 characters
   - Must contain letters and numbers
   - Cannot be same as current password
   - Current password verification required

2. **Email Validation**
   - Valid email format check
   - Uniqueness check across users
   - Case-insensitive storage

3. **Phone Validation**
   - Regex pattern matching
   - International format support

4. **Account Deletion**
   - Password verification
   - Explicit confirmation required
   - Cascade deletion of related data

## Frontend Implementation

### Components Updated

#### Profile Page (`wacefront/client/pages/Profile.tsx`)

**New State Management:**
- Modal visibility states
- Form data for each feature
- Loading and error states
- Success message handling

**New Modals:**
1. **Change Password Modal**
   - Three password fields
   - Validation feedback
   - Loading state during submission

2. **Email Notifications Modal**
   - Toggle switches for each preference
   - Descriptive labels
   - Instant visual feedback

3. **Delete Account Modal**
   - Warning message with data loss details
   - Password confirmation
   - "DELETE" text confirmation
   - Disabled submit until confirmed

### API Integration (`wacefront/shared/api.ts`)

**New API Functions:**
```typescript
authAPI.updateProfile(data)
authAPI.changePassword(data)
authAPI.getEmailNotifications()
authAPI.updateEmailNotifications(data)
authAPI.deleteAccount(data)
```

### AuthContext Updates

**New Function:**
```typescript
refreshUser(): Promise<void>
```
- Refreshes user data after profile updates
- Maintains authentication state
- Updates UI with latest data

## User Experience

### Visual Feedback
- Success messages (green)
- Error messages (red)
- Loading states on buttons
- Disabled states for invalid forms

### Validation
- Real-time form validation
- Clear error messages
- Password strength indicators
- Confirmation requirements

### Safety Features
- Confirmation dialogs for destructive actions
- Clear warnings about data loss
- Password verification for sensitive operations
- Cancel buttons on all modals

## Files Modified

### Backend
- `wacebackend/authentication/views.py` - Added 4 new view functions
- `wacebackend/authentication/urls.py` - Added 4 new URL patterns
- `wacebackend/students/models.py` - Added email preference fields
- `wacebackend/students/migrations/0002_*.py` - Database migration

### Frontend
- `wacefront/client/pages/Profile.tsx` - Added modals and handlers
- `wacefront/shared/api.ts` - Added API endpoints and functions
- `wacefront/client/contexts/AuthContext.tsx` - Added refreshUser function

## Testing

### Manual Testing Steps

1. **Change Password**
   ```
   - Navigate to Profile page
   - Click "Change" button in Account Settings
   - Enter current password
   - Enter new password (test validation)
   - Confirm new password
   - Submit and verify success
   - Try logging in with new password
   ```

2. **Email Notifications**
   ```
   - Click "Manage" button
   - Toggle various preferences
   - Save and verify success
   - Reload page and verify preferences persist
   ```

3. **Profile Update**
   ```
   - Click "Edit" button
   - Modify name, email, or phone
   - Save and verify changes appear
   - Check validation for invalid email/phone
   ```

4. **Account Deletion**
   ```
   - Click "Delete" button
   - Read warning message
   - Enter password
   - Type "DELETE" in confirmation
   - Verify button enables
   - Submit and verify redirect to signin
   - Try logging in (should fail)
   ```

### API Testing

```bash
# Start Django server
python wacebackend/manage.py runserver

# Test change password
curl -X POST http://localhost:8000/api/auth/change-password/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN" \
  -d '{"current_password":"old","new_password":"new123","confirm_password":"new123"}'

# Test get notifications
curl http://localhost:8000/api/auth/email-notifications/ \
  -H "Authorization: Token YOUR_TOKEN"

# Test update profile
curl -X PUT http://localhost:8000/api/auth/profile/update/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN" \
  -d '{"first_name":"John","last_name":"Doe"}'
```

## Error Handling

### Backend Errors
- Invalid current password
- Weak new password
- Password mismatch
- Email already in use
- Invalid email format
- Invalid phone format
- Missing required fields
- Incorrect deletion confirmation

### Frontend Errors
- Network failures
- Timeout errors
- Validation errors
- Authentication errors

## Security Considerations

1. **Password Security**
   - Passwords hashed with Django's default hasher
   - Session maintained after password change
   - Old password verification required

2. **Data Protection**
   - Authentication required for all endpoints
   - CSRF protection on state-changing operations
   - Token-based authentication support

3. **Account Deletion**
   - Irreversible operation with multiple confirmations
   - Cascade deletion of related data
   - Immediate logout after deletion

## Future Enhancements

### High Priority
- [ ] Email verification for email changes
- [ ] Two-factor authentication
- [ ] Password reset via email
- [ ] Account recovery options

### Medium Priority
- [ ] Password history (prevent reuse)
- [ ] Login activity log
- [ ] Export account data before deletion
- [ ] Temporary account deactivation option

### Low Priority
- [ ] Social media account linking
- [ ] Profile picture upload
- [ ] Custom notification schedules
- [ ] Notification preview/test emails

## Deployment Notes

### Database Migration
```bash
python manage.py makemigrations students
python manage.py migrate students
```

### Environment Variables
No additional environment variables required.

### Dependencies
All dependencies already included in requirements.txt.

## Support

### Common Issues

**Issue:** Password change fails with "Current password is incorrect"
**Solution:** Verify user is entering correct current password

**Issue:** Email notifications not saving
**Solution:** Check database migration was applied

**Issue:** Account deletion not working
**Solution:** Verify user typed "DELETE" exactly (case-sensitive)

**Issue:** Profile update fails
**Solution:** Check email uniqueness and phone format validation

## Success Criteria
✅ Users can change their password securely
✅ Users can manage email notification preferences
✅ Users can update their profile information
✅ Users can delete their account with proper safeguards
✅ All operations have proper validation and error handling
✅ UI provides clear feedback for all actions
✅ Database migrations applied successfully
✅ No TypeScript errors in frontend code
