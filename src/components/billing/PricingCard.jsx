import { Check, Loader2 } from 'lucide-react';

export default function PricingCard({
  name,
  icon,
  price,
  originalPrice,
  period,
  description,
  features,
  isCurrent,
  isPopular,
  isLoading,
  onSelect,
  badge,
  ctaLabel,
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-shadow ${
        isPopular
          ? 'border-white/[0.15] shadow-lg shadow-white/[0.02]'
          : 'border-white/[0.06]'
      } ${isCurrent ? 'ring-2 ring-white/[0.08]' : ''} bg-white/[0.03]`}
    >
      {badge && (
        <span className="absolute -top-3 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
          {badge}
        </span>
      )}
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-white">${price}</span>
        {originalPrice != null && originalPrice > price && (
          <span className="text-lg text-white/30 line-through">${originalPrice}</span>
        )}
        <span className="text-sm text-white/30">{period}</span>
      </div>
      <p className="mb-6 text-sm text-white/40">{description}</p>
      <ul className="mb-6 flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 ${
          isPopular
            ? 'bg-white text-black hover:bg-white/90'
            : 'border border-white/[0.08] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white'
        }`}
        disabled={isCurrent || isLoading}
        onClick={onSelect}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
          </span>
        ) : (
          ctaLabel
        )}
      </button>
    </div>
  );
}
