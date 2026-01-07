import { useState } from 'react';
import { LogIn, UserPlus, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from './AnimatedBackground';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('demo@sports.com');
  const [password, setPassword] = useState('demo123');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        if (!fullName.trim()) {
          setError('Full name is required');
          setLoading(false);
          return;
        }
        success = await register(email, password, fullName);
        if (!success) {
          setError('Registration failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-sport-primary-900 to-slate-900">
      <AnimatedBackground intensity="normal" imageUrl="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block text-white space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="w-10 h-10 text-sport-primary-300" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sport-primary-400 to-sport-primary-300 bg-clip-text text-transparent">
                SportHub
              </h1>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Your Premium <br />
              <span className="text-sport-primary-400">Sports Hub</span>
            </h2>
            <p className="text-sm text-gray-300">
              Premium sports equipment for champions. From professionals to enthusiasts.
            </p>
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-sport-primary-400">500+</div>
                <div className="text-xs text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sport-primary-400">25+</div>
                <div className="text-xs text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-sport-primary-300">50k+</div>
                <div className="text-xs text-gray-400">Athletes</div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sport-primary-600 to-sport-primary-800 rounded-full mb-4">
                  {isLogin ? <LogIn className="w-7 h-7 text-white" /> : <UserPlus className="w-7 h-7 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h3>
                <p className="text-xs text-gray-600 mt-2">
                  {isLogin ? 'Login to access your account' : 'Sign up to get started'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input-field"
                      placeholder="John Doe"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-sport-primary-600 to-sport-primary-700 text-white py-2.5 rounded-lg font-semibold hover:from-sport-primary-700 hover:to-sport-primary-800 transform hover:scale-105 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="mt-5 text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-sport-primary-600 hover:text-sport-primary-700 font-medium transition text-sm"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>

              {isLogin && (
                <div className="mt-4 p-3 bg-sport-primary-50 rounded-lg text-xs text-gray-700 text-center font-medium">
                  Demo: demo@sports.com / demo123
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
