import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { WelcomeFormValues } from "../welcomeSchema";
import StepHeading from "../StepHeading";
import TextField from "../TextField";
import TextAreaField from "../TextAreaField";
import YesNoGroup from "../YesNoGroup";
import { ERROR_CLASS, FIELD_CLASS, FIELDS_CLASS, LABEL_CLASS } from "../styles";

const INJURY_LABEL_ID = "lesion-label";

export default function SobreTi1Step() {
  const t = useTranslations("welcomeForm.sobreTi1");
  const tf = useTranslations("forms");
  const {
    control,
    formState: { errors },
  } = useFormContext<WelcomeFormValues>();

  const lesion = useWatch({ control, name: "lesion" });
  const lesionError = errors.lesion?.message;

  return (
    <>
      <StepHeading title={t("title")} />
      <div className={FIELDS_CLASS}>
        <TextField name="deporte" label={t("sport")} placeholder={t("sportPlaceholder")} autoCapitalize="sentences" />

        <div className={FIELD_CLASS}>
          <p id={INJURY_LABEL_ID} className={LABEL_CLASS}>
            {t("injury")}
          </p>
          <YesNoGroup name="lesion" labelledBy={INJURY_LABEL_ID} />
          {lesionError && <p className={ERROR_CLASS}>{lesionError}</p>}
        </div>

        {lesion === "si" && (
          <TextAreaField
            name="lesionDetalle"
            label={tf("injuryDetail")}
            placeholder={tf("injuryDetailPlaceholder")}
          />
        )}
      </div>
    </>
  );
}
