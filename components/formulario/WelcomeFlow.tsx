"use client";

import type { ComponentType, FormEvent } from "react";
import { FormProvider } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useWelcomeFlow, type StepId } from "./useWelcomeFlow";
import FlowHeader from "./FlowHeader";
import FlowNavBar from "./FlowNavBar";
import IntroStep from "./steps/IntroStep";
import DatosStep from "./steps/DatosStep";
import ModalidadStep from "./steps/ModalidadStep";
import CfExpStep from "./steps/CfExpStep";
import PruebaStep from "./steps/PruebaStep";
import SobreTi1Step from "./steps/SobreTi1Step";
import SobreTi2Step from "./steps/SobreTi2Step";
import ConsentStep from "./steps/ConsentStep";
import GraciasStep from "./steps/GraciasStep";

const STEP_COMPONENTS: Record<StepId, ComponentType> = {
  intro: IntroStep,
  datos: DatosStep,
  modalidad: ModalidadStep,
  cfExp: CfExpStep,
  prueba: PruebaStep,
  sobreTi1: SobreTi1Step,
  sobreTi2: SobreTi2Step,
  consent: ConsentStep,
  gracias: GraciasStep,
};

interface WelcomeFlowProps {
  hash: string;
}

export default function WelcomeFlow({ hash }: WelcomeFlowProps) {
  const tw = useTranslations("welcomeForm");
  const tf = useTranslations("forms");
  const { form, stepId, stepNumber, totalSteps, apiError, isSending, canGoBack, goNext, goBack, stepRef } =
    useWelcomeFlow(hash);

  const StepComponent = STEP_COMPONENTS[stepId];
  const showNavBar = stepId !== "gracias";

  let nextLabel = tw("next");
  if (stepId === "intro") nextLabel = tw("start");
  if (stepId === "consent") nextLabel = isSending ? tf("submitting") : tf("submit");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void goNext();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} noValidate aria-busy={isSending} className="flex min-h-dvh flex-col">
        {stepNumber !== undefined && <FlowHeader current={stepNumber} total={totalSteps} />}

        <div
          key={stepId}
          ref={stepRef}
          className="flow-step-enter mx-auto flex w-full max-w-[560px] flex-1 flex-col px-6 pt-8 pb-32"
        >
          <StepComponent />
        </div>

        {showNavBar && (
          <FlowNavBar
            showBack={canGoBack}
            onBack={goBack}
            nextLabel={nextLabel}
            isSending={isSending}
            apiError={apiError}
          />
        )}
      </form>
    </FormProvider>
  );
}
