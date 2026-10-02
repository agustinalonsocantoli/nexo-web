import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import PhoneField from "@/components/PhoneField";
import type { WelcomeFormValues } from "../welcomeSchema";
import StepHeading from "../StepHeading";
import TextField from "../TextField";
import { ERROR_CLASS, FIELD_CLASS, FIELDS_CLASS, LABEL_CLASS } from "../styles";

const PHONE_ID = "whatsapp";

export default function DatosStep() {
  const t = useTranslations("welcomeForm.datos");
  const tf = useTranslations("forms");
  const {
    control,
    formState: { errors },
  } = useFormContext<WelcomeFormValues>();

  return (
    <>
      <StepHeading title={t("title")} />
      <div className={FIELDS_CLASS}>
        <TextField
          name="nombre"
          label={tf("name")}
          placeholder={tf("namePlaceholder")}
          autoComplete="name"
          autoCapitalize="words"
        />
        <div className={FIELD_CLASS}>
          <label htmlFor={PHONE_ID} className={LABEL_CLASS}>
            {tf("phone")}
          </label>
          <PhoneField control={control} name="whatsapp" error={errors.whatsapp} id={PHONE_ID} />
          {errors.whatsapp && <p className={ERROR_CLASS}>{errors.whatsapp.message ?? tf("phoneError")}</p>}
        </div>
      </div>
    </>
  );
}
