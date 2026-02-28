const certificateIcon = (
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

const calendarIcon = (
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

const heartIcon = (
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

const benefits = [
  {
    icon: certificateIcon,
    title: 'Entrenadores Certificados',
    description: 'Nuestros entrenadores certificados te guían en cada WOD, combinando seguridad, técnica y motivación para que logres tus objetivos.'
  },
  {
    icon: calendarIcon,
    title: 'Horarios Flexibles',
    description: 'A tu ritmo, a tu hora: tenemos clases a lo largo de todo el día para que no te pierdas ni una clase.'
  },
  {
    icon: heartIcon,
    title: 'Clases especificas',
    description: 'Ponemos el foco en la técnica para que cada clase cuente, los ejercicios sean dinámicos y progreses cada día.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-nexo-dark py-8 text-white lg:py-16">
      <div className="mx-auto max-w-7xl px-8 lg:px-[72px]">
        <div className="mb-8 text-center lg:mb-10">
          <h2 className="font-heading text-[24px] font-bold leading-[100%] tracking-[0.03em] text-white uppercase">
            ¿POR QUÉ<br className="lg:hidden" /> ELEGIRNOS?
          </h2>
        </div>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-[14px] border border-nexo-orange p-6 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]"
            >
              <div className="flex">
                {benefit.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-body text-base font-semibold leading-6 text-[#fbfbfb] lg:text-[22px] lg:leading-7">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm leading-normal text-[#878787] lg:text-[16px]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
