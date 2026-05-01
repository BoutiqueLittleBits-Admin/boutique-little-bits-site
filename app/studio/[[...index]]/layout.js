export const metadata = {
  title: 'Boutique Little Bits Admin',
  description: 'Product management dashboard',
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
