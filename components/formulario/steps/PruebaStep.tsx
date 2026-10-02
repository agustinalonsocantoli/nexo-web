import { useTranslations } from "next-intl";
import StepHeading from "../StepHeading";
import AvailabilityPicker from "../AvailabilityPicker";
import { FIELDS_CLASS } from "../styles";

export default function PruebaStep() {
  const t = useTranslations("welcomeForm.prueba");

  return (
    <>
      <StepHeading title={t("title")} helper={t("subtitle")} />
      <div className={FIELDS_CLASS}>
        <AvailabilityPicker />
      </div>
    </>
  );
}
