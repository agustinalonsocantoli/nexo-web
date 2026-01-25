import OptimizedImage from '../OptimizedImage';

export default function AboutBody() {
  return (
    <div className="w-full">
      {/* Nuestro Espacio */}
      <section className="bg-white px-4 py-12 text-nexo-dark md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 text-center md:mb-8">
            <h3
              className="mx-auto mb-4 w-fit rounded-3xl border border-nexo-orange px-4 py-2 text-center font-body text-sm font-semibold tracking-wider text-black uppercase"
            >
              Nuestro Espacio
            </h3>
            <h2
              className="font-heading text-xl leading-tight font-bold text-nexo-orange uppercase md:text-2xl"
            >
              Más que un gimnasio
            </h2>
          </div>

          <p className="mb-6 text-center font-body text-base leading-relaxed text-black">
            Esto es mucho más que un gimnasio: es un box donde encontrarás una auténtica comunidad y
            adoptarás un estilo de vida enfocado en la mejora constante mientras disfrutas del camino.
          </p>

          {/* Imagen principal */}
          <div className="mb-6 overflow-hidden rounded-lg">
            <OptimizedImage
              src="/equipo-home.webp"
              alt="Vista general del box Nexo CrossFit"
              className="h-auto w-full"
              width={1200}
              height={800}
            />
          </div>

          <p className="mb-6 font-body text-sm leading-relaxed text-nexo-dark md:text-base">
            Nuestras instalaciones de más de 500 m² te ofrecen espacios amplios equipados con tecnología
            de última generación, máquinas Concept y todos los recursos necesarios para tu
            entrenamiento. Disponemos de 6 áreas especializadas en CrossFit® y HYROX, pensadas para que
            cada sesión represente un reto que te impulse a superar tus propios límites.
          </p>

          {/* Grid de imágenes secundarias (solo desktop) */}
          <div className="mt-8 hidden gap-6 md:grid md:grid-cols-3">
            <div className="overflow-hidden rounded-lg">
              <OptimizedImage
                src="/n-e-1.webp"
                alt="Zona de descanso"
                className="h-64 w-full object-cover"
                width={400}
                height={300}
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <OptimizedImage
                src="/n-e-2.webp"
                alt="Equipamiento CrossFit"
                className="h-64 w-full object-cover"
                width={400}
                height={300}
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <OptimizedImage
                src="/n-e-3.webp"
                alt="Área de entrenamiento"
                className="h-64 w-full object-cover"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Filosofía */}
      <section className="bg-nexo-dark px-4 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 text-center md:mb-8">
            <h3
              className="mx-auto mb-4 w-fit rounded-3xl border border-nexo-orange px-4 py-2 text-center font-body text-sm font-semibold tracking-wider text-white uppercase"
            >
              Nuestra Filosofía
            </h3>
            <h2
              className="font-heading text-xl leading-tight font-bold text-nexo-orange uppercase md:text-2xl"
            >
              Mejor es mejor
            </h2>
          </div>

          <p
            className="mb-6 text-center font-body text-sm leading-relaxed text-nexo-gray md:text-base"
          >
            Nuestra metodología se fundamenta en conocimientos fisiológicos y biomecánicos y además
            apuesta por trabajar con un espíritu que busca alejarse de los egos sin sentido que rodean
            al mundo del fitness. Por esta razón, los ejercicios gimnásticos son uno de los pilares en
            el día a día. Los utilizamos para asentar la base de movimientos más complejos.
          </p>

          {/* Imagen con overlay de texto */}
          <div className="relative overflow-hidden rounded-lg">
            <OptimizedImage
              src="/n-f.webp"
              alt="Equipo Nexo CrossFit"
              className="h-auto w-full"
              width={1200}
              height={800}
            />
            <div
              className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-4 py-8 md:px-8 md:py-12"
            >
              <p
                className="text-center font-heading text-xl leading-tight font-bold tracking-wide text-white uppercase md:text-3xl"
              >
                &quot;Más no es mejor, mejor es mejor&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="bg-white px-4 py-12 text-nexo-dark md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 text-center md:mb-8">
            <h3
              className="mx-auto mb-4 w-fit rounded-3xl border border-nexo-orange px-4 py-2 text-center font-body text-sm font-semibold tracking-wider text-black uppercase"
            >
              Nuestra Historia
            </h3>
            <h2
              className="font-heading text-xl leading-tight font-bold text-nexo-orange uppercase md:text-2xl"
            >
              Desde 2017
            </h2>
          </div>

          <p className="mb-4 font-body text-sm leading-relaxed text-nexo-dark md:text-base">
            Desde que abrimos en 2017 y hasta la actualidad, en Nexo nos gusta definirnos como el
            espacio donde interaccionan las ganas de aprender y mejorar junto con la capacidad de
            esfuerzo. Y todo en un buen ambiente, no sólo respetuoso, sino que favorece los lazos de
            amistad entre todos.
          </p>
          <p className="font-body text-sm leading-relaxed text-nexo-dark md:text-base">
            No queremos ser un box de CrossFit® más. Hemos adaptado nuestra manera de planificar y
            entender el entrenamiento para que, si confías en nosotros, podamos acompañarte en tu
            proceso de mejora durante mucho tiempo.
          </p>
        </div>
      </section>
    </div>
  );
}
