# ELearn - E-Learning Platform

A full-stack e-learning platform built with Django REST Framework and Next.js.

## 🚀 Live Demo
- **Frontend:** Coming soon
- **Backend API:** Coming soon

## 🛠 Tech Stack

### Backend
- Django 6.0 + Django REST Framework
- MySQL (local) / PostgreSQL (production)
- JWT Authentication (SimpleJWT)
- CORS Headers

### Frontend
- Next.js 15
- React 19
- Tailwind CSS
- Axios

## ✨ Features

### Students
- Register and login with JWT authentication
- Browse all available courses
- Enroll in courses
- Watch video lessons
- Track enrollment progress

### Instructors
- Register with invite code
- Create and manage courses
- Add lessons with video URLs (YouTube, Cloudinary, etc.)
- View enrolled students

### Admin
- Manage users via Django Admin panel
- Approve and manage courses
- View platform analytics

## 📁 Project Structure
```
sourcesys-Elearning-Platform/
├── courses/              ← Course & Lesson models/APIs
├── elearning/            ← Django project config
├── enrollments/          ← Enrollment model/APIs
├── users/                ← Custom User model/APIs
├── elearning-frontend/   ← Next.js frontend
│   ├── app/
│   │   ├── courses/      ← Courses listing & detail
│   │   ├── dashboard/    ← Student dashboard
│   │   ├── instructor/   ← Instructor panel
│   │   ├── login/        ← Login page
│   │   └── register/     ← Register page
├── manage.py
└── requirements.txt
```

## ⚙️ Backend Setup

### Prerequisites
- Python 3.10+
- MySQL

### 1. Clone the repository
```bash
git clone https://github.com/udhaya4a6a/sourcesys-Elearning-Platform.git
cd sourcesys-Elearning-Platform
```

### 2. Create virtual environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Create .env file
```
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=elearning_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
INSTRUCTOR_INVITE_CODE=TEACH2024
```

### 5. Create MySQL database
```sql
CREATE DATABASE elearning_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Run migrations
```bash
python manage.py migrate
```

### 7. Run server
```bash
python manage.py runserver
```

## 🎨 Frontend Setup

### Prerequisites
- Node.js 18+

### 1. Go to frontend folder
```bash
cd elearning-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env.local file
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### 4. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/register/ | Register new user |
| POST | /api/login/ | Login and get JWT tokens |
| POST | /api/token/refresh/ | Refresh access token |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses/ | List all courses |
| POST | /api/courses/ | Create course (instructor only) |
| GET | /api/courses/\<id\>/ | Get course detail |
| POST | /api/courses/\<id\>/lessons/ | Add lesson to course |

### Enrollments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/enroll/ | Enroll in a course |
| GET | /api/my-courses/ | Get my enrolled courses |

## 🔐 User Roles

| Role | Registration | Access |
|------|-------------|--------|
| Student | Normal registration | Browse & enroll in courses |
| Instructor | Register with invite code `TEACH2024` | Create courses & add lessons |
| Admin | Created via Django admin | Full platform access |

## 👨‍💻 Default Test Accounts
```
Student:    username: student1    password: pass123
Instructor: username: instructor1 password: pass123
Admin:      username: admin       password: admin123
```

## 👨‍💻 Author

**Udhaya**
- GitHub: [@udhaya4a6a](https://github.com/udhaya4a6a)
- Email: udhayadotcode@gmail.com

## 📄 License & Copyright
```
MIT License

Copyright (c) 2026 Udhaya

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

> **© 2026 Udhaya. All rights reserved.**
> This project was designed and developed by Udhaya as a full-stack e-learning platform using Django REST Framework and Next.js.