'use client';
import { useEffect, useState } from 'react';
import API from '../services/api';
import { useRouter } from 'next/navigation';

export default function InstructorPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(null);
  const [courseForm, setCourseForm] = useState({ title: '', description: '' });
  const [lessonForm, setLessonForm] = useState({ title: '', video_url: '', order: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const u = localStorage.getItem('user');
    if (!token || !u) { router.push('/login'); return; }
    const parsed = JSON.parse(u);
    if (parsed.role !== 'instructor') { router.push('/courses'); return; }
    setUser(parsed);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get('/courses/');
      setCourses(res.data);
    } catch (err) { console.error(err); }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post('/courses/', courseForm);
      setMessage('Course created successfully!');
      setCourseForm({ title: '', description: '' });
      setShowCourseForm(false);
      fetchCourses();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to create course');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleAddLesson = async (e, courseId) => {
    e.preventDefault();
    try {
      await API.post(`/courses/${courseId}/lessons/`, lessonForm);
      setMessage('Lesson added successfully!');
      setLessonForm({ title: '', video_url: '', order: 0 });
      setShowLessonForm(null);
      fetchCourses();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to add lesson');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = () => { localStorage.clear(); router.push('/login'); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl">ELearn — Instructor</span>
          </div>
          <div className="flex items-center gap-4">
            {user && <span className="text-blue-200 text-sm">Hi, {user.username}!</span>}
            <button onClick={handleLogout} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <button onClick={() => setShowCourseForm(!showCourseForm)} className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg transition font-medium">
            + New Course
          </button>
        </div>

        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm text-center font-medium ${message.includes('success') ? 'bg-green-500/20 border border-green-400 text-green-200' : 'bg-red-500/20 border border-red-400 text-red-200'}`}>
            {message}
          </div>
        )}

        {showCourseForm && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Create New Course</h2>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <input type="text" required placeholder="Course title" className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} />
              <textarea required placeholder="Course description" rows={3} className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} />
              <div className="flex gap-3">
                <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg transition">Create</button>
                <button type="button" onClick={() => setShowCourseForm(false)} className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {courses.filter(c => c.instructor === `${user?.username} (instructor)`).map((course) => (
            <div key={course.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{course.title}</h2>
                  <p className="text-blue-200 text-sm mt-1">{course.description}</p>
                </div>
                <button onClick={() => setShowLessonForm(showLessonForm === course.id ? null : course.id)}
                  className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm transition">
                  + Add Lesson
                </button>
              </div>

              {showLessonForm === course.id && (
                <form onSubmit={(e) => handleAddLesson(e, course.id)} className="bg-white/10 rounded-xl p-4 mb-4 space-y-3">
                  <h3 className="text-white font-medium">Add New Lesson</h3>
                  <input type="text" required placeholder="Lesson title" className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} />
                  <input type="url" required placeholder="Video URL (YouTube, Cloudinary, etc.)" className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={lessonForm.video_url} onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })} />
                  <input type="number" placeholder="Order (1, 2, 3...)" className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={lessonForm.order} onChange={(e) => setLessonForm({ ...lessonForm, order: e.target.value })} />
                  <div className="flex gap-3">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm transition">Add</button>
                    <button type="button" onClick={() => setShowLessonForm(null)} className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition">Cancel</button>
                  </div>
                </form>
              )}

              <div className="space-y-2">
                {course.lessons?.length === 0 ? (
                  <p className="text-blue-300 text-sm">No lessons yet. Add your first lesson!</p>
                ) : (
                  course.lessons?.map((lesson, i) => (
                    <div key={lesson.id} className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
                      <span className="text-blue-300 text-sm font-medium">{i + 1}.</span>
                      <span className="text-white text-sm flex-1">{lesson.title}</span>
                      <a href={lesson.video_url} target="_blank" rel="noreferrer" className="text-blue-300 text-xs hover:text-white transition">View Video →</a>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}