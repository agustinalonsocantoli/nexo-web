"use client";
import 'react-phone-number-input/style.css';
import dynamic from "next/dynamic";
import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";

const PhoneInput = dynamic(() => import("react-phone-number-input"), { ssr: false });

interface PhoneFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  id?: string;
}

export default function PhoneField<T extends FieldValues>({
  control,
  name,
  error,
  id,
}: PhoneFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <PhoneInput
          id={id}
          international
          defaultCountry="ES"
          value={field.value as string | undefined}
          onChange={(value) => field.onChange(value ?? "")}
          className={`nexo-phone-input${error ? " nexo-phone-input--error" : ""}`}
        />
      )}
    />
  );
}
