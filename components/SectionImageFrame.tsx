"use client";

export default function SectionImageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[280px] w-full items-center justify-center rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-100/90 p-4 sm:min-h-[360px] sm:p-6 md:min-h-[420px] md:p-8 lg:min-h-[min(72vh,560px)]">
      <div className="relative h-full w-full max-w-[min(100%,920px)]">{children}</div>
    </div>
  );
}
