import { useTranslations } from "next-intl";
import FlowLogo from "../FlowLogo";
import { HEADING_CLASS, HELPER_CLASS } from "../styles";

export default function GraciasStep() {
  const t = useTranslations("welcomeForm.gracias");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
      <FlowLogo className="h-14" />
      <h1 tabIndex={-1} className={HEADING_CLASS}>
        {t("title")}
      </h1>
      <div>
        <p className={HELPER_CLASS}>{t("text")}</p>
        <p className="mt-3 font-body text-sm text-nexo-gray">{t("close")}</p>
      </div>
    </div>
  );
}
