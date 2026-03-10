import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../api/client';
import { isCnRegion } from '../config/region';
import SEO from '../components/seo/SEO';

export default function Login() {
  const { t } = useTranslation('auth');
  const { isAuthenticated, isLoading, login, loginWithToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  // Handle OAuth callback token
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setOauthLoading(true);
      loginWithToken(token)
        .then(() => navigate('/dashboard', { replace: true }))
        .catch(() => {
          setError(t('login.errors.generic'));
          setOauthLoading(false);
        });
    }
  }, [searchParams, loginWithToken, navigate, t]);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated && !oauthLoading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, oauthLoading, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.status === 401) {
        setError(t('login.errors.invalidCredentials'));
      } else if (!navigator.onLine) {
        setError(t('login.errors.networkError'));
      } else {
        setError(t('login.errors.generic'));
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      const data = await apiClient(`/api/auth/google?redirect_uri=${encodeURIComponent(window.location.origin)}`);
      window.location.href = data.authorization_url;
    } catch {
      setError(t('login.errors.generic'));
    }
  }

  if (isLoading || oauthLoading) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <SEO path="/login" />

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/[0.05] blur-[160px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[500px] w-[600px] translate-x-1/4 rounded-full bg-violet-600/[0.04] blur-[140px]" />
      </div>

      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-8">
          <span className="text-3xl tracking-tight text-foreground">
            <span className="font-light">do</span>
            <span className="font-black">X</span>
            <span className="font-light">mind</span>
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8">
          <h1 className="text-xl font-semibold text-white text-center mb-1">
            {t('login.heading')}
          </h1>
          <p className="text-sm text-white/40 text-center mb-8">
            {t('login.subtitle')}
          </p>

          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-1.5">
                {t('login.emailLabel')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-white/60">
                  {t('login.passwordLabel')}
                </label>
                <button
                  type="button"
                  className="text-xs text-white/30 hover:text-white/50 transition-colors"
                  onClick={() => {}}
                >
                  {t('login.forgotPassword')}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 pr-10 text-sm text-foreground placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? t('login.submitting') : t('login.submitButton')}
            </button>
          </form>

          {!isCnRegion() && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-xs text-white/20">{t('login.orDivider')}</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Google OAuth */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {t('login.googleButton')}
              </button>
            </>
          )}
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-white/30">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="text-white/60 hover:text-white transition-colors">
            {t('login.signUpLink')}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
