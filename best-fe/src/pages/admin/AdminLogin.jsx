import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, UserCircle2, AlertCircle, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import API_BASE_URL from '../../apiConfig.js';
import logo from '../../assets/new_logo.jpg';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials. Access Denied.');
      }
    } catch (err) {
      console.error(err);
      setError('Error connecting to authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ink-900 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel (desktop) */}
      <aside className="relative hidden overflow-hidden bg-ink-900 text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="relative flex items-center gap-3">
          <img src={logo} alt="" className="h-12 w-12 rounded-[10px] bg-white object-contain p-1" />
          <div className="leading-tight">
            <p className="text-sm font-bold">Madurai Best</p>
            <p className="text-xs font-semibold text-gold-400">Taxi Travels</p>
          </div>
        </div>

        <div className="relative max-w-md">
          <p className="eyebrow text-gold-400">Admin console</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
            Madurai Best Taxi Travels
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-300">
            Manage bookings, fleet, tour packages and customer enquiries from one secure place.
          </p>
        </div>

        <div className="relative flex items-center gap-2 text-sm text-ink-400">
          <ShieldCheck className="h-4 w-4 text-gold-400" aria-hidden="true" />
          Authorised staff only. Activity may be monitored.
        </div>
      </aside>

      {/* Form column */}
      <main className="flex min-h-screen flex-col px-4 py-8 sm:px-6 lg:min-h-0 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 lg:invisible">
            <img src={logo} alt="" className="h-10 w-10 rounded-[10px] border border-sand-200 bg-white object-contain p-0.5" />
            <span className="text-sm font-bold leading-tight text-ink-900">
              Madurai Best
              <span className="block text-xs font-semibold text-gold-600">Taxi Travels</span>
            </span>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-[10px] px-2 py-1.5 text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <p className="eyebrow">Admin portal</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                Sign in
              </h2>
              <p className="mt-2 text-sm text-ink-500">
                Use your administrator credentials to access the dashboard.
              </p>
            </div>

            <div className="card p-6 sm:p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-[10px] border border-red-200 bg-red-50 px-3.5 py-3 text-sm font-medium text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="admin-username" className="field-label">Username</label>
                  <div className="relative">
                    <input
                      id="admin-username"
                      type="text"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="field pr-11"
                      placeholder="Enter admin username"
                      aria-invalid={error ? 'true' : undefined}
                      required
                    />
                    <UserCircle2 className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <label htmlFor="admin-password" className="field-label">Password</label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="field pr-11"
                      placeholder="Enter password"
                      aria-invalid={error ? 'true' : undefined}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-sand-100 hover:text-ink-900"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      Sign in to dashboard
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-8 text-center text-xs text-ink-400">
              &copy; {new Date().getFullYear()} Madurai Best Taxi Travels
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
