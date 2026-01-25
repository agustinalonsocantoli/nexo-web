import AffiliatesSection from "@/components/home/AffiliatesSection";
import Hero from "@/components/home/Hero";
import TrainingSection from "@/components/home/TrainingSection";
import TeamSection from "@/components/home/TeamSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrainingSection />
      <AffiliatesSection />
      <WhyChooseUs />
      <TeamSection />
    </main>
  );
}
