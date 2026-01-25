interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: 'certificate',
    title: 'Entrenadores Certificados',
    description: 'Nuestros entrenadores certificados te guían en cada WOD, combinando seguridad, técnica y motivación para que logres tus objetivos.'
  },
  {
    icon: 'calendar',
    title: 'Horarios Flexibles',
    description: 'A tu ritmo, a tu hora: tenemos clases a lo largo de todo el día para que no te pierdas ni una clase.'
  },
  {
    icon: 'heart',
    title: 'Clases especificas',
    description: 'Ponemos el foco en la técnica para que cada clase cuente, los ejercicios sean dinámicos y progreses cada día.'
  }
];

function getIcon(iconName: string) {
  switch (iconName) {
    case 'certificate':
      return (
        <svg
          className="h-6 w-6 text-nexo-orange"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      );
    case 'calendar':
      return (
        <svg
          className="h-6 w-6 text-nexo-orange"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    case 'heart':
      return (
        <svg
          className="h-6 w-6 text-nexo-orange"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function WhyChooseUs() {
  return (
    <section className="bg-nexo-dark py-16 text-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-2xl leading-tight font-bold uppercase md:text-4xl">
            <span className="block">Por que</span>
            <span className="block">elegirnos?</span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border-2 border-nexo-orange p-6 transition-all hover:border-nexo-gray"
            >
              {/* Icon */}
              <div className="mb-4 flex">
                {getIcon(benefit.icon)}
              </div>

              {/* Content */}
              <h3 className="mb-2 font-body text-base font-bold text-white">
                {benefit.title}
              </h3>
              <p className="text-normal font-body text-sm text-nexo-gray">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
