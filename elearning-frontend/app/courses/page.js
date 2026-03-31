'use client';
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses/');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await API.post('/enroll/', { course_id: courseId });
      setMessage('Successfully enrolled!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Enrollment failed');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setEnrolling(null);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">ELearn</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="text-blue-200 hover:text-white transition text-sm">
              Dashboard
            </button>
            {user?.role === 'instructor' && (
              <button onClick={() => router.push('/instructor')} className="text-blue-200 hover:text-white transition text-sm">
                Instructor Panel
              </button>
            )}
            {user && <span className="text-blue-200 text-sm">Hi, {user.username}!</span>}
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Available Courses</h1>
          <p className="text-blue-200">Explore and enroll in courses to start learning</p>
        </div>

        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm text-center font-medium ${message.includes('Successfully') ? 'bg-green-500/20 border border-green-400 text-green-200' : 'bg-red-500/20 border border-red-400 text-red-200'}`}>
            {message}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center text-blue-200 mt-20 text-lg">No courses available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{course.title}</h2>
                <p className="text-blue-200 text-sm mb-3 line-clamp-2">{course.description}</p>
                <p className="text-blue-300 text-xs mb-4">By {course.instructor}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-300 text-xs">{course.lessons?.length || 0} lessons</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/courses/${course.id}`)}
                      className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-2 rounded-lg transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrolling === course.id}
                      className="bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      {enrolling === course.id ? 'Enrolling...' : 'Enroll'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}