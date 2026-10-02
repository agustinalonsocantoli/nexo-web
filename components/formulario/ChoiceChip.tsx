import type { RefCallBack } from "react-hook-form";
import { FOCUS_RING_CLASS } from "./styles";

const CHIP_BASE = `inline-flex min-h-11 cursor-pointer select-none items-center justify-center rounded-full border px-4 font-body text-sm transition-colors ${FOCUS_RING_CLASS}`;
const CHIP_SELECTED = "border-white bg-white text-nexo-dark";
const CHIP_UNSELECTED = "border-[#3a3a3a] bg-[#262626] text-white";

interface ChoiceChipProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  multiple: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  inputRef?: RefCallBack;
}

export default function ChoiceChip({
  name,
  value,
  label,
  checked,
  multiple,
  onChange,
  onBlur,
  inputRef,
}: ChoiceChipProps) {
  const handleChange = () => onChange(value);
  const stateClass = checked ? CHIP_SELECTED : CHIP_UNSELECTED;

  return (
    <label className={`${CHIP_BASE} ${stateClass}`}>
      <input
        type={multiple ? "checkbox" : "radio"}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        onBlur={onBlur}
        ref={inputRef}
        className="sr-only"
      />
      {label}
    </label>
  );
}
