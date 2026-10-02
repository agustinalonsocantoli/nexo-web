import Image from "next/image";

const LOGO_SRC = "/logo-nexo.webp";
const LOGO_WIDTH = 1537;
const LOGO_HEIGHT = 458;

interface FlowLogoProps {
  className: string;
}

export default function FlowLogo({ className }: FlowLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Nexo CrossFit"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority
      className={`w-auto ${className}`}
    />
  );
}
