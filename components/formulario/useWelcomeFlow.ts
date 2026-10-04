import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useForm, useWatch, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import type { Modalidad, SiNo } from "@/lib/qrForm";
import {
  WELCOME_DEFAULT_VALUES,
  buildWelcomePayload,
  createWelcomeSchema,
  type WelcomeFieldPath,
  type WelcomeFormValues,
} from "./welcomeSchema";

export type StepId =
  | "intro"
  | "datos"
  | "modalidad"
  | "cfExp"
  | "prueba"
  | "sobreTi1"
  | "sobreTi2"
  | "consent"
  | "gracias";

const WELCOME_API_URL = "/api/send/welcome";

interface Branch {
  modalidad: Modalidad | undefined;
  experiencia: SiNo | undefined;
}

function getBranchSteps({ modalidad, experiencia }: Branch): StepId[] {
  if (modalidad !== "crossfit") return ["prueba"];
  return experiencia === "si" ? ["cfExp", "prueba"] : ["cfExp"];
}

function getStepOrder(branch: Branch): StepId[] {
  return ["datos", "modalidad", ...getBranchSteps(branch), "sobreTi1", "sobreTi2", "consent"];
}

const CF_EXP_FIELDS_WITHOUT_AVAILABILITY: WelcomeFieldPath[] = ["experiencia", "expDetalle"];

const STEP_FIELDS: Record<StepId, WelcomeFieldPath[]> = {
  intro: [],
  datos: ["nombre", "whatsapp"],
  modalidad: ["modalidad"],
  cfExp: ["experiencia", "expDetalle", "disponibilidad"],
  prueba: ["disponibilidad"],
  sobreTi1: ["deporte", "lesion", "lesionDetalle"],
  sobreTi2: ["objetivos", "objetivoOtro", "extra"],
  consent: ["privacidad"],
  gracias: [],
};

const STEP_AUTOFOCUS: Partial<Record<StepId, WelcomeFieldPath>> = {
  datos: "nombre",
  sobreTi1: "deporte",
};

const FOCUS_TARGET: Partial<Record<WelcomeFieldPath, WelcomeFieldPath>> = {
  disponibilidad: "disponibilidad.dias",
};

function getNextStep(step: StepId, { modalidad, experiencia }: Branch): StepId | null {
  switch (step) {
    case "intro":
      return "datos";
    case "datos":
      return "modalidad";
    case "modalidad":
      return modalidad === "crossfit" ? "cfExp" : "prueba";
    case "cfExp":
      return experiencia === "si" ? "prueba" : "sobreTi1";
    case "prueba":
      return "sobreTi1";
    case "sobreTi1":
      return "sobreTi2";
    case "sobreTi2":
      return "consent";
    default:
      return null;
  }
}

export interface UseWelcomeFlowResult {
  form: UseFormReturn<WelcomeFormValues>;
  stepId: StepId;
  stepNumber: number | undefined;
  totalSteps: number;
  apiError: string | null;
  isSending: boolean;
  canGoBack: boolean;
  goNext: () => Promise<void>;
  goBack: () => void;
  stepRef: RefObject<HTMLDivElement | null>;
}

export function useWelcomeFlow(hash: string): UseWelcomeFlowResult {
  const locale = useLocale();
  const tf = useTranslations("forms");
  const tv = useTranslations("validation");
  const tw = useTranslations("welcomeForm.validation");

  const schema = useMemo(() => createWelcomeSchema(tv, tw), [tv, tw]);

  const form = useForm<WelcomeFormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: WELCOME_DEFAULT_VALUES,
  });

  const [stepId, setStepId] = useState<StepId>("intro");
  const [modalidad, experiencia] = useWatch({ control: form.control, name: ["modalidad", "experiencia"] });
  const stepOrder = getStepOrder({ modalidad, experiencia });
  const stepIndex = stepOrder.indexOf(stepId);
  const [history, setHistory] = useState<StepId[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const stepRef = useRef<HTMLDivElement>(null);
  const hasNavigatedRef = useRef(false);

  const { setFocus } = form;

  useEffect(() => {
    if (!hasNavigatedRef.current) return;

    window.scrollTo({ top: 0 });

    const autofocusField = STEP_AUTOFOCUS[stepId];
    if (autofocusField) setFocus(autofocusField);
    else stepRef.current?.querySelector<HTMLElement>("h1")?.focus();

  }, [stepId, setFocus]);

  function pushStep(next: StepId): void {
    hasNavigatedRef.current = true;
    setHistory((prev) => [...prev, stepId]);
    setStepId(next);
  }

  function focusFirstInvalid(fields: WelcomeFieldPath[]): void {
    const invalid = fields.find((field) => form.getFieldState(field).error);
    if (!invalid) return;
    setFocus(FOCUS_TARGET[invalid] ?? invalid);
  }

  async function submitAnswers(): Promise<void> {
    const payload = buildWelcomePayload(form.getValues(), locale, hash);
    if (!payload) return;

    setApiError(null);
    setIsSending(true);
    try {
      const res = await fetch(WELCOME_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      pushStep("gracias");
    } catch {
      setApiError(tf("apiError"));
    } finally {
      setIsSending(false);
    }
  }

  async function goNext(): Promise<void> {
    if (isSending) return;

    const skipAvailability = stepId === "cfExp" && form.getValues("experiencia") !== "no";
    const fields = skipAvailability ? CF_EXP_FIELDS_WITHOUT_AVAILABILITY : STEP_FIELDS[stepId];
    if (fields.length > 0) {
      const isValid = await form.trigger(fields);
      if (!isValid) {
        focusFirstInvalid(fields);
        return;
      }
    }

    if (stepId === "consent") {
      await submitAnswers();
      return;
    }

    const next = getNextStep(stepId, {
      modalidad: form.getValues("modalidad"),
      experiencia: form.getValues("experiencia"),
    });
    if (next) pushStep(next);
  }

  function goBack(): void {
    const previous = history[history.length - 1];
    if (!previous) return;
    hasNavigatedRef.current = true;
    setApiError(null);
    setHistory(history.slice(0, -1));
    setStepId(previous);
  }

  const canGoBack = history.length > 0 && stepId !== "gracias" && !isSending;

  return {
    form,
    stepId,
    stepNumber: stepIndex === -1 ? undefined : stepIndex + 1,
    totalSteps: stepOrder.length,
    apiError,
    isSending,
    canGoBack,
    goNext,
    goBack,
    stepRef,
  };
}
