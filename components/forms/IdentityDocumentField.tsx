"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { DOCUMENT_TYPES } from "@/lib/identity";

interface IdentityDocumentFieldProps {
  typeField: UseFormRegisterReturn;
  numberField: UseFormRegisterReturn;
  typeError?: FieldError;
  numberError?: FieldError;
}

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-2 font-body text-sm text-nexo-dark placeholder:text-[#cac4d0] focus:border-nexo-orange focus:outline-none";

const labelClass = "font-body text-base leading-5 text-nexo-dark";

export default function IdentityDocumentField({
  typeField,
  numberField,
  typeError,
  numberError,
}: IdentityDocumentFieldProps) {
  const tf = useTranslations("forms");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="documento" className={labelClass}>
        {tf("identityDocument")}
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        {/* Tipo de documento */}
        <div className="relative sm:w-[160px] sm:shrink-0">
          <select
            id="tipoDocumento"
            aria-label={tf("documentType")}
            {...typeField}
            className={`appearance-none pr-10 ${inputBase} ${typeError ? "border-red-500" : "border-[#cac4d0]"}`}
          >
            <option value="">{tf("documentType")}</option>
            {DOCUMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {tf(`documentTypes.${type}`)}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#878787]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        {/* Número de documento */}
        <input
          id="documento"
          type="text"
          autoComplete="off"
          autoCapitalize="characters"
          placeholder={tf("documentNumberPlaceholder")}
          {...numberField}
          className={`${inputBase} ${numberError ? "border-red-500" : "border-[#cac4d0]"}`}
        />
      </div>

      {typeError && <p className="font-body text-sm text-red-500">{typeError.message}</p>}
      {numberError && <p className="font-body text-sm text-red-500">{numberError.message}</p>}
    </div>
  );
}
