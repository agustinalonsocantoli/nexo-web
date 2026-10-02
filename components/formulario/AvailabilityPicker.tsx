import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { DIAS, FRANJAS } from "@/lib/welcomeForm";
import type { WelcomeFormValues } from "./welcomeSchema";
import ChoiceGroup, { type ChoiceOption } from "./ChoiceGroup";
import { ERROR_CLASS, FIELD_CLASS, INPUT_BASE, LABEL_CLASS, inputBorderClass } from "./styles";

const DAYS_LABEL_ID = "disponibilidad-dias-label";
const SLOTS_LABEL_ID = "disponibilidad-franjas-label";
const TEXT_ID = "disponibilidad-texto";
const SUBLABEL_CLASS = "font-body text-sm text-nexo-gray";

interface AvailabilityPickerProps {
  question?: string;
}

export default function AvailabilityPicker({ question }: AvailabilityPickerProps) {
  const t = useTranslations("welcomeForm.availability");
  const {
    register,
    formState: { errors },
  } = useFormContext<WelcomeFormValues>();

  const errorMessage = errors.disponibilidad?.texto?.message;
  const dayOptions: ChoiceOption[] = DIAS.map((dia) => ({ value: dia, label: t(`days.${dia}`) }));
  const slotOptions: ChoiceOption[] = FRANJAS.map((franja) => ({ value: franja, label: t(`slots.${franja}`) }));

  return (
    <div className="flex flex-col gap-4">
      {question && <p className={LABEL_CLASS}>{question}</p>}

      <div className={FIELD_CLASS}>
        <p id={DAYS_LABEL_ID} className={SUBLABEL_CLASS}>
          {t("daysLabel")}
        </p>
        <ChoiceGroup name="disponibilidad.dias" options={dayOptions} labelledBy={DAYS_LABEL_ID} multiple />
      </div>

      <div className={FIELD_CLASS}>
        <p id={SLOTS_LABEL_ID} className={SUBLABEL_CLASS}>
          {t("slotsLabel")}
        </p>
        <ChoiceGroup name="disponibilidad.franjas" options={slotOptions} labelledBy={SLOTS_LABEL_ID} multiple />
      </div>

      <div className={FIELD_CLASS}>
        <label htmlFor={TEXT_ID} className={SUBLABEL_CLASS}>
          {t("textLabel")}
        </label>
        <input
          id={TEXT_ID}
          type="text"
          placeholder={t("textPlaceholder")}
          suppressHydrationWarning
          {...register("disponibilidad.texto")}
          className={`${INPUT_BASE} ${inputBorderClass(Boolean(errorMessage))}`}
        />
      </div>

      {errorMessage && <p className={ERROR_CLASS}>{errorMessage}</p>}
    </div>
  );
}
