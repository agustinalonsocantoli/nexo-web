export default function SessionsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-nexo-light-gray bg-white px-5 py-4 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] flex flex-col items-center gap-3"
        >
          <div className="h-8 w-32 rounded bg-neutral-200 animate-pulse" />
          <div className="h-5 w-40 rounded bg-neutral-200 animate-pulse" />
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-neutral-200 animate-pulse" />
            <div className="h-5 w-28 rounded bg-neutral-200 animate-pulse" />
          </div>
          <div className="mt-1 h-10 w-full rounded-lg bg-nexo-orange/20 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
