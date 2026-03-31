'use client';
import { useState } from 'react';
import API from '../services/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '', invite_code: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/register/', form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      router.push('/courses');
    } catch (err) {
      setError('Registration failed. Try a different username.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800">
      <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-blue-500 opacity-20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-80px] left-[-80px] w-80 h-80 bg-indigo-400 opacity-20 rounded-full animate-pulse"></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-1">Create Account</h1>
        <p className="text-blue-200 text-center mb-8 text-sm">Join our learning platform today</p>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-blue-100 text-sm mb-2 font-medium">Username</label>
            <input
              type="text"
              required
              placeholder="Choose a username"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-blue-100 text-sm mb-2 font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-blue-100 text-sm mb-2 font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="Create a password"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-blue-100 text-sm mb-2 font-medium">
              Instructor Invite Code
              <span className="text-blue-300 font-normal ml-1">(optional — leave blank if you are a student)</span>
            </label>
            <input
              type="text"
              placeholder="Enter invite code if you are an instructor"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={form.invite_code}
              onChange={(e) => setForm({ ...form, invite_code: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-blue-200 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-white font-semibold hover:underline">Sign in here</a>
        </p>
      </div>
    </div>
  );
}
