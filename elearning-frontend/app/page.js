'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">

      {/* Navbar */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl">ELearn</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/login')}
            className="text-blue-200 hover:text-white px-4 py-2 rounded-lg transition text-sm"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <span className="bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm px-4 py-2 rounded-full inline-block mb-6">
            🎓 Start Learning Today
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Learn Without
            <span className="text-blue-400"> Limits</span>
          </h1>
          <p className="text-blue-200 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students learning new skills with expert instructors. Enroll in courses and track your progress.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => router.push('/register')}
              className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
            >
              Start Learning Free
            </button>
            <button
              onClick={() => router.push('/courses')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: '10K+', label: 'Students Enrolled' },
            { number: '500+', label: 'Courses Available' },
            { number: '50+', label: 'Expert Instructors' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
              <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
              <p className="text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose ELearn?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
              title: 'Expert Instructors',
              desc: 'Learn from industry professionals with years of real-world experience.'
            },
            {
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              title: 'Track Progress',
              desc: 'Monitor your learning journey with detailed progress tracking.'
            },
            {
              icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              title: 'Learn at Your Pace',
              desc: 'Access course materials anytime, anywhere, at your own speed.'
            },
          ].map((feature, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-200 mb-8 text-lg">Join thousands of learners and start your journey today.</p>
          <button
            onClick={() => router.push('/register')}
            className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
          >
            Create Free Account
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-blue-300 text-sm">
        © 2026 ELearn. Built with Django & Next.js
      </footer>
    </div>
  );
}
