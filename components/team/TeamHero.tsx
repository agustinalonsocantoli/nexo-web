import PageHero from '../PageHero';
import { getTranslations } from 'next-intl/server';

export default async function TeamHero() {
  const t = await getTranslations('team');

  return (
    <PageHero
      title={t('heroTitle')}
      titlePart2={t('heroTitlePart2')}
      imageSrc="/equipo-home.jpg"
      imageClass="object-center lg:object-[center_35%]"
    />
  );
}
