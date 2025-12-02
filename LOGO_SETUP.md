# GradeUp Online Logo Setup

## Logo Files

### Source Logo
- **Location**: `wacebackend/static/images/grade up.png`
- **Format**: PNG with transparency
- **Design**: Blue graduation cap with white arrow and "GradeUp Online" text

### Frontend Logo
- **Location**: `wacefront/public/images/gradeup-logo.png`
- **Usage**: Displayed in navigation bar and all frontend pages
- **Component**: `wacefront/client/components/Logo.tsx`

### Backend Logo (Django Admin)
- **Location**: `wacebackend/staticfiles/images/grade up.png`
- **Usage**: Displayed in Django admin login and dashboard
- **Configuration**: `wacebackend/wace_api/settings.py` (JAZZMIN_SETTINGS)

## Implementation

### Frontend (React)
The Logo component (`wacefront/client/components/Logo.tsx`) now uses the actual image:

```tsx
<img 
  src="/images/gradeup-logo.png" 
  alt="GradeUp Online" 
  style={{ height: `${height}px`, width: 'auto' }}
  className="transition-transform duration-300 hover:scale-105"
/>
```

**Sizes Available:**
- `sm`: 40px height (navigation bar)
- `md`: 50px height (headers)
- `lg`: 70px height (landing pages)

### Backend (Django Admin)
Jazzmin settings configured in `wacebackend/wace_api/settings.py`:

```python
JAZZMIN_SETTINGS = {
    "site_logo": "images/grade up.png",
    "login_logo": "images/grade up.png",
    "site_icon": "images/grade up.png",
    "site_logo_classes": "img-fluid",
}
```

## Static Files Configuration

### Django Settings
```python
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]
```

### Collecting Static Files
To update static files after logo changes:
```bash
cd wacebackend
python manage.py collectstatic --noinput
```

## Logo Usage

### Where the Logo Appears

**Frontend:**
- ✅ Navigation bar (all pages)
- ✅ Login page
- ✅ Sign up page
- ✅ Dashboard
- ✅ All authenticated pages

**Backend (Django Admin):**
- ✅ Admin login page
- ✅ Admin dashboard header
- ✅ Admin sidebar
- ✅ Browser tab (favicon)

## Updating the Logo

### To Update Frontend Logo:
1. Replace `wacefront/public/images/gradeup-logo.png`
2. Clear browser cache
3. Refresh the page

### To Update Backend Logo:
1. Replace `wacebackend/static/images/grade up.png`
2. Run: `python manage.py collectstatic --noinput`
3. Restart Django server
4. Clear browser cache

## Logo Specifications

### Current Logo
- **Format**: PNG with transparency
- **Dimensions**: Optimized for web (auto-scaled)
- **Colors**: 
  - Blue: #3B82F6
  - White: #FFFFFF
  - Dark text: #1E293B

### Recommended Specifications
- **Format**: PNG or SVG
- **Size**: 200-400px width recommended
- **Aspect Ratio**: Maintain original ratio
- **File Size**: < 100KB for optimal loading
- **Background**: Transparent or white

## Troubleshooting

### Logo Not Showing in Frontend
1. Check file exists: `wacefront/public/images/gradeup-logo.png`
2. Clear browser cache (Ctrl+Shift+R)
3. Check browser console for 404 errors
4. Verify file path in Logo component

### Logo Not Showing in Django Admin
1. Run: `python manage.py collectstatic --noinput`
2. Check file exists: `wacebackend/staticfiles/images/grade up.png`
3. Restart Django server
4. Clear browser cache
5. Check STATIC_URL and STATICFILES_DIRS settings

### Logo Appears Distorted
- Check `site_logo_classes` in Jazzmin settings
- Use `img-fluid` for responsive scaling
- Avoid `img-circle` unless logo is square

## File Structure
```
wace-full/
├── wacebackend/
│   ├── static/
│   │   └── images/
│   │       └── grade up.png          # Source logo
│   ├── staticfiles/
│   │   └── images/
│   │       └── grade up.png          # Collected static
│   └── wace_api/
│       └── settings.py               # Logo configuration
└── wacefront/
    ├── public/
    │   └── images/
    │       └── gradeup-logo.png      # Frontend logo
    └── client/
        └── components/
            └── Logo.tsx              # Logo component
```

## Notes
- Logo file name has a space: "grade up.png"
- Frontend uses renamed version: "gradeup-logo.png" (no space)
- Both versions point to the same image
- Logo maintains aspect ratio at all sizes
- Hover effect adds subtle scale animation

---

**GradeUp Online** - Your logo is now integrated across the entire platform! 🎓
