
import AboutPreview from '../components/home/AboutPreview';
import Hero from '../components/home/Hero';
import OurProcess from '../components/home/OurProcess';
import SelectedWork from '../components/home/SelectedWork';
import ServicesShowcase from '../components/home/ServicesShowcase';
import OurClients from '../components/OurClients';
import Footer from '../components/Footer';
import StartProject from '../components/StartProject';

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="next-section"
        style={{
          minHeight: '50vh',
          background: '#061B35',
        }}
      >
        <AboutPreview/>
        <ServicesShowcase/>
        <SelectedWork/>
        <OurProcess/>
        <OurClients />
        <StartProject/>
      </section>
      <Footer />
    </>
  );
}
