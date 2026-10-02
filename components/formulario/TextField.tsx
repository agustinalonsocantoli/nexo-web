import { useFormContext } from "react-hook-form";
import type { WelcomeFieldPath, WelcomeFormValues } from "./welcomeSchema";
import { ERROR_CLASS, FIELD_CLASS, INPUT_BASE, LABEL_CLASS, inputBorderClass, toFieldId } from "./styles";

interface TextFieldProps {
  name: WelcomeFieldPath;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  autoCapitalize?: string;
}

export default function TextField({ name, label, placeholder, autoComplete, autoCapitalize }: TextFieldProps) {
  const { register, getFieldState, formState } = useFormContext<WelcomeFormValues>();
  const { error } = getFieldState(name, formState);
  const id = toFieldId(name);

  return (
    <div className={FIELD_CLASS}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        aria-invalid={Boolean(error)}
        aria-describedby={error?.message ? `${id}-error` : undefined}
        suppressHydrationWarning
        {...register(name)}
        className={`${INPUT_BASE} ${inputBorderClass(Boolean(error))}`}
      />
      {error?.message && <p id={`${id}-error`} className={ERROR_CLASS}>{error.message}</p>}
    </div>
  );
}
