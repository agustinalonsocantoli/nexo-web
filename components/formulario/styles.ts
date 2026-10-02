export const HEADING_CLASS =
  "font-heading text-[22px] font-bold uppercase leading-[110%] tracking-[0.6px] text-white focus:outline-none md:text-[28px]";

export const HELPER_CLASS = "mt-2 font-body text-base leading-6 text-white/80";

export const LABEL_CLASS = "font-body text-base leading-5 text-white";

export const ERROR_CLASS = "font-body text-sm text-red-400";

export const INPUT_BASE =
  "w-full rounded-lg border bg-[#262626] px-4 py-2.5 font-body text-base text-white placeholder:text-[#7a7a7a] focus:border-nexo-orange focus:outline-none md:text-sm";

export const TEXTAREA_BASE = `${INPUT_BASE} resize-none`;

export const FIELDS_CLASS = "mt-6 flex flex-col gap-4";

export const FIELD_CLASS = "flex flex-col gap-2";

export const FOCUS_RING_CLASS =
  "has-focus-visible:ring-2 has-focus-visible:ring-nexo-orange has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-[#1a1a1a]";

export function inputBorderClass(hasError: boolean): string {
  return hasError ? "border-red-500" : "border-[#3a3a3a]";
}

export function toFieldId(name: string): string {
  return name.replace(/\./g, "-");
}
