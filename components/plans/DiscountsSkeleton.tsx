export default function DiscountsSkeleton() {
  return (
    <section className="flex flex-col items-center gap-4">
      <div className="h-[34px] w-28 rounded-full border border-nexo-light-gray animate-pulse bg-nexo-light-gray/40" />

      <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-nexo-light-gray p-2 shadow-md lg:p-4"
          >
            <div className="h-3.5 w-24 rounded bg-neutral-200 animate-pulse" />
            <div className="mt-2 h-7 w-14 rounded bg-neutral-200 animate-pulse" />
            <div className="mt-2 h-2.5 w-20 rounded bg-neutral-100 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}
