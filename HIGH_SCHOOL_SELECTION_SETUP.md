# High School Selection Feature

## Overview
Users can now select their previous high school from a comprehensive list of Ghana high schools during signup.

## What's Been Implemented

### Backend Changes

1. **Updated Student Model** (`wacebackend/students/models.py`)
   - Added `GHANA_HIGH_SCHOOLS` list with 100+ schools
   - Organized by region (Greater Accra, Ashanti, Eastern, Western, Central, Volta, Northern, Upper East, Upper West, Brong Ahafo)
   - Includes "Other (Not Listed)" option

2. **New API Endpoint** (`wacebackend/students/views.py`)
   - `GET /api/students/high-schools/` - Returns list of all Ghana high schools
   - Public endpoint (no authentication required)

3. **URL Route** (`wacebackend/students/urls.py`)
   - Added route for high schools endpoint

### Frontend Changes

1. **Updated API Client** (`wacefront/shared/api.ts`)
   - Added `studentsAPI.getHighSchools()` method
   - Added endpoint configuration

2. **Updated SignUp Form** (`wacefront/client/pages/SignUp.tsx`)
   - Added high school selection dropdown
   - Loads schools from API on component mount
   - Validates that a school is selected
   - Searchable dropdown with max height for better UX
   - Sends selected school as `previous_school` in signup request

## Features

### User Experience
- **Searchable Dropdown**: Users can type to filter schools
- **Organized List**: Schools sorted alphabetically
- **Loading State**: Shows "Loading schools..." while fetching
- **Validation**: Required field with error message
- **Fallback Option**: "Other (Not Listed)" for schools not in the list

### Data Source
Based on Ghana High Schools data from:
https://www.kaggle.com/code/michaelaffare/ghana-high-technical-schools-exploration

## Database Migration

A migration file has been created to update the `previous_school` field:
- `wacebackend/students/migrations/0002_update_previous_school_field.py`

### Run Migration

```bash
# Local
cd wacebackend
python manage.py migrate

# Railway (via script)
python run_migrations_railway.py
```

## Testing

### Test Locally

1. **Start backend**:
   ```bash
   cd wacebackend
   python manage.py runserver
   ```

2. **Start frontend**:
   ```bash
   cd wacefront
   npm run dev
   ```

3. **Test signup**:
   - Go to http://localhost:5173/signup
   - Fill in all fields
   - Select a high school from dropdown
   - Submit form

### Test API Endpoint

```bash
# Get high schools list
curl http://localhost:8000/api/students/high-schools/
```

Expected response:
```json
{
  "schools": [
    "Aburi Girls' SHS",
    "Accra Academy",
    "Achimota School",
    ...
  ],
  "total_count": 100
}
```

## Deployment

### Deploy to Railway

```bash
git add .
git commit -m "Add high school selection to signup"
git push
```

Railway will automatically:
1. Install dependencies
2. Run migrations
3. Restart the service

### Verify Deployment

1. Visit your Railway app URL
2. Go to `/signup`
3. Check that high school dropdown loads
4. Test signup with a selected school

## School List

The list includes major schools from all regions:

- **Greater Accra**: Achimota, Presec, Wesley Girls', etc.
- **Ashanti**: Prempeh College, Opoku Ware, Yaa Asantewaa, etc.
- **Eastern**: Koforidua SHS, Aburi Girls', Pope John, etc.
- **Western**: Mfantsipim, St. Augustine's, Holy Child, etc.
- **Central**: Adisadel, Ghana National College, etc.
- **Volta**: Mawuli School, Keta SHTS, Ho SHS, etc.
- **Northern**: Tamale SHS, Ghana SHS Tamale, etc.
- **Upper East**: Bolgatanga SHS, Navrongo SHS, etc.
- **Upper West**: Wa SHS, Jirapa SHS, etc.
- **Brong Ahafo**: Sunyani SHS, Berekum SHS, etc.

Total: **100+ schools**

## Future Enhancements

### Optional Improvements

1. **Group by Region**
   - Add region headers in dropdown
   - Better organization for users

2. **Search Functionality**
   - Add search bar above dropdown
   - Filter schools as user types

3. **Popular Schools First**
   - Show most selected schools at top
   - Based on signup statistics

4. **School Validation**
   - Verify school exists in database
   - Prevent typos and invalid entries

5. **Analytics**
   - Track which schools students come from
   - Useful for marketing and outreach

## Troubleshooting

### Schools Not Loading

**Problem**: Dropdown shows "Loading schools..." indefinitely

**Solutions**:
1. Check backend is running
2. Check API endpoint: `http://localhost:8000/api/students/high-schools/`
3. Check browser console for errors
4. Verify CORS settings in `wacebackend/wacebackend/settings.py`

### Validation Error

**Problem**: "Please select your high school" error even after selection

**Solutions**:
1. Check that `formData.highSchool` is being set
2. Verify `onValueChange` is working
3. Check browser console for React errors

### Migration Error

**Problem**: Migration fails on Railway

**Solutions**:
1. Check Railway logs: `railway logs`
2. Run migration manually: `python run_migrations_railway.py`
3. Check database connection

## Files Modified

### Backend
- `wacebackend/students/models.py` - Added GHANA_HIGH_SCHOOLS list
- `wacebackend/students/views.py` - Added get_high_schools endpoint
- `wacebackend/students/urls.py` - Added high-schools route
- `wacebackend/students/migrations/0002_update_previous_school_field.py` - Migration

### Frontend
- `wacefront/shared/api.ts` - Added getHighSchools method
- `wacefront/client/pages/SignUp.tsx` - Added high school dropdown

### Documentation
- `ghana_high_schools.py` - Standalone list of schools
- `HIGH_SCHOOL_SELECTION_SETUP.md` - This file

## Support

If you encounter issues:
1. Check Railway logs
2. Test API endpoint directly
3. Verify frontend console for errors
4. Check that migration ran successfully
