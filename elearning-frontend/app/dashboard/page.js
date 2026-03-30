'use client';
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await API.get('/my-courses/');
      setEnrollments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
            <button onClick={() => router.push('/courses')} className="text-blue-200 hover:text-white transition text-sm">
              All Courses
            </button>
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

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <p className="text-blue-200 text-sm mb-1">Enrolled Courses</p>
            <p className="text-4xl font-bold text-white">{enrollments.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <p className="text-blue-200 text-sm mb-1">Role</p>
            <p className="text-4xl font-bold text-white capitalize">{user?.role || '-'}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <p className="text-blue-200 text-sm mb-1">Username</p>
            <p className="text-4xl font-bold text-white">{user?.username || '-'}</p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-10 text-center">
            <p className="text-blue-200 text-lg mb-4">You haven't enrolled in any courses yet.</p>
            <button
              onClick={() => router.push('/courses')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg transition"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-2">{enrollment.course.title}</h3>
                <p className="text-blue-200 text-sm mb-4">{enrollment.course.description}</p>
                <p className="text-blue-300 text-xs mb-4">By {enrollment.course.instructor}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-blue-300 mb-1">
                    <span>Progress</span>
                    <span>{enrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${enrollment.progress}%` }}
                    ></div>
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