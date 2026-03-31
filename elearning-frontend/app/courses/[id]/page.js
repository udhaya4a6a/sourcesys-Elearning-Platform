'use client';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { useRouter, useParams } from 'next/navigation';

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${id}/`);
      setCourse(res.data);
      if (res.data.lessons?.length > 0) setActiveLesson(res.data.lessons[0]);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleEnroll = async () => {
    try {
      await API.post('/enroll/', { course_id: id });
      setEnrolled(true);
      setMessage('Successfully enrolled!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Enrollment failed');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    return url;
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => router.push('/courses')} className="text-white flex items-center gap-2 hover:text-blue-200 transition">
            ← Back to Courses
          </button>
          <span className="text-white font-bold text-xl">ELearn</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm text-center font-medium ${message.includes('Successfully') ? 'bg-green-500/20 border border-green-400 text-green-200' : 'bg-red-500/20 border border-red-400 text-red-200'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeLesson ? (
              <div>
                <div className="rounded-2xl overflow-hidden bg-black aspect-video mb-4">
                  <iframe src={getEmbedUrl(activeLesson.video_url)} className="w-full h-full" allowFullScreen title={activeLesson.title} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{activeLesson.title}</h2>
              </div>
            ) : (
              <div className="bg-white/10 rounded-2xl p-10 text-center">
                <p className="text-blue-200 text-lg">No lessons available yet.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">{course?.title}</h1>
              <p className="text-blue-200 text-sm mb-4">{course?.description}</p>
              <p className="text-blue-300 text-xs mb-6">By {course?.instructor}</p>
              <button onClick={handleEnroll} className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-lg font-semibold transition">
                {enrolled ? 'Enrolled ✓' : 'Enroll Now'}
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Lessons ({course?.lessons?.length || 0})</h3>
              <div className="space-y-2">
                {course?.lessons?.map((lesson, i) => (
                  <button key={lesson.id} onClick={() => setActiveLesson(lesson)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${activeLesson?.id === lesson.id ? 'bg-blue-500/40 border border-blue-400' : 'bg-white/10 hover:bg-white/20'}`}>
                    <span className="text-blue-300 text-sm font-medium">{i + 1}.</span>
                    <span className="text-white text-sm">{lesson.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}