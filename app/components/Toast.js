"use client";

export default function Toast({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-brand-sage text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <span className="font-bold">Added</span>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
