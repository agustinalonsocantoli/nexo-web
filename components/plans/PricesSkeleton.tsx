export default function PricesSkeleton() {
  return (
    <section className="flex flex-col items-center gap-4">
      <div className="h-[34px] w-24 rounded-full border border-nexo-light-gray animate-pulse bg-nexo-light-gray/40" />

      <div className="flex w-full flex-col gap-4 lg:grid lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-nexo-dark px-5 py-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-28 rounded bg-white/10 animate-pulse" />
                <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
              </div>
              <div className="h-8 w-16 rounded bg-white/10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
