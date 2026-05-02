export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-lavender border-t-brand-plum" />
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-brand-plum">Loading Little Bits</p>
      </div>
    </div>
  );
}
