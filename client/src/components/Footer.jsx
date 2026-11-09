import { ArrowUpRight, Asterisk } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const arabic = document.documentElement.lang?.startsWith('ar');
  return <footer className="site-footer" dir={arabic ? 'rtl' : 'ltr'}>
    <div className="site-footer__top"><span>{arabic ? 'يورتك / تواصل معنا' : 'YOURTECH / LET’S TALK'}</span><span className="site-footer__status"><i />{arabic ? 'متاحون لمشروعك القادم' : 'Available for your next project'}</span></div>
    <div className="site-footer__hero"><h2>{arabic ? 'لنبنِ شيئًا' : 'Let’s build something'}<em>{arabic ? 'مميزًا.' : 'remarkable.'}</em></h2><Link to="/contact">{arabic ? 'ابدأ مشروعك' : 'Start a project'}<ArrowUpRight size={20} /></Link></div>
    <div className="site-footer__grid"><Link to="/" className="site-footer__brand"><Asterisk size={28} />YOURTECH<span>.</span></Link><nav><Link to="/about">{arabic ? 'من نحن' : 'About'}</Link><Link to="/services">{arabic ? 'خدماتنا' : 'Services'}</Link><Link to="/portfolio">{arabic ? 'أعمالنا' : 'Work'}</Link><Link to="/contact">{arabic ? 'تواصل' : 'Contact'}</Link></nav><div className="site-footer__contact"><a href="mailto:hello@yourtech.com">hello@yourtech.com</a><span>Riyadh / Saudi Arabia</span></div></div>
    <div className="site-footer__bottom"><span>© 2026 YOURTECH®</span><span>{arabic ? 'نصنع القادم' : 'BUILDING WHAT COMES NEXT.'}</span><span className="site-footer__legal"><Link to="/privacy-policy">{arabic ? 'الخصوصية' : 'Privacy'}</Link><Link to="/terms">{arabic ? 'الشروط' : 'Terms'}</Link><a href="#top">↑ {arabic ? 'العودة للأعلى' : 'Back to top'}</a></span></div>
  </footer>;
}
