'use client';

import { useRef, useState } from 'react';
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
    <div className="flex w-full flex-col gap-4 rounded-[16px] bg-nexo-dark p-4">
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
          <div className="flex items-center gap-6">
            <h3 className="flex-1 font-heading text-[24px] font-bold leading-none text-white uppercase">
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
          <div className="flex flex-col gap-3">
            {coach.descriptions.map((desc, i) => (
              <p key={i} className="font-body text-sm leading-5 text-white">
                {desc}
              </p>
            ))}
          </div>
          <Link
            href="https://wa.me/34651594523"
              target="_blank"
              rel="noopener noreferrer"
            className="mt-auto flex w-fit items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm text-white transition-opacity hover:opacity-90"
          >
            ¡Pide tu cita!
            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
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
  const [shownId, setShownId] = useState<number | null>(1);
  const [cardOpacity, setCardOpacity] = useState(1);
  const [javiOpen, setJaviOpen] = useState(true);
  const [javiOpacity, setJaviOpacity] = useState(1);

  const coachesRef = useRef<HTMLDivElement>(null);
  const javiRef = useRef<HTMLDivElement>(null);

  const shownCoach =
    shownId !== null ? (coaches.find((c) => c.id === shownId) ?? null) : null;
  const otherCoaches = shownId !== null ? coaches.filter((c) => c.id !== shownId) : [];

  function handleSelect(id: number) {
    if (id === shownId) return;
    setCardOpacity(0.15);
    setTimeout(() => {
      setShownId(id);
      setCardOpacity(1);
    }, 200);
  }

  function handleClose() {
    setCardOpacity(0.15);
    setTimeout(() => {
      setShownId(null);
      setCardOpacity(1);
    }, 200);
  }

  function handleOpen(id: number) {
    setCardOpacity(0.15);
    setTimeout(() => {
      setShownId(id);
      setCardOpacity(1);
    }, 200);
  }

  return (
    <div className="flex flex-col gap-12">
      {/* COACHES */}
      <div ref={coachesRef} className="flex flex-col items-center gap-6">
        <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
          COACHES
        </span>

        <div
          className="w-full"
          style={{
            opacity: cardOpacity,
            transform: cardOpacity < 1 ? 'scale(0.99)' : 'scale(1)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {shownCoach ? (
            <CoachExpandedCard
              coach={shownCoach}
              others={otherCoaches}
              onClose={handleClose}
              onSelect={handleSelect}
            />
          ) : (
            <div className="grid w-full grid-cols-2 gap-5">
              {coaches.map((coach) => (
                <CoachGridCard
                  key={coach.id}
                  coach={coach}
                  onClick={() => handleOpen(coach.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FISIOTERAPEUTA */}
      <div ref={javiRef} className="flex flex-col items-center gap-6">
        <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
          FISIOTERAPEUTA
        </span>
        <div
          className="w-full"
          style={{
            opacity: javiOpacity,
            transform: javiOpacity < 1 ? 'scale(0.99)' : 'scale(1)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          {services.map((service) => (
            <JaviCardDesktop
              key={service.id}
              coach={service}
              isOpen={javiOpen}
              onToggle={() => {
                setJaviOpacity(0.15);
                setTimeout(() => {
                  setJaviOpen((v) => !v);
                  setJaviOpacity(1);
                }, 200);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
