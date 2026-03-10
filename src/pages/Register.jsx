import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient, setAccessToken } from '../api/client';
import { isCnRegion } from '../config/region';
import SEO from '../components/seo/SEO';

export default function Register() {
  const { t } = useTranslation('auth');
  const { isAuthenticated, isLoading, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = form, 2 = verify
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resendMsg, setResendMsg] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  async function handleRegister(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('register.errors.passwordMismatch'));
      return;
    }
    if (password.length < 8) {
      setError(t('register.errors.weakPassword'));
      return;
    }

    setSubmitting(true);
    try {
      await apiClient('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
      });
      setStep(2);
    } catch (err) {
      if (err.status === 400 && err.data?.detail?.toLowerCase().includes('exist')) {
        setError(t('register.errors.emailTaken'));
      } else {
        setError(err.data?.detail || t('register.errors.generic'));
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = await apiClient('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });
      setAccessToken(data.access_token);
      await refreshUser();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      if (err.status === 400) {
        setError(t('register.errors.invalidCode'));
      } else {
        setError(t('register.errors.generic'));
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setResendMsg('');
    try {
      await apiClient('/api/auth/resend-code', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setResendMsg(t('register.resendSuccess'));
    } catch {
      setError(t('register.errors.generic'));
    }
  }

  async function handleGoogleSignup() {
    try {
      const data = await apiClient(`/api/auth/google?redirect_uri=${encodeURIComponent(window.location.origin)}`);
      window.location.href = data.authorization_url;
    } catch {
      setError(t('register.errors.generic'));
    }
  }

  if (isLoading) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <SEO path="/register" />

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
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-xl font-semibold text-white text-center mb-1">
                  {t('register.heading')}
                </h1>
                <p className="text-sm text-white/40 text-center mb-8">
                  {t('register.subtitle')}
                </p>

                {error && (
                  <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      {t('register.usernameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t('register.usernamePlaceholder')}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors"
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      {t('register.emailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('register.emailPlaceholder')}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      {t('register.passwordLabel')}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('register.passwordPlaceholder')}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 pr-10 text-sm text-foreground placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors"
                        autoComplete="new-password"
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

                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      {t('register.confirmPasswordLabel')}
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('register.confirmPasswordPlaceholder')}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors"
                      autoComplete="new-password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? t('register.submitting') : t('register.submitButton')}
                  </button>
                </form>

                {!isCnRegion() && (
                  <>
                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <span className="text-xs text-white/20">{t('register.orDivider')}</span>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>

                    {/* Google OAuth */}
                    <button
                      onClick={handleGoogleSignup}
                      className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/[0.08] hover:border-white/[0.12] transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      {t('register.googleButton')}
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => { setStep(1); setError(''); setCode(''); }}
                  className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/60 transition-colors mb-6"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t('register.signInLink')}
                </button>

                <h1 className="text-xl font-semibold text-white text-center mb-1">
                  {t('register.verifyHeading')}
                </h1>
                <p className="text-sm text-white/40 text-center mb-8">
                  {t('register.verifySubtitle', { email })}
                </p>

                {error && (
                  <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {resendMsg && (
                  <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                    {resendMsg}
                  </div>
                )}

                <form onSubmit={handleVerify} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">
                      {t('register.codeLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder={t('register.codePlaceholder')}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-colors text-center tracking-[0.3em] text-lg"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || code.length < 6}
                    className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? t('register.verifying') : t('register.verifyButton')}
                  </button>
                </form>

                <button
                  onClick={handleResend}
                  className="mt-4 w-full text-center text-sm text-white/30 hover:text-white/50 transition-colors"
                >
                  {t('register.resendCode')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sign in link */}
        {step === 1 && (
          <p className="mt-6 text-center text-sm text-white/30">
            {t('register.hasAccount')}{' '}
            <Link to="/login" className="text-white/60 hover:text-white transition-colors">
              {t('register.signInLink')}
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
