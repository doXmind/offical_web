import { cn } from "../../utils/cn";

export function FeatureCard({ icon, title, children, illustration, className }) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-6", className)}>
      <div className="mb-3 flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {illustration && (
        <div className="my-4 flex justify-center rounded-lg bg-muted/50 p-4">{illustration}</div>
      )}
      <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
