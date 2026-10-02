import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import type { WelcomeFormValues } from "../welcomeSchema";
import StepHeading from "../StepHeading";
import PrivacyToggle from "../PrivacyToggle";
import { FIELDS_CLASS } from "../styles";

export default function ConsentStep() {
  const t = useTranslations("welcomeForm.consent");
  const { control } = useFormContext<WelcomeFormValues>();
  const whatsapp = useWatch({ control, name: "whatsapp" });

  return (
    <>
      <StepHeading title={t("title")} helper={t("summary", { whatsapp })} />
      <div className={FIELDS_CLASS}>
        <PrivacyToggle />
      </div>
    </>
  );
}
