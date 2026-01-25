import OptimizedImage from '../OptimizedImage';

export default function AboutBody() {
  return (
    <div className="w-full px-[21px] bg-white">
      {/* Nuestro Espacio */}
      <section className="py-6 text-nexo-dark md:py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h2
              className="mb-6 font-heading text-xl leading-[100%] font-bold tracking-normal text-nexo-dark uppercase"
            >
              Nuestro Espacio
            </h2>
          </div>

          <p className="mb-6 font-body text-sm leading-[20px] tracking-normal text-black">
            Esto es mucho más que un gimnasio: es un box donde encontrarás una auténtica comunidad y adoptarás un estilo de vida enfocado en la mejora constante mientras disfrutas del camino.
          </p>

          {/* Carousel de imágenes */}
          <div className="carousel-container relative mb-6 w-full md:hidden">
            {/* Radio buttons para controlar el carousel */}
            <input type="radio" name="carousel" id="carousel-1" className="carousel-radio" defaultChecked />
            <input type="radio" name="carousel" id="carousel-2" className="carousel-radio" />
            <input type="radio" name="carousel" id="carousel-3" className="carousel-radio" />

            {/* Contenedor de imágenes */}
            <div className="carousel-wrapper flex">
              <div className="carousel-slide shrink-0">
                <OptimizedImage
                  src="/n-e-1.webp"
                  alt="Zona de descanso"
                  className="h-[235px] w-full object-cover"
                  width={351}
                  height={235}
                />
              </div>
              <div className="carousel-slide shrink-0">
                <OptimizedImage
                  src="/n-e-2.webp"
                  alt="Equipamiento CrossFit"
                  className="h-[235px] w-full object-cover"
                  width={351}
                  height={235}
                />
              </div>
              <div className="carousel-slide shrink-0">
                <OptimizedImage
                  src="/n-e-3.webp"
                  alt="Área de entrenamiento"
                  className="h-[235px] w-full object-cover"
                  width={351}
                  height={235}
                />
              </div>
            </div>

            {/* Flechas de navegación - Anterior */}
            <label htmlFor="carousel-3" className="carousel-nav carousel-prev carousel-prev-1">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </label>
            <label htmlFor="carousel-1" className="carousel-nav carousel-prev carousel-prev-2">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </label>
            <label htmlFor="carousel-2" className="carousel-nav carousel-prev carousel-prev-3">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </label>

            {/* Flechas de navegación - Siguiente */}
            <label htmlFor="carousel-2" className="carousel-nav carousel-next carousel-next-1">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </label>
            <label htmlFor="carousel-3" className="carousel-nav carousel-next carousel-next-2">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </label>
            <label htmlFor="carousel-1" className="carousel-nav carousel-next carousel-next-3">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </label>
          </div>

          <p className="font-body text-sm leading-[20px] tracking-normal text-nexo-dark">
            Nuestras instalaciones de más de 500 m² te ofrecen espacios amplios equipados con tecnología de vanguardia, máquinas Concept y todos los recursos necesarios para tu entrenamiento. Disponemos de áreas especializadas en CrossFit y HYROX, pensadas para que cada sesión represente un reto que te impulse a superar tus propios límites.
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

      <section className="text-nexo-dark">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h2
              className="mb-6 font-heading text-xl leading-[100%] font-bold tracking-normal text-nexo-dark uppercase"
            >
              Nuestra Filosofía
            </h2>
          </div>

          <p className="mb-6 font-body text-sm leading-[20px] tracking-normal text-black">
            Nuestra metodología se fundamenta en conocimientos fisiológicos y biomecánicos y además apuesta por trabajar con un espíritu que busca alejarse de los egos sin sentido que rodean al mundo del fitness.
          </p>

          <div className="h-[235px] w-full">
            <OptimizedImage
              src="/coaches.webp"
              alt="Área de entrenamiento"
              className="h-[235px] w-full object-cover object-[center_35%]"
              width={351}
              height={235}
            />
          </div>

          <p className="my-6 font-body text-sm leading-[20px] tracking-normal text-nexo-dark">
            Por esta razón, los ejercicios gimnásticos son uno de los pilares en el día a día. Los utilizamos para asentar la base de movimientos más complejos.
          </p>

          <div className="relative w-full h-[185px]">
            <OptimizedImage
              src="/n-f.webp"
              alt="Nuestra Filosofía"
              className="w-full h-[185px] object-cover"
              width={351}
              height={185}
            />

            {/* Texto sobrepuesto */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <p className="text-center font-heading text-xl font-bold leading-tight tracking-wide text-white uppercase md:text-3xl">
                &quot;MÁS NO ES MEJOR,<br />
                MEJOR ES MEJOR&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-nexo-dark py-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h2
              className="mb-6 font-heading text-xl leading-[100%] font-bold tracking-normal text-nexo-dark uppercase"
            >
              NUESTRA HISTORIA
            </h2>
          </div>

          <p className="mb-6 font-body text-sm leading-[20px] tracking-normal text-black">
            Desde que abrimos en 2017 y hasta la actualidad, en Nexo nos gusta definirnos como el espacio donde interaccionan las ganas de aprender y mejorar junto con la capacidad de esfuerzo. Y todo ello, en un ambiente, no sólo respetuoso, sino que favorece los lazos de amistad duraderos.
          </p>

          <p className="font-body text-sm leading-[20px] tracking-normal text-black">
            No queremos ser un box de CrossFit más. Hemos adaptado nuestra manera de planificar y entender el entrenamiento para que, si confías en nosotros, podamos acompañarte en tu proceso de mejora durante mucho tiempo.
          </p>
        </div>
      </section>
    </div>
  );
}
