import { Card, TeamCardType } from "./Card";
import TeamBodyDesktop from "./TeamBodyDesktop";

const coaches: TeamCardType[] = [
  {
    id: 1,
    title: 'ZOLTAN LOVAS',
    descriptions: [
      'Hace años dejé mi profesión anterior para dedicarme a lo que descubrí en 2014: CrossFit. No como un hobby, sino como un estilo de vida. Algo tan necesario para mí como comer o dormir, tanto entrenar como enseñar.',
      'Junto a mi equipo, trabajamos para transformar vidas. Cada persona que cruza nuestras puertas recibe atención física y mental, porque sabemos que el cambio va más allá del entrenamiento.',
      'Nexo me representa completamente. Cada detalle está cuidado con precisión y pasión. Detrás hay un equipo basado en la humildad, que entiende que esto no va de nosotros, va de vosotros.'
    ],
    image: '/zoltan.webp',
    button: false
  },
  {
    id: 2,
    title: 'ALAN CARETTA',
    descriptions: [
      'Empecé CrossFit en 2017. Para mí CrossFit no es solo deporte, es disciplina, comunidad y superación.  Comencé ayudando en clases cada vez que podía, y ahí descubrí que quería dedicarme a esto: contagiar la misma motivación que me trajo hasta aquí. Años después comence gimnasia artística para mejorar mis gimnásticos. Ahí conocí a  Zoltan quien me presentó Nexo y su metodología, y supe desde el primer día que era mi sitio. Un lugar donde puedo seguir creciendo como entrenador y como atleta.'
    ],
    image: '/alan.webp',
    extraClass: 'object-[center_37%]',
    button: false
  },
  {
    id: 3,
    title: 'DILIAN BURGUET',
    descriptions: [
      'Siempre hice deporte, pero en algún momento perdí la motivación. Alguien me recomendó CrossFit y desde la primera clase supe que era mi sitio.',
      'Me enganchó la variedad y la mezcla de disciplinas. Pero cuando conocí Nexo entendí que lo que sabía era solo una pequeña parte de lo que realmente es CrossFit. Nunca pensé en ser coach, pero cuando algo te apasiona, quieres compartirlo.',
      'Hoy sé que esto es lo que quiero hacer: aprender, mejorar y ayudar a que otros también lo hagan.',
      'Nos vemos en el box para seguir creciendo, mejorando cada día y, sobre todo, pasándolo bien.'
    ],
    image: '/dilian.webp',
    extraClass: 'object-[center_37%]',
    button: false
  },
  {
    id: 4,
    title: 'TONI ALVARADO',
    descriptions: [
      'Pasión por lo que hago y curiosidad por entender el porqué. Esas dos cosas me han llevado por el mundo del fitness durante más de diez años, pasando por distintas titulaciones y modelos de entrenamiento.',
      'Hago deporte desde siempre. Deportes individuales, grupales, lo que sea. Con un único objetivo: moverme mejor cada vez y disfrutarlo.',
      'En los últimos años me preparé como bombero, y aprendí a combinar ese rol con el de entrenador, intentando sacar lo mejor de ambos mundos.',
      'Hace unos años llegué a Nexo CrossFit, y aquí he podido seguir creciendo profesional y deportivamente. Pero lo que más valoro es el vínculo con los compañeros y atletas.',
      'Imagino que por eso se llama "Nexo”.'
    ],
    image: '/toni.webp',
    extraClass: 'object-[center_37%]',
    button: false
  },
];

const services: TeamCardType[] = [
  {
    id: 5,
    title: 'JAVI MARTINEZ',
    descriptions: [
      'Soy fisioterapeuta deportivo (nº colegiado 5456), graduado en Fisioterapia y con Máster en Fisioterapia Deportiva. Con amplia experiencia en deporte, especialmente en fútbol (Levante UD), trabaja en prevención, tratamiento y rehabilitación de lesiones para optimizar el rendimiento del deportista mediante diversas técnicas de fisioterapia.'
    ],
    image: '/javi.webp',
    extraClass: 'object-[center_30%]',
    button: true
  },
];

export default function TeamBody() {
  return (
    <section className="bg-[#fbfbfb] py-8 text-nexo-dark lg:py-16">
      {/* Mobile */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex flex-col items-center gap-4">
            <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
              COACHES
            </span>

            <div className="team-cards-container flex w-full flex-col gap-4">
              {coaches?.map((team) => (
                <Card key={team.id} team={team} />
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl px-8">
          <div className="flex flex-col items-center gap-4">
            <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
              FISIOTERAPEUTA
            </span>

            <div className="team-cards-container flex w-full flex-col gap-4">
              {services?.map((team) => (
                <Card key={team.id} team={team} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block mx-auto max-w-7xl px-[118px]">
        <TeamBodyDesktop coaches={coaches} services={services} />
      </div>
    </section>
  );
}