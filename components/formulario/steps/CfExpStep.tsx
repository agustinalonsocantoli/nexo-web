import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { WelcomeFormValues } from "../welcomeSchema";
import StepHeading from "../StepHeading";
import YesNoGroup from "../YesNoGroup";
import TextAreaField from "../TextAreaField";
import AvailabilityPicker from "../AvailabilityPicker";
import { ERROR_CLASS, FIELDS_CLASS } from "../styles";

const TITLE_ID = "cf-exp-title";

export default function CfExpStep() {
  const t = useTranslations("welcomeForm.cfExp");
  const {
    control,
    formState: { errors },
  } = useFormContext<WelcomeFormValues>();

  const experiencia = useWatch({ control, name: "experiencia" });
  const error = errors.experiencia?.message;

  return (
    <>
      <StepHeading id={TITLE_ID} title={t("title")} />
      <div className={FIELDS_CLASS}>
        <YesNoGroup name="experiencia" labelledBy={TITLE_ID} />
        {error && <p className={ERROR_CLASS}>{error}</p>}

        {experiencia === "si" && (
          <TextAreaField name="expDetalle" label={t("detailLabel")} placeholder={t("detailPlaceholder")} />
        )}
        {experiencia === "no" && <AvailabilityPicker question={t("availabilityLabel")} />}
      </div>
    </>
  );
}
