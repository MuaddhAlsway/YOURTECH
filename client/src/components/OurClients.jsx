import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { clients } from '../data/clients';
import '../styles/OurClients.css';

export default function OurClients() {
  const [language, setLanguage] = useState(() => document.documentElement.lang?.startsWith('ar') ? 'ar' : 'en');
  const rail = useRef(null);
  const ar = language === 'ar';
  const loopedClients = [...clients, ...clients, ...clients];
  useEffect(() => { const sync = () => setLanguage(document.documentElement.lang?.startsWith('ar') ? 'ar' : 'en'); window.addEventListener('site-language-change', sync); return () => window.removeEventListener('site-language-change', sync); }, []);
  return (
    <section className={`our-clients our-clients--rail ${ar ? 'is-arabic' : 'is-english'}`} dir={ar ? 'rtl' : 'ltr'} aria-labelledby="clients-title">
      <div className="our-clients__rail-head"><div><span>07 / OUR CLIENTS</span><h2 id="clients-title">Built Together. <em>Grown Together.</em></h2></div><p>{ar ? 'العلامات التجارية والأعمال التي تعاونّا معها.' : "Brands and businesses we've collaborated with."}</p></div>
      <div className="our-clients__rail" ref={rail}>
        <div className="our-clients__rail-track" style={{ animation: `${ar ? 'our-clients-arabic' : 'our-clients-english'} 42s linear infinite` }}>
          {loopedClients.map((client, index) => <a className="our-clients__rail-card" key={`${client.id}-${index}`} href={client.website || '#'} onClick={(event) => !client.website && event.preventDefault()} target={client.website ? '_blank' : undefined} rel="noopener noreferrer">{client.logo ? <img loading="lazy" onLoad={(event) => event.currentTarget.classList.add('is-loaded')} src={client.logo} alt={client.name} /> : <strong>{client.name}</strong>}<ArrowUpRight className="our-clients__rail-arrow" size={18} /></a>)}
        </div>
      </div>
      <footer className="our-clients__rail-footer"><span>{ar ? 'مرّر للاستكشاف' : 'Scroll to explore'}</span><span>YOURTECH®</span></footer>
    </section>
  );
}
