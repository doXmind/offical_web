import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const METRICS = ['ai_requests', 'tokens', 'characters'];

function formatTick(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
  if (value >= 1_000) return (value / 1_000).toFixed(0) + 'K';
  return value;
}

function formatDate(dateStr, period) {
  const d = new Date(dateStr + 'T00:00:00');
  if (period <= 7) {
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  }
  if (period <= 30) {
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

const GRADIENT_COLORS = {
  ai_requests: { stroke: '#818cf8', fill: 'indigo' },
  tokens: { stroke: '#a78bfa', fill: 'violet' },
  characters: { stroke: '#67e8f9', fill: 'cyan' },
};

function CustomTooltip({ active, payload, label, t, metric }) {
  if (!active || !payload?.length) return null;

  const d = new Date(label + 'T00:00:00');
  const dateLabel = d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const value = payload[0]?.value ?? 0;
  let formatted;
  if (metric === 'tokens' || metric === 'characters') {
    if (value >= 1_000_000) formatted = (value / 1_000_000).toFixed(1) + 'M';
    else if (value >= 1_000) formatted = (value / 1_000).toFixed(1) + 'K';
    else formatted = value.toLocaleString();
  } else {
    formatted = value.toLocaleString();
  }

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#12121a]/95 backdrop-blur-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-white/30 mb-1">{dateLabel}</p>
      <p className="text-sm font-semibold text-white">
        {formatted}{' '}
        <span className="font-normal text-white/40">
          {t(`activity.metrics.${metric}`)}
        </span>
      </p>
    </div>
  );
}

const PERIOD_OPTIONS = [7, 30, 90];

export default function ActivityChart({ data, period, onPeriodChange }) {
  const { t } = useTranslation('dashboard');
  const [metric, setMetric] = useState('ai_requests');

  const chartData = useMemo(() => {
    if (!data?.length) return [];
    // For longer periods, show fewer ticks
    return data.map((d) => ({
      ...d,
      displayDate: formatDate(d.date, period),
    }));
  }, [data, period]);

  const colors = GRADIENT_COLORS[metric];

  // Calculate summary stats
  const stats = useMemo(() => {
    if (!data?.length) return { total: 0, avg: 0, max: 0, activeDays: 0 };
    const values = data.map((d) => d[metric]);
    const total = values.reduce((a, b) => a + b, 0);
    const max = Math.max(...values);
    const activeDays = values.filter((v) => v > 0).length;
    return { total, avg: Math.round(total / data.length), max, activeDays };
  }, [data, metric]);

  if (!data?.length) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-12 text-center">
        <p className="text-sm text-white/25">{t('activity.noData')}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-2 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium text-white/70">
              {t('activity.title')}
            </h3>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-2xl font-semibold text-white tabular-nums">
                {(metric === 'tokens' || metric === 'characters') ? formatTick(stats.total) : stats.total.toLocaleString()}
              </span>
              <span className="text-xs text-white/20">
                {t('activity.totalLabel', { metric: t(`activity.metrics.${metric}`) })}
              </span>
            </div>
          </div>

          {/* Period selector */}
          {onPeriodChange && (
            <div className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
              {PERIOD_OPTIONS.map((days) => (
                <button
                  key={days}
                  onClick={() => onPeriodChange(days)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    period === days
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  {t('usage.days', { count: days })}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Metric selector */}
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1 w-fit">
          {METRICS.map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                metric === m
                  ? 'bg-white/[0.08] text-white'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              {t(`activity.metrics.${m}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px mx-5 mb-4 mt-2 rounded-lg overflow-hidden border border-white/[0.04]">
        {[
          { label: t('activity.stats.avg'), value: (metric === 'tokens' || metric === 'characters') ? formatTick(stats.avg) : stats.avg },
          { label: t('activity.stats.peak'), value: (metric === 'tokens' || metric === 'characters') ? formatTick(stats.max) : stats.max },
          { label: t('activity.stats.activeDays'), value: `${stats.activeDays}/${data.length}` },
        ].map((s) => (
          <div key={s.label} className="bg-white/[0.02] px-3 py-2.5 text-center">
            <p className="text-[11px] text-white/20 mb-0.5">{s.label}</p>
            <p className="text-sm font-medium text-white/60 tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="px-2 pb-4" style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.stroke} stopOpacity={0.25} />
                <stop offset="100%" stopColor={colors.stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(v) => formatDate(v, period)}
              tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.04)' }}
              tickLine={false}
              interval={period <= 7 ? 0 : period <= 30 ? 4 : 13}
              dy={8}
            />
            <YAxis
              tickFormatter={formatTick}
              tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip
              content={<CustomTooltip t={t} metric={metric} />}
              cursor={{
                stroke: 'rgba(255,255,255,0.06)',
                strokeWidth: 1,
              }}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={colors.stroke}
              strokeWidth={2}
              fill={`url(#grad-${metric})`}
              animationDuration={600}
              animationEasing="ease-out"
              dot={false}
              activeDot={{
                r: 4,
                stroke: colors.stroke,
                strokeWidth: 2,
                fill: '#0a0a0f',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
