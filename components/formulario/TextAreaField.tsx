import { useFormContext } from "react-hook-form";
import type { WelcomeFieldPath, WelcomeFormValues } from "./welcomeSchema";
import { submitOnModEnter } from "./keyboard";
import { ERROR_CLASS, FIELD_CLASS, LABEL_CLASS, TEXTAREA_BASE, inputBorderClass, toFieldId } from "./styles";

const DEFAULT_ROWS = 3;

interface TextAreaFieldProps {
  name: WelcomeFieldPath;
  label: string;
  placeholder?: string;
  rows?: number;
}

export default function TextAreaField({ name, label, placeholder, rows = DEFAULT_ROWS }: TextAreaFieldProps) {
  const { register, getFieldState, formState } = useFormContext<WelcomeFormValues>();
  const { error } = getFieldState(name, formState);
  const id = toFieldId(name);

  return (
    <div className={FIELD_CLASS}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error?.message ? `${id}-error` : undefined}
        onKeyDown={submitOnModEnter}
        suppressHydrationWarning
        {...register(name)}
        className={`${TEXTAREA_BASE} ${inputBorderClass(Boolean(error))}`}
      />
      {error?.message && <p id={`${id}-error`} className={ERROR_CLASS}>{error.message}</p>}
    </div>
  );
}
