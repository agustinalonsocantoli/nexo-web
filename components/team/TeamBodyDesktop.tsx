'use client';

import { useEffect, useRef, useState } from 'react';
import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';
import { TeamCardType } from './Card';

function CoachGridCard({ coach, onClick }: { coach: TeamCardType; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-full overflow-hidden rounded-[18px] cursor-pointer text-left transition-opacity hover:opacity-90"
      style={{
        aspectRatio: '432 / 230',
        boxShadow: '0px 12.88px 19.32px rgba(0,0,0,0.1), 0px 5.15px 7.73px rgba(0,0,0,0.1)',
      }}
    >
      <OptimizedImage
        src={coach.image}
        alt={coach.title}
        className={`absolute inset-0 h-full w-full object-cover ${coach.extraClass ?? 'object-center'}`}
        sizes="(min-width: 1024px) 50vw"
        width={432}
        height={230}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(179.97deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 98.9%)' }}
      />
      <div className="absolute inset-0 flex items-end p-8">
        <h3 className="font-heading text-[28px] font-bold leading-none text-white uppercase">
          {coach.title}
        </h3>
      </div>
    </button>
  );
}

function CoachMiniCard({ coach, onClick }: { coach: TeamCardType; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex-1 overflow-hidden rounded-[18px] cursor-pointer text-left transition-opacity hover:opacity-90"
      style={{
        aspectRatio: '264 / 141',
        boxShadow: '0px 12.88px 19.32px rgba(0,0,0,0.1), 0px 5.15px 7.73px rgba(0,0,0,0.1)',
      }}
    >
      <OptimizedImage
        src={coach.image}
        alt={coach.title}
        className={`absolute inset-0 h-full w-full object-cover ${coach.extraClass ?? 'object-center'}`}
        sizes="(min-width: 1024px) 25vw"
        width={264}
        height={141}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(179.97deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 98.9%)' }}
      />
      <div className="absolute inset-0 flex items-end p-5">
        <p className="font-heading text-base font-bold leading-none text-white uppercase whitespace-nowrap">
          {coach.title}
        </p>
      </div>
    </button>
  );
}

function CoachExpandedCard({
  coach,
  others,
  onClose,
  onSelect,
}: {
  coach: TeamCardType;
  others: TeamCardType[];
  onClose: () => void;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-[16px] bg-nexo-dark p-4">
      {/* Fila superior: foto izquierda + texto derecha */}
      <div className="flex gap-4 items-start">
        {/* Foto */}
        <div
          className="relative shrink-0 overflow-hidden rounded-[16px]"
          style={{ width: '354px', height: '288px' }}
        >
          <OptimizedImage
            src={coach.image}
            alt={coach.title}
            className={`h-full w-full object-cover ${coach.extraClass ?? 'object-center'}`}
            sizes="354px"
            width={354}
            height={288}
          />
        </div>

        {/* Contenido */}
        <div className="flex flex-1 flex-col gap-4 px-4">
          {/* Nombre + botón cerrar */}
          <div className="flex items-center gap-6">
            <h3 className="flex-1 font-heading text-[24px] font-bold leading-none text-white uppercase">
              {coach.title}
            </h3>
            <button
              onClick={onClose}
              className="shrink-0 text-white transition-opacity hover:opacity-70"
              aria-label="Cerrar"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Descripciones */}
          <div className="flex flex-col gap-3">
            {coach.descriptions.map((desc, i) => (
              <p key={i} className="font-body text-sm leading-5 text-white">
                {desc}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Mini cards de los demás coaches */}
      <div className="flex gap-5">
        {others.map((other) => (
          <CoachMiniCard
            key={other.id}
            coach={other}
            onClick={() => onSelect(other.id)}
          />
        ))}
      </div>
    </div>
  );
}

function JaviCardDesktop({
  coach,
  isOpen,
  onToggle,
}: {
  coach: TeamCardType;
  isOpen: boolean;
  onToggle: () => void;
}) {
  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="relative overflow-hidden rounded-[18px] cursor-pointer text-left transition-opacity hover:opacity-90"
        style={{
          width: '336px',
          aspectRatio: '432 / 230',
          boxShadow: '0px 12.88px 19.32px rgba(0,0,0,0.1), 0px 5.15px 7.73px rgba(0,0,0,0.1)',
        }}
      >
        <OptimizedImage
          src={coach.image}
          alt={coach.title}
          className={`absolute inset-0 h-full w-full object-cover ${coach.extraClass ?? 'object-center'}`}
          sizes="336px"
          width={336}
          height={179}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(179.97deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 98.9%)' }}
        />
        <div className="absolute inset-0 flex items-end p-6">
          <h3 className="font-heading text-[24px] font-bold leading-none text-white uppercase">
            {coach.title}
          </h3>
        </div>
      </button>
    );
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-[16px] bg-nexo-dark"
      style={{ width: '336px' }}
    >
      {/* Foto */}
      <div className="relative overflow-hidden rounded-[14px]" style={{ height: '179px' }}>
        <OptimizedImage
          src={coach.image}
          alt={coach.title}
          className={`h-full w-full object-cover ${coach.extraClass ?? 'object-center'}`}
          sizes="336px"
          width={336}
          height={179}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(179.97deg, rgba(0,0,0,0) 26.6%, rgba(0,0,0,0.8) 95.5%)' }}
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-3 px-6 py-5">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-[24px] font-bold leading-none text-white uppercase">
            {coach.title}
          </h3>
          <button
            onClick={onToggle}
            className="shrink-0 text-white transition-opacity hover:opacity-70"
            aria-label="Cerrar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {coach.descriptions.map((desc, i) => (
          <p key={i} className="font-body text-sm leading-5 text-white">
            {desc}
          </p>
        ))}
        <Link
          href="/tarifas"
          className="mt-2 flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90"
        >
          Pedir Cita
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function TeamBodyDesktop({
  coaches,
  services,
}: {
  coaches: TeamCardType[];
  services: TeamCardType[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [javiOpen, setJaviOpen] = useState(false);

  const coachesRef = useRef<HTMLDivElement>(null);
  const javiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        selectedId !== null &&
        coachesRef.current &&
        !coachesRef.current.contains(e.target as Node)
      ) {
        setSelectedId(null);
      }
      if (
        javiOpen &&
        javiRef.current &&
        !javiRef.current.contains(e.target as Node)
      ) {
        setJaviOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedId, javiOpen]);

  const selectedCoach =
    selectedId !== null ? (coaches.find((c) => c.id === selectedId) ?? null) : null;
  const otherCoaches = selectedId !== null ? coaches.filter((c) => c.id !== selectedId) : [];

  return (
    <div className="flex flex-col gap-12">
      {/* COACHES */}
      <div ref={coachesRef} className="flex flex-col items-center gap-6">
        <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
          COACHES
        </span>

        {selectedCoach ? (
          <CoachExpandedCard
            coach={selectedCoach}
            others={otherCoaches}
            onClose={() => setSelectedId(null)}
            onSelect={(id) => setSelectedId(id)}
          />
        ) : (
          <div className="grid w-full grid-cols-2 gap-5">
            {coaches.map((coach) => (
              <CoachGridCard
                key={coach.id}
                coach={coach}
                onClick={() => setSelectedId(coach.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* FISIOTERAPEUTA */}
      <div ref={javiRef} className="flex flex-col items-center gap-6">
        <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
          FISIOTERAPEUTA
        </span>
        {services.map((service) => (
          <JaviCardDesktop
            key={service.id}
            coach={service}
            isOpen={javiOpen}
            onToggle={() => setJaviOpen((v) => !v)}
          />
        ))}
      </div>
    </div>
  );
}
