import OptimizedImage from '../OptimizedImage';
import Link from 'next/link';

export interface TeamCardType {
  id: number;
  title: string;
  descriptions: string[];
  image: string;
  extraClass?: string;
  button: boolean;
}

function ExpandedCard({ team }: { team: TeamCardType }) {
  return (
    <div className="flex flex-col gap-4 rounded-[16px] bg-nexo-dark px-6 py-6 shadow-sm">
      <div className="relative h-[167px] w-full overflow-hidden rounded-[16px]">
        <OptimizedImage
          src={team.image}
          alt={team.title}
          className={`h-full w-full object-cover ${team.extraClass ?? 'object-center'}`}
          sizes="(max-width: 768px) 100vw, 33vw"
          width={600}
          height={167}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #1b1b1b 92%)' }}
        />
      </div>

      <h3 className="font-heading text-[22px] font-bold leading-[100%] tracking-normal text-white uppercase">
        {team.title}
      </h3>

      <div className="flex flex-col gap-4">
        {team.descriptions.map((description, i) => (
          <p key={i} className="font-body text-sm leading-[20px] text-white">
            {description}
          </p>
        ))}

        {team.button && (
          <Link
            href="/tarifas"
            className="flex w-full items-center justify-center gap-4 rounded-lg bg-nexo-orange px-8 py-2 font-body text-sm leading-5 text-white transition-opacity hover:opacity-90"
          >
            Ver mas
            <svg
              className="h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

export function Card({ team }: { team: TeamCardType }) {
  return (
    <details name="team-accordion" className="team-details group">
      {/* Mobile: summary acts as the full card — collapsed or expanded */}
      <summary className="list-none cursor-pointer select-none md:hidden">
        {/* Normal card — hidden when this card is open */}
        <div className="team-card-normal group-open:hidden relative h-[179px] w-full overflow-hidden rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]">
          <OptimizedImage
            src={team.image}
            alt={team.title}
            className={`h-full w-full object-cover ${team.extraClass ?? 'object-center'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            width={600}
            height={179}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(179.97deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 98.9%)' }}
          />
          <div className="absolute inset-0 flex items-end justify-start p-6">
            <h3 className="font-heading text-[22px] font-bold leading-[100%] tracking-normal text-white uppercase">
              {team.title}
            </h3>
          </div>
        </div>

        {/* Mini button — hidden by default, shown via CSS when another card is open, hidden when this is open */}
        <div className="team-card-button group-open:hidden hidden h-[64px] w-full overflow-hidden rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] relative">
          <OptimizedImage
            src={team.image}
            alt={team.title}
            className={`absolute inset-0 h-full w-full object-cover ${team.extraClass ?? 'object-center'}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            width={600}
            height={64}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'linear-gradient(179.97deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 98.9%)' }}
          />
          <div className="absolute inset-0 flex items-end justify-start px-6 py-4">
            <h3 className="font-heading text-[22px] font-bold leading-[100%] tracking-normal text-white uppercase">
              {team.title}
            </h3>
          </div>
        </div>

        {/* Expanded card — shown when open. Tapping anywhere closes the card. */}
        <div className="hidden group-open:block">
          <ExpandedCard team={team} />
        </div>
      </summary>

      {/* Desktop: always visible, summary is hidden on md+ */}
      <div className="hidden md:block">
        <ExpandedCard team={team} />
      </div>
    </details>
  );
}
