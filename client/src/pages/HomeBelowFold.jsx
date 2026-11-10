import AboutPreview from '../components/home/AboutPreview';
import ServicesShowcase from '../components/home/ServicesShowcase';
import SelectedWork from '../components/home/SelectedWork';
import OurProcess from '../components/home/OurProcess';
import OurClients from '../components/OurClients';
import Footer from '../components/Footer';
import StartProject from '../components/StartProject';

export default function HomeBelowFold() {
  return (
    <>
      <section id="next-section" className="home__below-fold">
        <AboutPreview />
        <ServicesShowcase />
        <SelectedWork />
        <OurProcess />
        <OurClients />
        <StartProject />
      </section>
      <Footer />
    </>
  );
}
