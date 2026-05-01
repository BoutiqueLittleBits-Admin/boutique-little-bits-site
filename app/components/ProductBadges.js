"use client";

export function getProductBadges(product = {}) {
  const badges = [];
  const category = product.category?.title?.toLowerCase() || "";
  const title = product.title?.toLowerCase() || "";
  const price = Number(product.basePrice || 0);

  if (product.featured) badges.push("Best Seller");
  if (product.hasPersonalization || title.includes("custom") || title.includes("personalized")) badges.push("Personalized");
  if (price > 0 && price < 25) badges.push("Under $25");
  if (category.includes("kids") || title.includes("kid")) badges.push("Kids Favorite");
  if (category.includes("spa") || title.includes("spa")) badges.push("Self-Care Gift");
  if (!badges.includes("Personalized")) badges.push("Gift Ready");
  if (!badges.includes("Best Seller")) badges.push("Ships Fast");

  return badges.slice(0, 2);
}

export default function ProductBadges({ product }) {
  const badges = getProductBadges(product);

  if (!badges.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span key={badge} className="rounded-full bg-brand-lavender px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-plum">
          {badge}
        </span>
      ))}
    </div>
  );
}
