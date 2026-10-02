import { useTranslations } from "next-intl";
import { ERROR_CLASS } from "./styles";

const BACK_CLASS =
  "flex min-h-12 shrink-0 items-center gap-1 rounded-lg border border-[#3a3a3a] bg-[#262626] px-4 font-body text-base text-white transition-colors hover:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexo-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]";

const NEXT_CLASS =
  "flex min-h-12 flex-1 items-center justify-center gap-3 rounded-lg bg-nexo-orange px-6 font-body text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexo-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a] disabled:cursor-not-allowed disabled:opacity-50";

interface FlowNavBarProps {
  showBack: boolean;
  onBack: () => void;
  nextLabel: string;
  isSending: boolean;
  apiError: string | null;
}

export default function FlowNavBar({ showBack, onBack, nextLabel, isSending, apiError }: FlowNavBarProps) {
  const t = useTranslations("welcomeForm");

  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-[#3a3a3a] bg-[#1a1a1a]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[560px] flex-col gap-2 px-6 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {apiError && (
          <p role="alert" className={ERROR_CLASS}>
            {apiError}
          </p>
        )}
        <div className="flex gap-3">
          {showBack && (
            <button type="button" onClick={onBack} className={BACK_CLASS}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              {t("back")}
            </button>
          )}
          <button type="submit" disabled={isSending} className={NEXT_CLASS}>
            {nextLabel}
            {!isSending && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
