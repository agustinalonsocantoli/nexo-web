import OptimizedImage from '../OptimizedImage';
import AnimateOnScroll from '../AnimateOnScroll';

export default function AboutBody() {
  return (
    <div className="w-full bg-white px-[21px] lg:px-0">
      {/* Nuestro Espacio */}
      <section className="py-6 text-nexo-dark lg:py-16">
        <div className="mx-auto lg:max-w-[1044px]">
          <AnimateOnScroll from="left">
            <h2 className="mb-6 font-heading text-xl font-bold leading-[100%] tracking-normal text-nexo-dark uppercase lg:mb-8 lg:text-2xl">
              Nuestro Espacio
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll from="right" delay={100}>
            <p className="mb-6 font-body text-sm leading-[20px] tracking-normal text-black lg:text-base lg:leading-6">
              Esto es mucho más que un gimnasio: es un box donde encontrarás una auténtica comunidad y adoptarás un estilo de vida enfocado en la mejora constante mientras disfrutas del camino.
            </p>
          </AnimateOnScroll>

          {/* Carousel de imágenes (solo móvil) */}
          <AnimateOnScroll from="up" delay={150}>
            <div className="carousel-container relative mb-6 w-full md:hidden">
              <input type="radio" name="carousel" id="carousel-1" className="carousel-radio" defaultChecked />
              <input type="radio" name="carousel" id="carousel-2" className="carousel-radio" />
              <input type="radio" name="carousel" id="carousel-3" className="carousel-radio" />

              <div className="carousel-wrapper flex">
                <div className="carousel-slide shrink-0">
                  <OptimizedImage
                    src="/Instalaciones_Movil.png"
                    alt="Zona de descanso"
                    className="h-[235px] w-full object-cover"
                    width={351}
                    height={235}
                  />
                </div>
                <div className="carousel-slide shrink-0">
                  <OptimizedImage
                    src="/n-e-2.jpg"
                    alt="Equipamiento CrossFit"
                    className="h-[235px] w-full object-cover"
                    style={{ objectPosition: 'center 100%' }}
                    width={351}
                    height={235}
                  />
                </div>
                <div className="carousel-slide shrink-0">
                  <OptimizedImage
                    src="/n-e-3.jpg"
                    alt="Área de entrenamiento"
                    className="h-[235px] w-full object-cover"
                    style={{ objectPosition: 'center 70%' }}
                    width={351}
                    height={235}
                  />
                </div>
              </div>

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
          </AnimateOnScroll>

          <AnimateOnScroll from="left" delay={100}>
            <p className="font-body text-sm leading-[20px] tracking-normal text-nexo-dark lg:text-base lg:leading-6 lg:mb-10">
              Nuestras instalaciones de más de 500 m² te ofrecen espacios amplios equipados con tecnología de vanguardia, máquinas Concept y todos los recursos necesarios para tu entrenamiento. Disponemos de áreas especializadas en CrossFit y HYROX, pensadas para que cada sesión represente un reto que te impulse a superar tus propios límites.
            </p>
          </AnimateOnScroll>

          {/* Imagen grande (solo desktop) */}
          <AnimateOnScroll from="up" delay={150} className="mt-10 hidden lg:block">
            <OptimizedImage
              src="/Instalaciones_Desk.png"
              alt="Nuestro Espacio Nexo CrossFit"
              className="h-[485px] w-full object-cover"
              width={1044}
              height={485}
            />
          </AnimateOnScroll>

          {/* Grid de imágenes (desktop) */}
          <div className="mt-6 hidden gap-[10px] md:grid md:grid-cols-3 lg:mt-[10px]">
            <AnimateOnScroll from="up" delay={0}>
              <div className="overflow-hidden">
                <OptimizedImage
                  src="/n-e-2.jpg"
                  alt="Zona de descanso"
                  className="h-64 w-full object-cover lg:h-[394px]"
                  width={341}
                  height={394}
                />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll from="up" delay={100}>
              <div className="overflow-hidden">
                <OptimizedImage
                  src="/n-e-3.jpg"
                  alt="Equipamiento CrossFit"
                  className="h-64 w-full object-cover lg:h-[394px]"
                  width={341}
                  height={394}
                />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll from="up" delay={200}>
              <div className="overflow-hidden">
                <OptimizedImage
                  src="/n-e-4.jpg"
                  alt="Área de entrenamiento"
                  className="h-64 w-full object-cover lg:h-[394px]"
                  width={341}
                  height={394}
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Nuestra Filosofía */}
      <section className="text-nexo-dark">
        <div className="mx-auto lg:max-w-[1044px]">
          <AnimateOnScroll from="left">
            <h2 className="mb-6 font-heading text-xl font-bold leading-[100%] tracking-normal text-nexo-dark uppercase lg:mb-8 lg:text-2xl">
              Nuestra Filosofía
            </h2>
          </AnimateOnScroll>

          {/* Párrafo 1 — solo mobile */}
          <AnimateOnScroll from="right" delay={100}>
            <p className="mb-6 font-body text-sm leading-[20px] tracking-normal text-black lg:hidden">
              Nuestra metodología se fundamenta en conocimientos fisiológicos y biomecánicos y además apuesta por trabajar con un espíritu que busca alejarse de los egos sin sentido que rodean al mundo del fitness.
            </p>
          </AnimateOnScroll>

          {/* Móvil: coaches plain + párrafo 2 + quote con overlay */}
          <div className="lg:hidden">
            <AnimateOnScroll from="up">
              <div className="h-[235px] w-full overflow-hidden">
                <OptimizedImage
                  src="/coaches.webp"
                  alt="Coaches Nexo CrossFit"
                  className="h-[235px] w-full object-cover object-[center_35%]"
                  width={351}
                  height={235}
                />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll from="left" delay={100}>
              <p className="my-6 font-body text-sm leading-[20px] tracking-normal text-nexo-dark">
                Por esta razón, los ejercicios gimnásticos son uno de los pilares en el día a día. Los utilizamos para asentar la base de movimientos más complejos.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll from="up" delay={100}>
              <div className="relative h-[185px] w-full overflow-hidden">
                <OptimizedImage
                  src="/Coaches-Movil.png"
                  alt="Nuestra Filosofía"
                  className="h-full w-full object-cover object-[center_35%]"
                  width={351}
                  height={185}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <p className="text-center font-heading text-xl font-bold leading-tight tracking-wide text-white uppercase">
                    &quot;MÁS NO ES MEJOR,<br />
                    MEJOR ES MEJOR&quot;
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Desktop: párrafos fusionados + coaches con quote overlay */}
          <div className="hidden lg:block">
            <AnimateOnScroll from="right" delay={100}>
              <p className="mb-8 font-body text-base leading-6 tracking-normal text-nexo-dark">
                Nuestra metodología se fundamenta en conocimientos fisiológicos y biomecánicos y además apuesta por trabajar con un espíritu que busca alejarse de los egos sin sentido que rodean al mundo del fitness. Por esta razón, los ejercicios gimnásticos son uno de los pilares en el día a día. Los utilizamos para asentar la base de movimientos más complejos.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll from="up" delay={150}>
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1232/424' }}>
                <OptimizedImage
                  src="/Coaches-Deskl.png"
                  alt="Coaches Nexo CrossFit"
                  className="h-full w-full object-cover object-[center_35%]"
                  width={1044}
                  height={359}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-end justify-center">
                  <p className="relative text-center font-heading text-[40px] font-bold leading-tight tracking-[0.03em] text-white uppercase">
                    &quot;MÁS NO ES MEJOR,<br />
                    MEJOR ES MEJOR&quot;
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-6 text-nexo-dark lg:py-16">
        <div className="mx-auto lg:max-w-[1044px]">
          <AnimateOnScroll from="left">
            <h2 className="mb-6 font-heading text-xl font-bold leading-[100%] tracking-normal text-nexo-dark uppercase lg:mb-8 lg:text-2xl">
              NUESTRA HISTORIA
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll from="up" delay={100}>
            <p className="mb-6 font-body text-sm leading-[20px] tracking-normal text-black lg:text-base lg:leading-6">
              Desde que abrimos en 2017 y hasta la actualidad, en Nexo nos gusta definirnos como el espacio donde interaccionan las ganas de aprender y mejorar junto con la capacidad de esfuerzo. Y todo ello, en un ambiente, no sólo respetuoso, sino que favorece los lazos de amistad duraderos.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll from="up" delay={200}>
            <p className="font-body text-sm leading-[20px] tracking-normal text-black lg:text-base lg:leading-6">
              No queremos ser un box de CrossFit más. Hemos adaptado nuestra manera de planificar y entender el entrenamiento para que, si confías en nosotros, podamos acompañarte en tu proceso de mejora durante mucho tiempo.
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
