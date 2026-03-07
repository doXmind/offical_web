import { motion } from 'framer-motion';

export default function UsageSummaryCard({ icon: Icon, label, value, delay = 0 }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/40">
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm text-white/40">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
    </motion.div>
  );
}
