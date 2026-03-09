"use client";

import { useRef } from "react";

interface FileUploadFieldProps {
  fileName: string;
  onFileSelect: (files: FileList | null) => void;
  onFileClear: () => void;
  hasError?: boolean;
}

export default function FileUploadField({ fileName, onFileSelect, onFileClear, hasError }: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (fileName) {
    return (
      <div className="flex items-center gap-2">
        <span
          className="flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-nexo-orange bg-nexo-orange/5 px-3 py-2 transition-colors hover:bg-nexo-orange/10"
          onClick={() => inputRef.current?.click()}
          title="Cambiar archivo"
        >
          {/* Document icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-nexo-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span className="truncate font-body text-sm text-nexo-dark">{fileName}</span>
        </span>
        <button
          type="button"
          onClick={() => {
            onFileClear();
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#878787] transition-colors hover:bg-red-50 hover:text-red-500"
          aria-label="Eliminar archivo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="sr-only"
          onChange={(e) => onFileSelect(e.target.files)}
        />
      </div>
    );
  }

  return (
    <label className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 transition-colors hover:border-nexo-orange ${hasError ? "border-red-500" : "border-[#cac4d0]"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-[#878787]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
      <span className="truncate font-body text-sm text-[#878787]">JPG, PNG o PDF</span>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="sr-only"
        onChange={(e) => onFileSelect(e.target.files)}
      />
    </label>
  );
}
