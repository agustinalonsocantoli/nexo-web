"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email o contraseña incorrectos");
    } else {
      router.push("/admin/config");
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo-nexo.webp"
          alt="Nexo CrossFit"
          width={120}
          height={40}
          className="opacity-80"
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] rounded-2xl border border-white/[0.06] bg-[#1E1E1E] p-8"
      >
        <div className="mb-8 text-center">
          <h1 className="font-heading text-[22px] font-bold uppercase tracking-wide text-white">
            Admin
          </h1>
          <p className="mt-1 font-body text-sm text-[#99A1AF]">
            Panel de configuración
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center font-body text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-body text-sm text-[#99A1AF]">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="info@nexocrossfit.es"
              className="w-full rounded-lg border border-white/[0.06] bg-[#262626] px-4 py-2.5 font-body text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#E94F1D]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-body text-sm text-[#99A1AF]">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-white/[0.06] bg-[#262626] px-4 py-2.5 font-body text-sm text-white placeholder:text-white/20 outline-none transition-colors focus:border-[#E94F1D]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex items-center justify-center gap-3 rounded-lg bg-[#E94F1D] px-4 py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Entrar"
            )}
          </button>
        </div>
      </form>

      <p className="mt-6 font-body text-xs text-white/20">
        nexocrossfit.es
      </p>
    </div>
  );
}
