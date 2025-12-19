# Account Settings Authentication Fix

## Issue
The Change Password and other account settings features were not working because the backend views were using session authentication only, while the frontend was sending Token authentication headers.

## Solution
Updated all account settings views to support both Token and Session authentication using Django REST Framework decorators.

## Changes Made

### Backend (`wacebackend/authentication/views.py`)

**Added DRF Imports:**
```python
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response as DRFResponse
```

**Updated View Decorators:**

Before:
```python
@csrf_exempt
@require_http_methods(["POST"])
def change_password(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)
```

After:
```python
@api_view(['POST'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    # Authentication handled by DRF decorators
```

**Updated Data Access:**

Before:
```python
data = json.loads(request.body)
```

After:
```python
data = request.data  # DRF automatically parses request body
```

### Views Updated

1. **change_password** - POST endpoint
2. **email_notifications** - GET/POST endpoint
3. **delete_account** - POST endpoint
4. **update_profile** - PUT endpoint

## Benefits

1. **Dual Authentication Support**
   - Works with Token authentication (frontend)
   - Works with Session authentication (admin/browser)

2. **Better Error Messages**
   - DRF provides standardized error responses
   - Clearer authentication failure messages

3. **Automatic Request Parsing**
   - `request.data` handles JSON parsing automatically
   - Better error handling for malformed requests

4. **Consistent with Other Endpoints**
   - Matches the pattern used in courses/views.py
   - Follows Django REST Framework best practices

## Testing

### Test Authentication
```bash
# Should return 401 with proper DRF error message
curl -X POST http://localhost:8000/api/auth/change-password/ \
  -H "Content-Type: application/json" \
  -d '{"current_password":"test","new_password":"test123","confirm_password":"test123"}'

# Response: {"detail":"Authentication credentials were not provided."}
```

### Test with Token
```bash
# Get token first by logging in
curl -X POST http://localhost:8000/api/auth/signin/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'

# Use token for change password
curl -X POST http://localhost:8000/api/auth/change-password/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN_HERE" \
  -d '{"current_password":"testpass123","new_password":"newpass456","confirm_password":"newpass456"}'
```

## Frontend Integration

No changes needed in the frontend! The existing implementation already sends the Authorization header with the token:

```typescript
// From wacefront/shared/api.ts
const headers: Record<string, string> = {
  'Content-Type': 'application/json',
  ...(options.headers as Record<string, string>),
};

// Add token to headers if available
if (token) {
  headers['Authorization'] = `Token ${token}`;
}
```

## Verification Steps

1. Start Django server:
   ```bash
   python wacebackend/manage.py runserver
   ```

2. Start frontend:
   ```bash
   cd wacefront
   npm run dev
   ```

3. Test in browser:
   - Log in to the application
   - Navigate to Profile page
   - Click "Change" button under Change Password
   - Fill in the form and submit
   - Should see success message

## Error Messages

### Before Fix
- `{"error": "Authentication required"}` - Generic session auth error

### After Fix
- `{"detail":"Authentication credentials were not provided."}` - DRF standard error
- Proper 401 status code
- Works with both Token and Session authentication

## Files Modified
- `wacebackend/authentication/views.py` - Updated 4 view functions

## No Migration Required
This is a code-only change, no database migrations needed.

## Compatibility
- ✅ Works with Token authentication (frontend)
- ✅ Works with Session authentication (admin panel)
- ✅ Backward compatible with existing code
- ✅ No breaking changes to API responses
