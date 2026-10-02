import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isValidQrHash } from "@/lib/qrForm";
import WelcomeFlow from "@/components/formulario/WelcomeFlow";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ADMIN_LOGIN_PATH = "/admin/login";

export default async function FormularioPage({
  params,
}: {
  params: Promise<{ locale: string; hash: string }>;
}) {
  const { hash } = await params;

  if (!isValidQrHash(hash)) redirect(ADMIN_LOGIN_PATH);

  return (
    <main data-flow className="min-h-dvh bg-[#1a1a1a] text-white">
      <WelcomeFlow hash={hash} />
    </main>
  );
}
