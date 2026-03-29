# E-Learning Platform

A full-stack e-learning platform built with Django REST Framework and React/Next.js.

## Tech Stack
- **Backend:** Django, Django REST Framework, MySQL
- **Authentication:** JWT (SimpleJWT)
- **Frontend:** React, Next.js (coming soon)

## Features
- User registration and login (Student / Instructor / Admin roles)
- JWT token authentication
- Course creation and listing
- Student enrollment and progress tracking

## Setup Instructions

### Prerequisites
- Python 3.10+
- MySQL
- Next.js (for frontend)

### 1. Clone the repository
git clone https://github.com/udhaya4a6a/sourcesys-Elearning-Platform.git
cd sourcesys-Elearning-Platform

### 2. Create virtual environment
python -m venv venv
venv\Scripts\activate

### 3. Install dependencies
pip install -r requirements.txt

### 4. Create .env file
Copy .env.example and fill in your values:
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=elearning_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

### 5. Create MySQL database
CREATE DATABASE elearning_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

### 6. Run migrations
python manage.py migrate

### 7. Run server
python manage.py runserver

## API Endpoints

### Auth
- POST /api/register/ — Register new user
- POST /api/login/ — Login and get JWT tokens
- POST /api/token/refresh/ — Refresh access token

### Courses
- GET /api/courses/ — List all courses
- POST /api/courses/ — Create course (instructor only)
- GET /api/courses/<id>/ — Get course detail

### Enrollments
- POST /api/enroll/ — Enroll in a course
- GET /api/my-courses/ — Get my enrolled courses
