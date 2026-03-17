import { Card, TeamCardType } from "./Card";
import TeamBodyDesktop from "./TeamBodyDesktop";
import AnimateOnScroll from "../AnimateOnScroll";
import { getTranslations } from "next-intl/server";

export default async function TeamBody() {
  const t = await getTranslations('team');

  const coaches: TeamCardType[] = [
    {
      id: 1,
      title: 'ZOLTAN LOVAS',
      descriptions: [
        t('coaches.zoltan.desc0'),
        t('coaches.zoltan.desc1'),
        t('coaches.zoltan.desc2'),
      ],
      image: '/zoltan.jpg',
      extraClass: 'object-[center_43%]',
      button: false
    },
    {
      id: 2,
      title: 'ALAN CARETTA',
      descriptions: [
        t('coaches.alan.desc0'),
      ],
      image: '/alan.jpg',
      extraClass: 'object-[center_29%]',
      button: false
    },
    {
      id: 3,
      title: 'DILIAN BURGUET',
      descriptions: [
        t('coaches.dilian.desc0'),
        t('coaches.dilian.desc1'),
        t('coaches.dilian.desc2'),
        t('coaches.dilian.desc3'),
      ],
      image: '/dilian.jpg',
      extraClass: 'object-[center_37%]',
      button: false
    },
    {
      id: 4,
      title: 'TONI ALVARADO',
      descriptions: [
        t('coaches.toni.desc0'),
        t('coaches.toni.desc1'),
        t('coaches.toni.desc2'),
        t('coaches.toni.desc3'),
        t('coaches.toni.desc4'),
      ],
      image: '/toni.jpg',
      extraClass: 'object-[center_37%]',
      button: false
    },
  ];

  const services: TeamCardType[] = [
    {
      id: 5,
      title: 'JAVI MARTINEZ',
      descriptions: [
        t('physio.javi.desc0'),
        t('physio.javi.desc1'),
      ],
      image: '/javi.jpg',
      extraClass: 'object-[center_30%]',
      button: true
    },
  ];

  return (
    <section className="bg-[#fbfbfb] py-8 text-nexo-dark lg:py-16">
      {/* Mobile */}
      <div className="lg:hidden">
        <AnimateOnScroll>
          <div className="mx-auto max-w-7xl px-8">
            <div className="flex flex-col items-center gap-4">
              <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
                {t('coachesBadge')}
              </span>

              <div className="team-cards-container flex w-full flex-col gap-4">
                {coaches?.map((team) => (
                  <Card key={team.id} team={team} />
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={100}>
          <div className="mx-auto mt-8 max-w-7xl px-8">
            <div className="flex flex-col items-center gap-4">
              <span className="w-fit rounded-full border border-nexo-orange px-3 py-1.5 font-body text-xs font-semibold text-nexo-dark uppercase">
                {t('physioBadge')}
              </span>

              <div className="team-cards-container flex w-full flex-col gap-4">
                {services?.map((team) => (
                  <Card key={team.id} team={team} />
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Desktop */}
      <AnimateOnScroll>
        <div className="hidden lg:block mx-auto max-w-7xl px-[118px]">
          <TeamBodyDesktop coaches={coaches} services={services} />
        </div>
      </AnimateOnScroll>
    </section>
  );
}
