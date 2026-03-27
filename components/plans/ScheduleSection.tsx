import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getScheduleSlots } from "@/lib/queries";
import { getTranslations } from "next-intl/server";

type ClassType = "crossfit" | "hyrox" | "strength" | "wlgym" | null;

interface ScheduleCell {
  name: string;
  type: ClassType;
}

interface ScheduleRow {
  time: string;
  L: ScheduleCell | null;
  M: ScheduleCell | null;
  X: ScheduleCell | null;
  J: ScheduleCell | null;
  V: ScheduleCell | null;
  S: ScheduleCell | null;
}

function cellStyle(type: ClassType): string {
  switch (type) {
    case "hyrox":
      return "bg-[#ffbe96] text-[#1e1e1e]";
    case "crossfit":
      return "bg-[#ff731c] text-[#1e1e1e]";
    case "strength":
      return "bg-[#903700] text-white";
    case "wlgym":
      return "bg-[#262626] text-white";
    default:
      return "";
  }
}

function ScheduleCellComponent({ cell }: { cell: ScheduleCell | null }) {
  if (!cell)
    return <td className="h-7 border border-black bg-white lg:h-9" />;
  return (
    <td
      className={`h-7 border border-black px-1 text-center font-body text-[7px] font-semibold leading-tight lg:h-9 lg:px-2 lg:text-[11px] ${cellStyle(cell.type)}`}
    >
      {cell.name}
    </td>
  );
}

function buildScheduleGrid(
  slots: {
    time: string;
    dayOfWeek: string;
    className: string;
    classType: string;
  }[]
): ScheduleRow[] {
  const DAYS = ["L", "M", "X", "J", "V", "S"] as const;
  const timeOrder: string[] = [];
  const grid = new Map<string, Map<string, ScheduleCell[]>>();

  for (const slot of slots) {
    if (!grid.has(slot.time)) {
      timeOrder.push(slot.time);
      grid.set(slot.time, new Map());
    }
    const dayMap = grid.get(slot.time)!;
    const existing = dayMap.get(slot.dayOfWeek) ?? [];
    existing.push({
      name: slot.className,
      type: slot.classType as ClassType,
    });
    dayMap.set(slot.dayOfWeek, existing);
  }

  const rows: ScheduleRow[] = [];

  for (const time of timeOrder) {
    const dayMap = grid.get(time)!;
    let maxLayers = 1;
    for (const day of DAYS) {
      const cells = dayMap.get(day);
      if (cells && cells.length > maxLayers) maxLayers = cells.length;
    }

    for (let layer = 0; layer < maxLayers; layer++) {
      const row: ScheduleRow = {
        time: layer === 0 ? time : "",
        L: null,
        M: null,
        X: null,
        J: null,
        V: null,
        S: null,
      };
      for (const day of DAYS) {
        const cells = dayMap.get(day);
        if (cells && cells[layer]) {
          row[day] = cells[layer];
        }
      }
      rows.push(row);
    }
  }

  return rows;
}

export default async function ScheduleSection() {
  const [scheduleSlots, t] = await Promise.all([
    getScheduleSlots(),
    getTranslations("plans"),
  ]);

  const scheduleData = buildScheduleGrid(scheduleSlots);
  const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat"] as const;
  const days = dayKeys.map((k) => t(`days.${k}`));

  return (
    <AnimateOnScroll delay={100}>
      <section className="flex flex-col items-center gap-3">
        <span className="rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark">
          {t("scheduleBadge")}
        </span>

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
                {days.map((day) => (
                  <th
                    key={day}
                    className="h-7 border border-black bg-[#757575] px-0.5 text-center font-body text-[5px] font-semibold text-white sm:text-[7px] lg:h-9 lg:px-3 lg:text-[11px]"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.map((row, i) => (
                <tr key={i}>
                  <td className="h-7 whitespace-nowrap border border-black bg-[#757575] px-1 text-center font-body text-[7px] font-semibold text-white lg:h-9 lg:px-3 lg:text-[11px]">
                    {row.time}
                  </td>
                  <ScheduleCellComponent cell={row.L} />
                  <ScheduleCellComponent cell={row.M} />
                  <ScheduleCellComponent cell={row.X} />
                  <ScheduleCellComponent cell={row.J} />
                  <ScheduleCellComponent cell={row.V} />
                  <ScheduleCellComponent cell={row.S} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-full items-center gap-3 pt-1">
          <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-nexo-dark mb-0.5" />
          <p className="font-body text-[12px] text-nexo-dark">{t("legend")}</p>
        </div>
      </section>
    </AnimateOnScroll>
  );
}
