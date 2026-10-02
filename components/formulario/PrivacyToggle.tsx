import { useController, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { WelcomeFormValues } from "./welcomeSchema";
import { ERROR_CLASS, LABEL_CLASS } from "./styles";

const SWITCH_CLASS =
  "relative h-[26px] w-[42px] shrink-0 overflow-hidden rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexo-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]";

export default function PrivacyToggle() {
  const tf = useTranslations("forms");
  const { control, trigger } = useFormContext<WelcomeFormValues>();
  const { field, fieldState } = useController({ control, name: "privacidad" });

  const privacidad = Boolean(field.value);
  const error = fieldState.error?.message;

  function handleToggle(): void {
    field.onChange(!privacidad);
    if (error) void trigger("privacidad");
  }

  const trackClass = privacidad ? "bg-nexo-orange" : "bg-[#3a3a3a]";
  const knobClass = privacidad ? "translate-x-[19px]" : "translate-x-[3px]";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <button
          ref={field.ref}
          type="button"
          role="switch"
          aria-checked={privacidad}
          onClick={handleToggle}
          onBlur={field.onBlur}
          className={`${SWITCH_CLASS} ${trackClass}`}
        >
          <span
            className={`absolute left-0 top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${knobClass}`}
          />
        </button>
        <p className={LABEL_CLASS}>
          {tf.rich("privacy", {
            link: (chunks) => (
              <Link href="/privacy" className="underline hover:text-nexo-orange">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
      {error && <p className={ERROR_CLASS}>{error}</p>}
    </div>
  );
}
