import { useTranslations } from "next-intl";
import FlowLogo from "./FlowLogo";

const PERCENT = 100;

interface FlowHeaderProps {
  current: number;
  total: number;
}

export default function FlowHeader({ current, total }: FlowHeaderProps) {
  const t = useTranslations("welcomeForm");
  const label = t("progress", { current, total });
  const width = `${Math.round((current / total) * PERCENT)}%`;

  return (
    <header className="mx-auto w-full max-w-[560px] px-6">
      <div className="flex h-16 items-center justify-between">
        <FlowLogo className="h-8" />
        <p aria-live="polite" className="font-body text-sm text-nexo-gray">
          {label}
        </p>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        className="h-1 w-full overflow-hidden rounded-full bg-[#3a3a3a]"
      >
        <div
          className="h-full rounded-full bg-nexo-orange transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width }}
        />
      </div>
    </header>
  );
}
