import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { OBJETIVOS } from "@/lib/welcomeForm";
import type { WelcomeFormValues } from "../welcomeSchema";
import StepHeading from "../StepHeading";
import ChoiceGroup, { type ChoiceOption } from "../ChoiceGroup";
import TextField from "../TextField";
import TextAreaField from "../TextAreaField";
import { ERROR_CLASS, FIELDS_CLASS } from "../styles";

const TITLE_ID = "objetivos-title";
const EXTRA_ROWS = 2;

export default function SobreTi2Step() {
  const t = useTranslations("welcomeForm.sobreTi2");
  const {
    control,
    formState: { errors },
  } = useFormContext<WelcomeFormValues>();

  const objetivos = useWatch({ control, name: "objetivos" });
  const hasOtro = objetivos.includes("otro");
  const error = errors.objetivos?.message;

  const options: ChoiceOption[] = OBJETIVOS.map((objetivo) => ({ value: objetivo, label: t(`goals.${objetivo}`) }));

  return (
    <>
      <StepHeading id={TITLE_ID} title={t("title")} helper={t("subtitle")} />
      <div className={FIELDS_CLASS}>
        <ChoiceGroup name="objetivos" options={options} labelledBy={TITLE_ID} multiple />
        {error && <p className={ERROR_CLASS}>{error}</p>}

        {hasOtro && <TextField name="objetivoOtro" label={t("otherLabel")} placeholder={t("otherPlaceholder")} />}

        <TextAreaField name="extra" label={t("extraLabel")} placeholder={t("extraPlaceholder")} rows={EXTRA_ROWS} />
      </div>
    </>
  );
}
