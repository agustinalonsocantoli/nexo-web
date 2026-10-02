import { HEADING_CLASS, HELPER_CLASS } from "./styles";

interface StepHeadingProps {
  title: string;
  helper?: string;
  id?: string;
}

export default function StepHeading({ title, helper, id }: StepHeadingProps) {
  return (
    <div>
      <h1 id={id} tabIndex={-1} className={HEADING_CLASS}>
        {title}
      </h1>
      {helper && <p className={HELPER_CLASS}>{helper}</p>}
    </div>
  );
}
