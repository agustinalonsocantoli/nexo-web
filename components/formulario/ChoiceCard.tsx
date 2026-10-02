import type { RefCallBack } from "react-hook-form";
import { FOCUS_RING_CLASS } from "./styles";

const CARD_BASE = `flex min-h-[72px] cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4 transition-colors ${FOCUS_RING_CLASS}`;
const CARD_SELECTED = "border-nexo-orange bg-nexo-orange/10";
const CARD_UNSELECTED = "border-[#3a3a3a] bg-[#262626]";

interface ChoiceCardProps {
  name: string;
  value: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef?: RefCallBack;
}

export default function ChoiceCard({
  name,
  value,
  label,
  description,
  checked,
  onChange,
  onBlur,
  inputRef,
}: ChoiceCardProps) {
  const handleChange = () => onChange(value);
  const stateClass = checked ? CARD_SELECTED : CARD_UNSELECTED;

  return (
    <label className={`${CARD_BASE} ${stateClass}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        ref={inputRef}
        className="sr-only"
      />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-heading text-base font-bold uppercase text-white">{label}</span>
        {description && <span className="font-body text-sm text-nexo-gray">{description}</span>}
      </span>
      {checked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 text-nexo-orange"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </label>
  );
}
