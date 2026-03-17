import PageHero from '../PageHero';
import { getTranslations } from 'next-intl/server';

export default async function AboutHero() {
  const t = await getTranslations('about');

  return (
    <PageHero
      title={t('heroTitle')}
      subtitle={t('heroSubtitle')}
      imageSrc="/about-us-new.jpg"
    />
  );
}
