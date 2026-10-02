import { useController, useFormContext } from "react-hook-form";
import type { WelcomeFieldPath, WelcomeFormValues } from "./welcomeSchema";
import ChoiceChip from "./ChoiceChip";
import ChoiceCard from "./ChoiceCard";

export interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
}

interface ChoiceGroupProps {
  name: WelcomeFieldPath;
  options: ChoiceOption[];
  labelledBy: string;
  multiple?: boolean;
  variant?: "chip" | "card";
}

const LAYOUT_CLASS: Record<"chip" | "card", string> = {
  chip: "flex flex-wrap gap-2",
  card: "flex flex-col gap-3",
};

function toSelectedValues(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  return typeof value === "string" ? [value] : [];
}

export default function ChoiceGroup({
  name,
  options,
  labelledBy,
  multiple = false,
  variant = "chip",
}: ChoiceGroupProps) {
  const { control, trigger } = useFormContext<WelcomeFormValues>();
  const { field, fieldState } = useController({ control, name });
  const selected = toSelectedValues(field.value);

  function handleChange(value: string): void {
    if (multiple) {
      const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
      field.onChange(next);
    } else {
      field.onChange(value);
    }
    if (fieldState.error) void trigger(name);
  }

  return (
    <div role={multiple ? "group" : "radiogroup"} aria-labelledby={labelledBy} className={LAYOUT_CLASS[variant]}>
      {options.map((option, index) =>
        variant === "card" ? (
          <ChoiceCard
            key={option.value}
            name={field.name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={selected.includes(option.value)}
            onChange={handleChange}
            onBlur={field.onBlur}
            inputRef={index === 0 ? field.ref : undefined}
          />
        ) : (
          <ChoiceChip
            key={option.value}
            name={field.name}
            value={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            multiple={multiple}
            onChange={handleChange}
            onBlur={field.onBlur}
            inputRef={index === 0 ? field.ref : undefined}
          />
        ),
      )}
    </div>
  );
}
