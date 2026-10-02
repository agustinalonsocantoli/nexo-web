import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { Modalidad } from "@/lib/qrForm";
import { MODALIDADES } from "@/lib/welcomeForm";
import type { WelcomeFormValues } from "../welcomeSchema";
import StepHeading from "../StepHeading";
import ChoiceGroup, { type ChoiceOption } from "../ChoiceGroup";
import { ERROR_CLASS } from "../styles";

const TITLE_ID = "modalidad-title";

const MODALIDAD_I18N_KEYS: Record<Modalidad, string> = {
  crossfit: "crossfit",
  "strength-hyrox": "strengthHyrox",
  hyrox: "hyrox",
};

export default function ModalidadStep() {
  const t = useTranslations("welcomeForm.modalidad");
  const {
    formState: { errors },
  } = useFormContext<WelcomeFormValues>();

  const options: ChoiceOption[] = MODALIDADES.map((modalidad) => {
    const key = MODALIDAD_I18N_KEYS[modalidad];
    return { value: modalidad, label: t(`options.${key}.label`), description: t(`options.${key}.description`) };
  });

  const error = errors.modalidad?.message;

  return (
    <>
      <StepHeading id={TITLE_ID} title={t("title")} />
      <div className="mt-6 flex flex-col gap-3">
        <ChoiceGroup name="modalidad" options={options} labelledBy={TITLE_ID} variant="card" />
        {error && <p className={ERROR_CLASS}>{error}</p>}
      </div>
    </>
  );
}
