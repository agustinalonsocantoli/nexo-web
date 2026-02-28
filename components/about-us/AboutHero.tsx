import PageHero from '../PageHero';

export default function AboutHero() {
  return (
    <div>
      <div className='hidden md:block'>
        <PageHero
          title="Sobre Nosotros"
          subtitle="Tu lugar para crecer con dedicación y en comunidad."
          imageSrc="/hero-about-us.webp"
          lgHeightClass="lg:h-[341px]"
          lgTitleClass="lg:text-[48px]"
        />
      </div>

      <div className='block md:hidden'>
        <PageHero
          title="Sobre Nosotros"
          subtitle="Tu lugar para crecer con dedicación y en comunidad."
          imageSrc="/hero-general.webp"
          lgHeightClass="lg:h-[341px]"
          lgTitleClass="lg:text-[48px]"
        />
      </div>
    </div >
  );
}
