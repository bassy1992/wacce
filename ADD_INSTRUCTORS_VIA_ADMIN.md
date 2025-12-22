# Add Instructors via Django Admin

Since there's a connection issue with the Railway CLI, let's add instructors directly via the Django admin interface.

## 🚀 Quick Method: Use Django Admin

### Step 1: Login to Admin
Go to: https://wacce-production.up.railway.app/admin/

Login with:
- Username: `bassy`
- Password: `1234bassy`

### Step 2: Add Instructors

Navigate to: **Courses → Instructors → Add Instructor**

Add these 4 instructors:

---

#### Instructor 1: Dr. Kwame Asante
- **Title**: Dr.
- **First name**: Kwame
- **Last name**: Asante
- **Role**: Principal
- **Position title**: Principal & Mathematics Specialist
- **Highest degree**: PhD Mathematics Education
- **Institution**: University of Ghana
- **Years experience**: 15
- **Bio**: Dr. Asante brings over 15 years of experience in mathematics education, specializing in innovative teaching methods that make complex concepts accessible to all students.
- **Photo**: `https://ui-avatars.com/api/?name=Kwame+Asante&size=200&background=00ADB5&color=fff`
- **Email**: k.asante@excelwassce.com
- **Display order**: 1
- **Is active**: ✓ (checked)
- **Is featured**: ✓ (checked)

**After saving, add specialties:**
- Mathematics (Core) - Primary: ✓
- Elective Mathematics
- Physics

---

#### Instructor 2: Mrs. Akosua Mensah
- **Title**: Mrs.
- **First name**: Akosua
- **Last name**: Mensah
- **Role**: Academic Director
- **Position title**: Academic Director & English Literature
- **Highest degree**: MA English Literature
- **Institution**: University of Cape Coast
- **Years experience**: 12
- **Bio**: Mrs. Mensah is passionate about literature and language arts, helping students develop critical thinking and communication skills essential for academic success.
- **Photo**: `https://ui-avatars.com/api/?name=Akosua+Mensah&size=200&background=00ADB5&color=fff`
- **Email**: a.mensah@excelwassce.com
- **Display order**: 2
- **Is active**: ✓
- **Is featured**: ✓

**Specialties:**
- English Language - Primary: ✓
- History
- French

---

#### Instructor 3: Mr. John Boateng
- **Title**: Mr.
- **First name**: John
- **Last name**: Boateng
- **Role**: Department Head
- **Position title**: Science Department Head
- **Highest degree**: MSc Chemistry
- **Institution**: KNUST
- **Years experience**: 10
- **Bio**: Mr. Boateng leads our science department with a focus on practical, hands-on learning that prepares students for real-world applications of scientific principles.
- **Photo**: `https://ui-avatars.com/api/?name=John+Boateng&size=200&background=00ADB5&color=fff`
- **Email**: j.boateng@excelwassce.com
- **Display order**: 3
- **Is active**: ✓
- **Is featured**: ✓

**Specialties:**
- Integrated Science - Primary: ✓
- Physics

---

#### Instructor 4: Ms. Grace Owusu
- **Title**: Ms.
- **First name**: Grace
- **Last name**: Owusu
- **Role**: Coordinator
- **Position title**: Business Studies Coordinator
- **Highest degree**: MBA
- **Institution**: University of Ghana Business School
- **Years experience**: 8
- **Bio**: Ms. Owusu brings real-world business experience to the classroom, helping students understand the practical applications of business concepts.
- **Photo**: `https://ui-avatars.com/api/?name=Grace+Owusu&size=200&background=00ADB5&color=fff`
- **Email**: g.owusu@excelwassce.com
- **Display order**: 4
- **Is active**: ✓
- **Is featured**: ✓

**Specialties:**
- Economics - Primary: ✓

---

### Step 3: Verify

After adding all instructors:

1. **Check Admin List**: https://wacce-production.up.railway.app/admin/courses/instructor/
2. **Test API**: https://wacce-production.up.railway.app/api/courses/instructors/
3. **View Frontend**: https://wacce-production.up.railway.app/about

## 📝 Tips

### Adding Specialties
1. Save the instructor first
2. Scroll down to "Instructor Specialties" section
3. Click "Add another Instructor Specialty"
4. Select the subject
5. Check "Is primary" for the main specialty
6. Save again

### Photo URLs
The URLs provided use a placeholder service that generates avatar images with initials. You can:
- Keep these placeholders
- Replace with real photo URLs later
- Upload photos to your static files

### Display Order
- Lower numbers appear first
- Use: 1, 2, 3, 4 for the four instructors
- Leave gaps (10, 20, 30, 40) if you plan to add more later

## ✅ Verification

After adding, you should see:
- 4 instructors in the admin list
- API returns 4 instructors with specialties
- About page shows all 4 team members with their info

## 🐛 Troubleshooting

**Specialties not showing?**
- Make sure subjects exist in database first
- Check: https://wacce-production.up.railway.app/admin/courses/subject/

**Photos not loading?**
- Use full https:// URLs
- Test URL in browser first
- Placeholder URLs should work immediately

**Not appearing on frontend?**
- Check "Is active" is checked
- Clear browser cache
- Check browser console for errors
