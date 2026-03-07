import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getAccessToken } from '../../api/client';

export default function AccountOverview({ user }) {
  const { t } = useTranslation('dashboard');

  function openEditor() {
    const token = getAccessToken();
    const url = token
      ? `https://app.doxmind.com/auth/callback?token=${encodeURIComponent(token)}`
      : 'https://app.doxmind.com/';
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const initial = (user.username || user.email || '?')[0].toUpperCase();
  const memberDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
    : '';

  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Avatar */}
      {user.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={user.username || ''}
          className="w-14 h-14 rounded-full object-cover border border-white/10"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-xl font-semibold text-white/60">
          {initial}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-white truncate">
          {user.username || user.email}
        </h2>
        <p className="text-sm text-white/40 truncate">{user.email}</p>
        {memberDate && (
          <p className="text-xs text-white/20 mt-1">
            {t('account.memberSince', { date: memberDate })}
          </p>
        )}
      </div>

      {/* Actions */}
      <button
        onClick={openEditor}
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/[0.08] hover:text-white transition-colors"
      >
        {t('account.goToEditor')}
        <ExternalLink className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
