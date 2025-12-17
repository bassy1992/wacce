# Populate Subjects via Django Admin (Railway)

Since the Railway CLI approach has connection issues, use the Django Admin interface instead:

## Step 1: Access Django Admin on Railway

1. Go to your Railway app URL: `https://your-app.railway.app/admin/`
2. Login with your admin credentials

## Step 2: Create Core Subjects

Navigate to **Courses > Subjects** and create these 5 core subjects:

1. **English Language**
   - Name: `English Language`
   - Code: `ENG`
   - Description: `Core English Language for all SHS students`
   - Subject Type: `Core Subject`
   - Is Active: ✓

2. **Mathematics (Core)**
   - Name: `Mathematics (Core)`
   - Code: `MATH_CORE`
   - Description: `Core Mathematics for all SHS students`
   - Subject Type: `Core Subject`
   - Is Active: ✓

3. **Integrated Science**
   - Name: `Integrated Science`
   - Code: `INT_SCI`
   - Description: `Integrated Science for all SHS students`
   - Subject Type: `Core Subject`
   - Is Active: ✓

4. **Social Studies**
   - Name: `Social Studies`
   - Code: `SOC_STD`
   - Description: `Social Studies for all SHS students`
   - Subject Type: `Core Subject`
   - Is Active: ✓

5. **ICT/Computing**
   - Name: `ICT/Computing`
   - Code: `ICT`
   - Description: `Information and Communication Technology`
   - Subject Type: `Core Subject`
   - Is Active: ✓

## Step 3: Create General Arts Electives

Navigate to **Courses > Subjects** and create these elective subjects:

1. **Economics**
   - Code: `ECON`
   - Subject Type: `Elective Subject`

2. **Geography**
   - Code: `GEOG`
   - Subject Type: `Elective Subject`

3. **History**
   - Code: `HIST`
   - Subject Type: `Elective Subject`

4. **Elective Mathematics**
   - Code: `MATH_ELEC`
   - Subject Type: `Elective Subject`

5. **Literature-in-English**
   - Code: `LIT`
   - Subject Type: `Elective Subject`

6. **French**
   - Code: `FRENCH`
   - Subject Type: `Elective Subject`

7. **Government**
   - Code: `GOVT`
   - Subject Type: `Elective Subject`

8. **Christian Religious Studies**
   - Code: `CRS`
   - Subject Type: `Elective Subject`

## Step 4: Link Subjects to General Arts Programme

Navigate to **Courses > Programme Subjects** and create links:

### Link Core Subjects (for ALL programmes):
1. Programme: `General Arts`, Subject: `English Language`, Order: 1
2. Programme: `General Arts`, Subject: `Mathematics (Core)`, Order: 2
3. Programme: `General Arts`, Subject: `Integrated Science`, Order: 3
4. Programme: `General Arts`, Subject: `Social Studies`, Order: 4
5. Programme: `General Arts`, Subject: `ICT/Computing`, Order: 5

### Link Elective Subjects (for General Arts):
6. Programme: `General Arts`, Subject: `Economics`, Order: 6
7. Programme: `General Arts`, Subject: `Geography`, Order: 7
8. Programme: `General Arts`, Subject: `History`, Order: 8
9. Programme: `General Arts`, Subject: `Elective Mathematics`, Order: 9
10. Programme: `General Arts`, Subject: `Literature-in-English`, Order: 10
11. Programme: `General Arts`, Subject: `French`, Order: 11
12. Programme: `General Arts`, Subject: `Government`, Order: 12
13. Programme: `General Arts`, Subject: `Christian Religious Studies`, Order: 13

## Step 5: Verify

After creating all subjects and links:
1. Logout and login as William Yarquah
2. Go to the dashboard
3. You should now see 13 subjects (5 core + 8 electives)

## Quick Alternative: Use Railway's One-Off Command

If you have access to Railway's dashboard:

1. Go to your Railway project
2. Click on your service
3. Go to **Settings** > **Deploy**
4. Under "One-off Commands", run:
   ```bash
   python wacebackend/populate_subjects.py
   ```

This will execute the script directly on the Railway server.
