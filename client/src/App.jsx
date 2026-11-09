
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ScrollToTop from './components/ScrollToTop';
import LegalPage from './components/LegalPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
         <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/services" element={<Services />} />
           <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
           <Route path="/terms" element={<LegalPage type="terms" />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ScrollToTop />
    </>
  );
}
