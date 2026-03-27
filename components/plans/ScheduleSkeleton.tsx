export default function ScheduleSkeleton() {
  return (
    <section className="flex flex-col items-center gap-3">
      <div className="h-[34px] w-24 rounded-full border border-nexo-light-gray animate-pulse bg-nexo-light-gray/40" />

      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            {Array.from({ length: 7 }).map((_, i) => (
              <col key={i} style={{ width: "14.285%" }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="border-0 bg-transparent p-0" />
              {Array.from({ length: 6 }).map((_, i) => (
                <th
                  key={i}
                  className="h-7 border border-black bg-[#757575] lg:h-9"
                >
                  <div className="mx-auto h-2.5 w-4 rounded bg-white/30 animate-pulse sm:w-6" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, row) => (
              <tr key={row}>
                <td className="h-7 border border-black bg-[#757575] lg:h-9">
                  <div className="mx-auto h-2.5 w-8 rounded bg-white/30 animate-pulse" />
                </td>
                {Array.from({ length: 6 }).map((_, col) => (
                  <td
                    key={col}
                    className="h-7 border border-black bg-white lg:h-9"
                  >
                    {Math.random() > 0.3 && (
                      <div className="mx-1 h-3 rounded bg-neutral-200 animate-pulse lg:mx-2" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
