import HeroBanner from "@/components/HeroBanner";
import MarqueeLine from "@/components/MarqueeLine";
import ServicesEditorial from "@/components/ServicesGrid";

export default function ServicesPage() {
  return (
    <main>
     <HeroBanner
  kicker="Services"
  title="Creative services για premium online παρουσία."
  subtitle="Social media, content, web design & redesign"
  videoUrl="/videos/hero.mp4"
/>
      <MarqueeLine />
      <section className="container-page section">
        <ServicesEditorial />
      </section>
    </main>
  );
}
