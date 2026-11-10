
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PrivacyPolicy = lazy(() => import('./components/LegalPage').then(({ default: LegalPage }) => ({ default: () => <LegalPage type="privacy" /> })));
const Terms = lazy(() => import('./components/LegalPage').then(({ default: LegalPage }) => ({ default: () => <LegalPage type="terms" /> })));

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Suspense fallback={<div className="route-loading" aria-label="Loading page" />}>
        <Routes>
         <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/services" element={<Services />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/terms" element={<Terms />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <ScrollToTop />
    </>
  );
}
