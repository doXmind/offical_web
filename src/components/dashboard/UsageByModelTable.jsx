import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

function formatModelName(name) {
  // "google/gemini-3.1-flash-lite-preview" → "gemini-3.1-flash-lite"
  const parts = name.split('/');
  const model = parts[parts.length - 1];
  return model.replace(/-preview$/, '');
}

export default function UsageByModelTable({ models }) {
  const { t } = useTranslation('dashboard');

  if (!models || models.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-12 text-center">
        <p className="text-sm text-white/25">{t('usage.noData')}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-white/25">
                {t('usage.model')}
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-white/25">
                {t('usage.inputTokens')}
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-white/25">
                {t('usage.outputTokens')}
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-white/25">
                {t('usage.tokens')}
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-white/25">
                {t('usage.cost')}
              </th>
              <th className="px-5 py-3.5 text-right text-xs font-medium uppercase tracking-wider text-white/25">
                {t('usage.requests')}
              </th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, i) => (
              <tr
                key={model.model}
                className={`border-b border-white/[0.03] last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
              >
                <td className="px-5 py-3 text-sm text-white/70 font-mono truncate max-w-[200px]">
                  {formatModelName(model.model)}
                </td>
                <td className="px-5 py-3 text-sm text-white/50 text-right tabular-nums">
                  {formatNumber(model.input_tokens)}
                </td>
                <td className="px-5 py-3 text-sm text-white/50 text-right tabular-nums">
                  {formatNumber(model.output_tokens)}
                </td>
                <td className="px-5 py-3 text-sm text-white/70 text-right tabular-nums font-medium">
                  {formatNumber(model.total_tokens)}
                </td>
                <td className="px-5 py-3 text-sm text-white/50 text-right tabular-nums">
                  {model.cost != null ? `$${model.cost.toFixed(4)}` : t('usage.free')}
                </td>
                <td className="px-5 py-3 text-sm text-white/50 text-right tabular-nums">
                  {model.request_count.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
