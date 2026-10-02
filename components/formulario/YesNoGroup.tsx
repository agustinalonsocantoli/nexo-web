import { useTranslations } from "next-intl";
import type { WelcomeFieldPath } from "./welcomeSchema";
import ChoiceGroup, { type ChoiceOption } from "./ChoiceGroup";

interface YesNoGroupProps {
  name: WelcomeFieldPath;
  labelledBy: string;
}

export default function YesNoGroup({ name, labelledBy }: YesNoGroupProps) {
  const tf = useTranslations("forms");
  const options: ChoiceOption[] = [
    { value: "si", label: tf("yes") },
    { value: "no", label: tf("no") },
  ];

  return <ChoiceGroup name={name} options={options} labelledBy={labelledBy} />;
}
