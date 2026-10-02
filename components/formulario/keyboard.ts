import type { KeyboardEvent } from "react";

export function submitOnModEnter(event: KeyboardEvent<HTMLTextAreaElement>): void {
  const isModEnter = event.key === "Enter" && (event.metaKey || event.ctrlKey);
  if (!isModEnter) return;
  event.preventDefault();
  event.currentTarget.form?.requestSubmit();
}
