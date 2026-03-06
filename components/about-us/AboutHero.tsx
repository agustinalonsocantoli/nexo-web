import PageHero from '../PageHero';

export default function AboutHero() {
  return (
    <div>
      <PageHero
        title="Sobre Nosotros"
        subtitle="Tu lugar para crecer con dedicación y en comunidad."
        imageSrc="/hero-about-us.jpg"
        lgHeightClass="lg:h-[341px]"
        lgTitleClass="lg:text-[48px]"
      />
    </div >
  );
}
