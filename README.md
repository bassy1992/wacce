# ExcelWASSCE - Online Learning Platform

A comprehensive online learning platform for WASSCE (West African Senior School Certificate Examination) preparation, built with Django REST Framework and React.

## 🎯 Overview

ExcelWASSCE is a GES-aligned remedial education platform that helps students excel in their WASSCE examinations through:
- Structured online courses and video lessons
- Interactive learning materials and lesson notes
- Past questions and practice papers
- Progress tracking and personalized study plans
- Expert instructor support

## 🚀 Features

### For Students
- **Course Management**: Access to core and elective subjects
- **Video Lessons**: High-quality educational videos with lesson notes
- **Progress Tracking**: Monitor completion and performance
- **Past Questions**: Comprehensive WASSCE past papers library
- **Announcements**: Stay updated with important information
- **Account Management**: Profile settings, password change, notifications

### For Administrators
- **Content Management**: Add/edit subjects, topics, lessons, and instructors
- **Student Management**: Monitor enrollments and progress
- **Announcements**: Broadcast important updates
- **Analytics**: Track platform usage and student performance

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 4.2+ with Django REST Framework
- **Database**: PostgreSQL (Production), SQLite (Development)
- **Authentication**: Token-based authentication
- **Deployment**: Railway

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Context API
- **Deployment**: Vercel

## 📁 Project Structure

```
wace-full/
├── wacebackend/              # Django backend
│   ├── authentication/       # User auth endpoints
│   ├── courses/             # Courses, subjects, lessons
│   ├── students/            # Student profiles and progress
│   ├── past_questions/      # Past papers management
│   ├── payments/            # Payment integration
│   └── wace_api/            # Main API configuration
│
├── wacefront/               # React frontend
│   ├── client/              # React components and pages
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (Auth, etc.)
│   │   └── pages/           # Page components
│   ├── shared/              # Shared utilities and API
│   └── public/              # Static assets
│
└── README.md                # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (for production)
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/bassy1992/wacce.git
cd wacce/wacebackend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
Create `.env` file in `wacebackend/`:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/wacedb
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

5. **Run migrations**
```bash
python manage.py migrate
```

6. **Create superuser**
```bash
python manage.py createsuperuser
```

7. **Populate initial data** (optional)
```bash
python wacebackend/populate_subjects.py
python wacebackend/populate_instructors.py
```

8. **Run development server**
```bash
python manage.py runserver
```

Backend will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd wacefront
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create `.env` file in `wacefront/`:
```env
VITE_API_URL=http://localhost:8000/api
```

4. **Run development server**
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 🌐 Deployment

### Backend (Railway)

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login to Railway**
```bash
railway login
```

3. **Deploy**
```bash
cd wacebackend
railway up
```

4. **Set environment variables** in Railway dashboard:
- `DATABASE_URL` (PostgreSQL)
- `SECRET_KEY`
- `ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`

### Frontend (Vercel)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd wacefront
vercel --prod
```

3. **Set environment variables** in Vercel dashboard:
- `VITE_API_URL` (Railway backend URL)

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/signin/` - User login
- `POST /api/auth/signout/` - User logout
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/update/` - Update profile
- `POST /api/auth/change-password/` - Change password

### Courses Endpoints
- `GET /api/courses/programmes/` - List all programmes
- `GET /api/courses/programmes/{id}/` - Programme details
- `GET /api/courses/subjects/{id}/` - Subject with topics and lessons
- `POST /api/courses/lessons/{id}/complete/` - Mark lesson complete
- `GET /api/courses/instructors/` - List instructors
- `GET /api/courses/announcements/` - Get announcements

### Students Endpoints
- `GET /api/students/dashboard/` - Student dashboard data
- `GET /api/students/profile/` - Student profile
- `GET /api/students/high-schools/` - List of Ghana high schools

### Past Questions Endpoints
- `GET /api/past-questions/student/` - Student's past papers
- `GET /api/past-questions/paper/{id}/` - Paper details

## 🔐 Authentication

The platform uses token-based authentication:
1. User signs up or logs in
2. Server returns authentication token
3. Token is stored in localStorage
4. Token is sent in `Authorization` header for protected endpoints

## 👥 User Roles

### Student
- Access to enrolled programme subjects
- View lessons and complete them
- Track progress
- Access past questions
- Manage profile

### Admin/Staff
- Full access to Django admin panel
- Manage all content (subjects, lessons, instructors)
- View student data and progress
- Create announcements
- Manage users

## 📝 Key Models

### Student
- User profile with programme enrollment
- Phone number, date of birth
- Previous school, WASSCE year, index number
- Enrollment date and status

### Programme
- Business, Science, General Arts, Home Economics, Visual Arts, Agriculture
- Associated core and elective subjects
- Price and duration

### Subject
- Core or Elective type
- Topics and lessons
- Progress tracking

### Lesson
- Video URL with signed access
- Lesson notes (Markdown support)
- Completion tracking
- Resources (PDFs, images, links)

### Instructor
- Title, name, role
- Qualifications and experience
- Subject specialties
- Bio and photo

## 🎨 Frontend Features

### Pages
- **Home**: Landing page with features and benefits
- **About**: Team and mission information
- **Courses**: Browse available programmes
- **Login/Signup**: User authentication
- **Dashboard**: Student overview and progress
- **Subject View**: Topics and lessons
- **Past Questions**: Browse and practice
- **Account Settings**: Profile and preferences

### Components
- **Navigation**: Responsive navbar with auth state
- **TeamSection**: Dynamic instructor display
- **CourseCard**: Programme information cards
- **LessonPlayer**: Video player with notes
- **ProgressTracker**: Visual progress indicators

## 🔒 Security Features

- CSRF protection
- Token-based authentication
- Password validation (8+ chars, letters + numbers)
- Signed video URLs with expiration
- CORS configuration
- Input validation and sanitization
- SQL injection prevention (Django ORM)

## 🧪 Testing

### Backend Tests
```bash
cd wacebackend
python manage.py test
```

### Frontend Tests
```bash
cd wacefront
npm run test
```

## 📊 Database Schema

Key relationships:
- User → Student (One-to-One)
- Student → Programme (Many-to-One)
- Programme ↔ Subject (Many-to-Many through ProgrammeSubject)
- Subject → Topic (One-to-Many)
- Topic → Lesson (One-to-Many)
- Student ↔ Lesson (Many-to-Many through LessonCompletion)
- Instructor ↔ Subject (Many-to-Many through InstructorSpecialty)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 👨‍💻 Development Team

- **Backend Development**: Django REST Framework
- **Frontend Development**: React + TypeScript
- **UI/UX Design**: Tailwind CSS + shadcn/ui
- **Deployment**: Railway (Backend) + Vercel (Frontend)

## 📞 Support

For support, email: support@excelwassce.com

## 🔗 Links

- **Production Frontend**: https://wacefront-gcwxcgzfu-bassys-projects-fca17413.vercel.app
- **Production Backend**: https://wacce-production.up.railway.app
- **Admin Panel**: https://wacce-production.up.railway.app/admin
- **GitHub Repository**: https://github.com/bassy1992/wacce

## 📈 Roadmap

- [ ] Mobile app (React Native)
- [ ] Live classes integration
- [ ] Payment gateway integration
- [ ] Certificate generation
- [ ] Advanced analytics dashboard
- [ ] AI-powered study recommendations
- [ ] Discussion forums
- [ ] Mobile-responsive improvements

## 🐛 Known Issues

See [GitHub Issues](https://github.com/bassy1992/wacce/issues) for current bugs and feature requests.

## 📝 Changelog

### v1.0.0 (Current)
- Initial release
- User authentication and registration
- Course management system
- Video lessons with notes
- Progress tracking
- Past questions library
- Instructor profiles
- Announcements system
- Account settings
- Admin panel

---

**Built with ❤️ for WASSCE Success**
