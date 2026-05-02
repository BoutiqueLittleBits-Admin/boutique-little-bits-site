export default function BrandLogo({ className = '', light = false }) {
  return (
    <img
      src="/brand/little-bits-boutique-logo-transparent.png"
      alt="Little Bits Boutique"
      className={`brand-logo-image ${light ? 'brand-logo-image-light' : ''} ${className}`}
    />
  );
}
