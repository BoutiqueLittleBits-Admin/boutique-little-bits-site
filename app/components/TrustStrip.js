"use client";

const defaultItems = [
  { label: "Free shipping over $50", detail: "Automatic at checkout" },
  { label: "Ships in 1-3 business days", detail: "From Bella Vista, AR" },
  { label: "Gift-ready finds", detail: "Thoughtfully curated" },
  { label: "Secure checkout", detail: "Powered by Stripe" },
];

export default function TrustStrip({ compact = false, items = defaultItems }) {
  return (
    <div className={compact ? "grid grid-cols-2 gap-2" : "flex flex-wrap items-center justify-center gap-x-6 gap-y-2"}>
      {items.map((item) => (
        compact ? (
          <div key={item.label} className="rounded-lg border border-brand-mint/30 bg-white/90 px-4 py-3 shadow-sm">
            <p className="text-sm font-bold text-brand-sage">{item.label}</p>
            <p className="text-xs text-gray-500 mt-1">{item.detail}</p>
          </div>
        ) : (
          <p key={item.label} className="text-sm font-semibold text-brand-sage/80">{item.label}</p>
        )
      ))}
    </div>
  );
}
