"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

interface InjuryFieldProps {
  value?: "si" | "no";
  onSelect: (value: "si" | "no") => void;
  detailField: UseFormRegisterReturn;
  error?: FieldError;
  detailError?: FieldError;
}

const labelClass = "font-body text-base leading-5 text-nexo-dark";

export default function InjuryField({
  value,
  onSelect,
  detailField,
  error,
  detailError,
}: InjuryFieldProps) {
  const tf = useTranslations("forms");

  return (
    <div className="flex flex-col gap-2">
      <p id="lesion-label" className={labelClass}>
        {tf("injuryQuestion")}
      </p>

      <div role="radiogroup" aria-labelledby="lesion-label" className="flex items-center gap-6">
        {(["si", "no"] as const).map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onSelect(option)}
            className="flex items-center gap-2"
          >
            <span className="font-body text-[17px] leading-none text-[#232a34]">
              {option === "si" ? tf("yes") : tf("no")}
            </span>
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-nexo-orange">
              {value === option && <span className="h-[14px] w-[14px] rounded-full bg-nexo-orange" />}
            </span>
          </button>
        ))}
      </div>

      {error && <p className="font-body text-sm text-red-500">{error.message}</p>}

      {value === "si" && (
        <div className="mt-2 flex flex-col gap-2">
          <label htmlFor="lesionDetalle" className={labelClass}>
            {tf("injuryDetail")}
          </label>
          <textarea
            id="lesionDetalle"
            rows={3}
            placeholder={tf("injuryDetailPlaceholder")}
            suppressHydrationWarning
            {...detailField}
            className={`w-full resize-none rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none ${
              detailError ? "border-red-500" : "border-[#cac4d0]"
            }`}
          />
          {detailError && <p className="font-body text-sm text-red-500">{detailError.message}</p>}
        </div>
      )}
    </div>
  );
}
