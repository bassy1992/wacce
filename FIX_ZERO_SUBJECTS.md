# Fix: Dashboard Showing "0 Subjects"

## Problem
The dashboard is showing "0 Subjects" for students even though they are enrolled in a programme (e.g., General Arts, General Science).

## Root Cause
The Railway database doesn't have subjects populated or the programme-subject relationships are missing.

## Solution

### Option 1: Populate Subjects via Railway CLI (Recommended)

1. **Install Railway CLI** (if not already installed):
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Link to your project**:
   ```bash
   railway link
   ```

4. **Run the populate script**:
   
   **Windows:**
   ```bash
   populate_railway_subjects.bat
   ```
   
   **Mac/Linux:**
   ```bash
   chmod +x populate_railway_subjects.sh
   ./populate_railway_subjects.sh
   ```
   
   **Or manually:**
   ```bash
   railway run python wacebackend/populate_subjects.py
   ```

### Option 2: Use Django Admin on Railway

1. **Create a superuser on Railway** (if you haven't):
   ```bash
   railway run python wacebackend/manage.py createsuperuser
   ```

2. **Access Django Admin**:
   - Go to: `https://your-railway-app.railway.app/admin/`
   - Login with superuser credentials

3. **Manually create subjects**:
   - Navigate to **Courses > Subjects**
   - Create core subjects (English, Math, Integrated Science, Social Studies)
   - Create elective subjects for each programme

4. **Link subjects to programmes**:
   - Navigate to **Courses > Programme Subjects**
   - Create links between programmes and their subjects

### Option 3: Run Migration Script via Railway Shell

1. **Open Railway shell**:
   ```bash
   railway shell
   ```

2. **Run Python shell**:
   ```bash
   python wacebackend/manage.py shell
   ```

3. **Execute the populate script**:
   ```python
   exec(open('wacebackend/populate_subjects.py').read())
   ```

## Verify the Fix

After populating subjects, verify by:

1. **Check the database**:
   ```bash
   railway run python wacebackend/manage.py shell -c "from courses.models import Subject, ProgrammeSubject; print(f'Subjects: {Subject.objects.count()}'); print(f'Programme-Subject links: {ProgrammeSubject.objects.count()}')"
   ```

2. **Test the dashboard API**:
   - Visit: `https://your-railway-app.railway.app/api/students/dashboard/`
   - You should see subjects in the response

3. **Check the frontend**:
   - Login to the dashboard
   - You should now see the correct number of subjects

## Expected Results

After running the populate script, you should have:

- **28 Subjects total**:
  - 4-5 Core subjects (English, Math, Integrated Science, Social Studies, ICT)
  - 23-24 Elective subjects (varies by programme)

- **Programme-Subject Links**:
  - General Arts: 4 core + 5-8 electives = 9-12 subjects
  - General Science: 4 core + 4-6 electives = 8-10 subjects
  - Business: 4 core + 5 electives = 9 subjects
  - Home Economics: 4 core + 4-5 electives = 8-9 subjects
  - Visual Arts: 4 core + 5-6 electives = 9-10 subjects
  - Agricultural Science: 4 core + 5-6 electives = 9-10 subjects

## Troubleshooting

### Issue: "Railway CLI not found"
**Solution**: Install Railway CLI:
```bash
npm install -g @railway/cli
```

### Issue: "Not logged in to Railway"
**Solution**: Login to Railway:
```bash
railway login
```

### Issue: "Project not linked"
**Solution**: Link to your Railway project:
```bash
railway link
```

### Issue: "Subjects already exist"
**Solution**: The script is idempotent - it won't create duplicates. If subjects exist but aren't showing, check:
1. Programme-Subject links exist
2. Student has a valid programme assigned
3. Frontend is pointing to the correct API URL

### Issue: "Student still shows 0 subjects"
**Solution**: Check the student's programme assignment:
```bash
railway run python wacebackend/manage.py shell -c "from students.models import Student; from django.contrib.auth.models import User; user = User.objects.get(username='bassy'); student = Student.objects.get(user=user); print(f'Programme: {student.programme.name}'); from courses.models import ProgrammeSubject; print(f'Programme has {ProgrammeSubject.objects.filter(programme=student.programme).count()} subjects')"
```

## Quick Reference Commands

```bash
# Check subjects count
railway run python wacebackend/manage.py shell -c "from courses.models import Subject; print(Subject.objects.count())"

# Check programme-subject links
railway run python wacebackend/manage.py shell -c "from courses.models import ProgrammeSubject; print(ProgrammeSubject.objects.count())"

# List all programmes and their subject counts
railway run python wacebackend/manage.py shell -c "from students.models import Programme; from courses.models import ProgrammeSubject; [print(f'{p.get_name_display()}: {ProgrammeSubject.objects.filter(programme=p).count()} subjects') for p in Programme.objects.all()]"

# Check specific student's data
railway run python wacebackend/manage.py shell -c "from students.models import Student; from django.contrib.auth.models import User; user = User.objects.get(username='YOUR_USERNAME'); student = Student.objects.get(user=user); print(f'Student: {student.user.get_full_name()}'); print(f'Programme: {student.programme.get_name_display()}')"
```

## Notes

- The populate script is **idempotent** - you can run it multiple times safely
- It will skip creating subjects that already exist
- It will create programme-subject links if they don't exist
- All core subjects are assigned to ALL programmes
- Elective subjects are programme-specific
